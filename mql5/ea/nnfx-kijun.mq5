//+------------------------------------------------------------------+
//|                                         ATR Money Management.mq5 |
//|                                  Copyright 2024, MetaQuotes Ltd. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2024, Your Name"
#property link      "https://www.yourwebsite.com"
#property version   "1.01"
#property strict

#include <Trade\Trade.mqh>

input int InpKijunPeriod = 26;     // Kijun-sen period
input int ATR_Period = 14;         // ATR period
input double RiskPercent = 2.0;    // Risk percentage of account balance

int atrHandle;
CTrade trade;
double atrValue;

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
    // Initialize ATR indicator
    atrHandle = iATR(_Symbol, PERIOD_CURRENT, ATR_Period);
    if(atrHandle == INVALID_HANDLE)
    {
        Print("Failed to create ATR indicator handle. Error code: ", GetLastError());
        return INIT_FAILED;
    }

    return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
    if(atrHandle != INVALID_HANDLE)
        IndicatorRelease(atrHandle);
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
    if(!PositionSelect(_Symbol))
    {
        CheckForNewPosition();
    }
    else
    {
        ManageOpenPosition();
    }
}

//+------------------------------------------------------------------+
//| Check for new position entry                                     |
//+------------------------------------------------------------------+
void CheckForNewPosition()
{
    double kijunValues[2];
    double closeValues[2];
    
    // Calculate Kijun values for the last two candles
    kijunValues[0] = CalculateKijun(1);
    kijunValues[1] = CalculateKijun(2);
    
    // Get close prices for the last two candles
    closeValues[0] = iClose(_Symbol, PERIOD_CURRENT, 1);
    closeValues[1] = iClose(_Symbol, PERIOD_CURRENT, 2);

    double atrBuffer[];
    if(CopyBuffer(atrHandle, 0, 1, 1, atrBuffer) != 1)
    {
        Print("Failed to copy ATR data. Error code: ", GetLastError());
        return;
    }
    atrValue = atrBuffer[0];

    double stopLossDistance = 1.5 * atrValue;
    double accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
    double riskAmount = accountBalance * (RiskPercent / 100.0);
    
    double lotSize = CalculateLotSize(riskAmount, stopLossDistance);

    // Long entry condition: Price closes above Kijun
    if(closeValues[0] > kijunValues[0] && closeValues[1] <= kijunValues[1])
    {
        double entryPrice = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
        double stopLoss = entryPrice - stopLossDistance;

        ulong ticket = trade.Buy(lotSize, _Symbol, entryPrice, stopLoss, 0, "Buy signal");
        if(ticket > 0)
        {
            Print("Buy position opened. Lots: ", lotSize, ", SL: ", stopLoss);
        }
        else
        {
            Print("Failed to open Buy position. Error code: ", GetLastError());
        }
    }
    
    // Short entry condition: Price closes above Kijun
    if(closeValues[0] < kijunValues[0] && closeValues[1] >= kijunValues[1])
    {
        double entryPrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);
        double stopLoss = entryPrice + stopLossDistance;

        ulong ticket = trade.Sell(lotSize, _Symbol, entryPrice, stopLoss, 0, "Sell signal");
        if(ticket > 0)
        {
            Print("Sell position opened. Lots: ", lotSize, ", SL: ", stopLoss);
        }
        else
        {
            Print("Failed to open Buy position. Error code: ", GetLastError());
        }
    }
}

//+------------------------------------------------------------------+
//| Manage open position                                             |
//+------------------------------------------------------------------+
void ManageOpenPosition()
{
    if(!PositionSelect(_Symbol)) return;

    double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
    double currentPrice = PositionGetDouble(POSITION_PRICE_CURRENT);
    double stopLoss = PositionGetDouble(POSITION_SL);
    double positionVolume = PositionGetDouble(POSITION_VOLUME);
    ENUM_POSITION_TYPE posType = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
    ulong ticket = PositionGetInteger(POSITION_TICKET);

    // Update ATR value
    double atrBuffer[];
    if(CopyBuffer(atrHandle, 0, 1, 1, atrBuffer) != 1) return;
    atrValue = atrBuffer[0];

    if(posType == POSITION_TYPE_BUY)
    {
        // Check if price has moved 1 ATR in our favor and position hasn't been partially closed yet
        if(currentPrice >= openPrice + atrValue && MathAbs(positionVolume - CalculateLotSize(AccountInfoDouble(ACCOUNT_BALANCE) * (RiskPercent / 100.0), 1.5 * atrValue)) < 0.00001)
        {
            // Close 50% of the position
            trade.PositionClosePartial(ticket, positionVolume * 0.5);
            
            // Move stop loss to break even
            trade.PositionModify(ticket, openPrice, 0);
        }
        
        // Check if price has moved 2 ATR in our favor
        if(currentPrice >= openPrice + 2*atrValue)
        {
            // Move stop loss to 1.5 ATR from the current price
            double newStopLoss = currentPrice - 1.5*atrValue;
            if(newStopLoss > stopLoss)
            {
                trade.PositionModify(ticket, newStopLoss, 0);
            }
        }
    }
    else if(posType == POSITION_TYPE_SELL)
    {
        // Short position management
        // Check if price has moved 1 ATR in our favor and position hasn't been partially closed yet
        if(currentPrice <= openPrice - atrValue && MathAbs(positionVolume - CalculateLotSize(AccountInfoDouble(ACCOUNT_BALANCE) * (RiskPercent / 100.0), 1.5 * atrValue)) < 0.00001)
        {
            // Close 50% of the position
            trade.PositionClosePartial(ticket, positionVolume * 0.5);
            
            // Move stop loss to break even
            trade.PositionModify(ticket, openPrice, 0);
        }
        
        // Check if price has moved 2 ATR in our favor
        if(currentPrice <= openPrice - 2*atrValue)
        {
            // Move stop loss to 1.5 ATR from the current price
            double newStopLoss = currentPrice + 1.5*atrValue;
            if(newStopLoss < stopLoss)
            {
                trade.PositionModify(ticket, newStopLoss, 0);
            }
        }
    }
}



//+------------------------------------------------------------------+
//| Calculate Kijun-sen value                                        |
//+------------------------------------------------------------------+
double CalculateKijun(int shift)
{
    double highestHigh = iHigh(_Symbol, PERIOD_CURRENT, iHighest(_Symbol, PERIOD_CURRENT, MODE_HIGH, InpKijunPeriod, shift));
    double lowestLow = iLow(_Symbol, PERIOD_CURRENT, iLowest(_Symbol, PERIOD_CURRENT, MODE_LOW, InpKijunPeriod, shift));
    return (highestHigh + lowestLow) / 2;
}

//+------------------------------------------------------------------+
//| Calculate lot size based on risk                                 |
//+------------------------------------------------------------------+
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
//+------------------------------------------------------------------+
