//+------------------------------------------------------------------+
//|                                                        Kijun.mq5 |
//|                                  Copyright 2024, MetaQuotes Ltd. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2024, MetaQuotes Ltd."
#property link      "https://www.mql5.com"
#property version   "1.00"
#property description "Kijun"
#property indicator_chart_window
#property indicator_buffers 1
#property indicator_plots   1
#property indicator_type1   DRAW_LINE
#property indicator_color1  Yellow
#property indicator_label1  "Kijun"

//--- input parameters
input int InpKijun=26;     // Kijun-sen period

//--- indicator buffers
double    ExtKijunBuffer[];

//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int OnInit()
{
   //--- indicator buffers mapping
   SetIndexBuffer(0,ExtKijunBuffer,INDICATOR_DATA);

   IndicatorSetInteger(INDICATOR_DIGITS,_Digits+1);

   //--- sets first bar from what index will be drawn
   PlotIndexSetInteger(0,PLOT_DRAW_BEGIN,InpKijun);

   //--- lines shifts when drawing
   PlotIndexSetInteger(2,PLOT_SHIFT,InpKijun);
   PlotIndexSetInteger(3,PLOT_SHIFT,-InpKijun);

   //--- change labels for DataWindow
   PlotIndexSetString(0,PLOT_LABEL,"Kijun-sen("+string(InpKijun)+")");

   //--- Set visibility based on input parameters
   PlotIndexSetInteger(1,PLOT_DRAW_TYPE, DRAW_LINE);

   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Custom indicator iteration function                              |
//+------------------------------------------------------------------+
int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
  {
   int start;
   if(prev_calculated==0)
      start=0;
   else
      start=prev_calculated-1;

   for(int i=start; i<rates_total && !IsStopped(); i++)
     {
         double price_max=Highest(high,InpKijun,i);
         double price_min=Lowest(low,InpKijun,i);
         ExtKijunBuffer[i]=(price_max+price_min)/2.0;
     }

   return(rates_total);
  }

//+------------------------------------------------------------------+
//| Custom functions                                                 |
//+------------------------------------------------------------------+
double Highest(const double& array[],const int range,int from_index)
  {
   double res=array[from_index];
   for(int i=from_index; i>from_index-range && i>=0; i--)
      if(res<array[i]) res=array[i];
   return(res);
  }

double Lowest(const double& array[],const int range,int from_index)
  {
   double res=array[from_index];
   for(int i=from_index; i>from_index-range && i>=0; i--)
      if(res>array[i]) res=array[i];
   return(res);
  }
