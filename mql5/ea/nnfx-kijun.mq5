   //+------------------------------------------------------------------+
   //|                                                   NNFX Kijun.mq5 |
   //|                                  Copyright 2024, MetaQuotes Ltd. |
   //|                                             https://www.mql5.com |
   //+------------------------------------------------------------------+
   #property copyright "Copyright 2024, Robin Punnoose"
   #property link      "https://www.robinpunn.com"
   #property version   "1.01"
   #property strict
   
   #include <Trade\Trade.mqh>
   
   int kijunHandle;   
   input int InpKijunPeriod = 26;     
   input int ATR_Period = 14;         
   input double RiskPercent = 2.0;
   double kijunValues[];
   
   int atrHandle;
   CTrade trade;
   double atrValue;
   
   bool partialCloseExecuted = false;
   
   enum SignalType
   {
      SIGNAL_LONG,
      SIGNAL_SHORT,
      SIGNAL_NONE
   };
   
   
   
   int OnInit()
   {
       atrHandle = iATR(Symbol(), Period(), ATR_Period);
       if(atrHandle == INVALID_HANDLE)
       {
           Print("Failed to create ATR indicator handle. Error code: ", GetLastError());
           return INIT_FAILED;
       }
       
       kijunHandle = iCustom(Symbol(), Period(), "Kijun", InpKijunPeriod);
       if(kijunHandle == INVALID_HANDLE)
       {
           Print("Failed to create Kijun indicator handle. Error code: ", GetLastError());
           return INIT_FAILED;
       }
       
       ArraySetAsSeries(kijunValues, true);
   
       EventSetTimer(1);
   
       return INIT_SUCCEEDED;
   }
   
   
   
   void OnDeinit(const int reason)
   {
      if(atrHandle != INVALID_HANDLE) IndicatorRelease(atrHandle);
      if(kijunHandle != INVALID_HANDLE) IndicatorRelease(kijunHandle);   
      EventKillTimer();     
   }



void OnTimer()
{
   static datetime lastBarTime = 0;
   datetime currentBarTime = TimeCurrent();
   datetime barCloseTime = iTime(_Symbol, PERIOD_CURRENT, 0) + PeriodSeconds(PERIOD_CURRENT);
   
   if (currentBarTime >= barCloseTime - 600 && currentBarTime < barCloseTime && lastBarTime != barCloseTime)
   {
      ProcessEndOfBar();
      lastBarTime = barCloseTime;
   }
}



void OnTick()
{
   if(PositionSelect(_Symbol))
   {
      UpdateStopLoss();
   }
}



void ProcessEndOfBar()
{
   CalculateKijun(); 
   
   if(!PositionSelect(_Symbol))
   {
     partialCloseExecuted = false;
     CheckForNewPosition();
   }
    else
   {
     ManageOpenPosition();
   }
}



double GetATRValue()
{
   double atrBuffer[];
   if(CopyBuffer(atrHandle, 0,0,1, atrBuffer) !=1)
   {
      Print("Failed to copy ATR data. Error code: ", GetLastError());
      return 0;
   }
   return atrBuffer[0];
}



void CalculateKijun()
{
    if(CopyBuffer(kijunHandle, 0, 0, 2, kijunValues) != 2)
    {
      Print("Failed to copy Kijun data. Error code: ", GetLastError());
      return;
    }  
}



SignalType Confirmation()
{
    double closeValues[];
     
    closeValues[0] = iClose(Symbol(), Period(), 1);
    
    // using bid/ask here because using close will apparently get data from previous candle???
    // because we're making the trade before the current candle has officially closed
    if(SymbolInfoDouble(Symbol(), SYMBOL_ASK) > kijunValues[0] && closeValues[0] <= kijunValues[1])
    {
      return SIGNAL_LONG;
    }
    
    if(SymbolInfoDouble(Symbol(), SYMBOL_BID) < kijunValues[0] && closeValues[0] >= kijunValues[1])
    {
      return SIGNAL_SHORT;
    }
    
    return SIGNAL_NONE;
}



void CheckForNewPosition()
{
    atrValue = GetATRValue();
    if(atrValue == 0) return;

    double stopLossDistance = 1.5 * atrValue;
    double accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
    double riskAmount = accountBalance * (RiskPercent / 100.0);
    
    double lotSize = CalculateLotSize(riskAmount, stopLossDistance);

    if(AccountInfoDouble(ACCOUNT_MARGIN_FREE) < AccountInfoDouble(ACCOUNT_MARGIN_INITIAL))
    {
        Print("Insufficient free margin to open position");
        return;
    }
    
    SignalType confirmation = Confirmation();
    
    switch(confirmation)
    {
      case SIGNAL_LONG:
      {
        double entryPrice = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
        double stopLoss = NormalizeDouble(entryPrice - stopLossDistance, _Digits);
        
        if(trade.PositionOpen(_Symbol, ORDER_TYPE_BUY, lotSize, entryPrice, stopLoss, 0, "Buy signal"))
        {
            Print("Buy position opened. Lots: ", lotSize, ", SL: ", stopLoss);
            return;
        }
        else
        {
            Print("Failed to open Buy position. Error code: ", GetLastError());
        }
        break;
      }
      case SIGNAL_SHORT:
      {
        double entryPrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);
        double stopLoss = NormalizeDouble(entryPrice + stopLossDistance, _Digits); 
        
        if(trade.PositionOpen(_Symbol, ORDER_TYPE_SELL, lotSize, entryPrice, stopLoss, 0, "Sell signal"))
        {
            Print("Sell position opened. Lots: ", lotSize, ", SL: ", stopLoss);
            return;
        }
        else
        {
            Print("Failed to open Sell position. Error code: ", GetLastError());
        }
        break;
      }
      case SIGNAL_NONE:
      {
         break;
      }
    }
}



void ManageOpenPosition()
{
    if(!PositionSelect(_Symbol)) return;

    double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
    double longClosePrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);
    double shortClosePrice = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
    double stopLoss = PositionGetDouble(POSITION_SL);
    double positionVolume = PositionGetDouble(POSITION_VOLUME);
    ENUM_POSITION_TYPE posType = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
    ulong ticket = PositionGetInteger(POSITION_TICKET);

    atrValue = GetATRValue();
    if(atrValue == 0) return;
    
    if(posType == POSITION_TYPE_BUY)
    {
        if(!partialCloseExecuted && longClosePrice >= openPrice + atrValue)
        {
            double closeVolume = NormalizeDouble(positionVolume * 0.5, 2);
            // Close 50% of the position
            if(trade.PositionClosePartial(ticket,closeVolume))
            {
               partialCloseExecuted = true;
               trade.PositionModify(ticket, openPrice, 0.0);
               Print("Take Profit 1 hit, SL moved to: ", openPrice);
            }       
        }
        
        if(longClosePrice >= openPrice + 2*atrValue)
        {
            double newStopLoss = NormalizeDouble(longClosePrice - 1.5*atrValue, _Digits);
            if(newStopLoss > stopLoss)
            {
                trade.PositionModify(ticket, newStopLoss, 0.0);
                Print("Trailing stop updated for Buy position. New SL: ", newStopLoss);
            }
        }
    }
    else if(posType == POSITION_TYPE_SELL)
    {
        if(!partialCloseExecuted && shortClosePrice <= openPrice - atrValue)
        {
            double closeVolume = NormalizeDouble(positionVolume * 0.5, 2);
            if(trade.PositionClosePartial(ticket,closeVolume))
            {
               partialCloseExecuted = true;
               trade.PositionModify(ticket, openPrice, 0.0);
               Print("Take Profit 1 hit, SL move to: ", openPrice);
            }               
        }
        
        if(shortClosePrice <= openPrice - 2*atrValue)
        {
            double newStopLoss = NormalizeDouble(shortClosePrice + 1.5*atrValue, _Digits);
            if(newStopLoss < stopLoss)
            {
                trade.PositionModify(ticket, newStopLoss, 0.0);
                Print("Trailing stop updated for Sell position. New SL: ", newStopLoss);
            }
        }
    }
}



void UpdateStopLoss()
{
   if(!PositionSelect(_Symbol)) return;
   
   double longClosePrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double shortClosePrice = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double stopLoss = PositionGetDouble(POSITION_SL);
   ENUM_POSITION_TYPE posType = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
   ulong ticket = PositionGetInteger(POSITION_TICKET);
   
   if((posType == POSITION_TYPE_BUY && longClosePrice <= stopLoss) || (posType == POSITION_TYPE_SELL && shortClosePrice >= stopLoss))
   {
      trade.PositionClose(ticket);
      Print("Stop Loss Hit");
   }
}



double CalculateLotSize(double riskAmount, double stopLossDistance)
{
    double tickSize = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
    double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
    double lotStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
    double minLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
    double maxLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);

    double ticksPerSL = stopLossDistance / tickSize;
    double valuePerLot = ticksPerSL * tickValue;
    double lotSize = NormalizeDouble(riskAmount / valuePerLot, 2);

    // Ensure lot size is within allowed limits and follows lot step
    lotSize = MathMax(minLot, MathMin(maxLot, lotSize));
    lotSize = NormalizeDouble(lotSize / lotStep, 0) * lotStep;

    return lotSize;
}