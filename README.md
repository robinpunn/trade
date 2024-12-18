# Trading Scripts
This repository is a collection of trading scripts (currently Pinescript and MQL5)

## Pinescript
### Indicators
#### [Trend Strength Oscillator](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/trend-strenth.pine)
- Uses Kijun-sen, Chaikin Money Flow, and Directional Index to create an oscillator that attempts to judge trend strength
- Each indicator generates positive or negative points for each candle and the cumulative point total is plotted on the oscillator
- The larger the number, the stronger the trend
- The raw point total is plotted daily and a labels are placed on this like when price crosses above or below the daily (C) and weekly (S) kijun sen
- Optional moving averages of the point total can also be plotted on the oscillator
- The plots are colored based on their position relative to the zero line

#### [CMF with moving average](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/cmf-ma.pine)
- Chaikin Money Flow indicator with 3 moving averages
- Moving average #3 has a label for when CMF crosses below it

#### [Debit Spread Point of No Return](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/debit-spread-pnr.pine)
- This indicator was created for the formula found in the book [Mean Reversion Trading](https://www.amazon.com/Mean-Reversion-Trading-Technical-Analysis-ebook/dp/B0B781VTZX/ref=sr_1_1?crid=35C2DW94FESUV&dib=eyJ2IjoiMSJ9.26n3tNbcUQflWrHzWPbPcAEHOCCw44N8TkqgrJHtWTWVrwRqUW95sm-qD6-plM5QiMpKUnqBi5SzLISKXLK2dO6zs3_pWJBfzTnhDwvF0Bs.mMBT33qp9k_URothrDm0eGMz_ALZ9OzmPgI7sE5Ku9Y&dib_tag=se&keywords=mean+reversion+trading+nishant+pant&qid=1723005127&sprefix=mean+rever%2Caps%2C106&sr=8-1).
- When running a debit spread, enter the open date, expiration date, long strike, and short strike. 
- A diagonal line is created from the calculated PNR price and the short strike price. For longs watch for price to go below the line and for shorts, watch for price to go above the line. Consider closing the position if price is breaching the line

#### [Multi-Channel SARCloud](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/bb-kc-chain-ichi-sar.pine)
- Combines Bollinger Bands, Keltner Channels, Donchain Channels, Ichimoku Cloud, and SAR. 
- All of these indicators are lagging, but combining them provides an enhanced visual representation of trends/consolidation

#### [Multi-Channel Cloud](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/multi-channel-cloud.pine)
- Bollinger Bands, Keltner Channels, and Ichimoku Could. No SAR or Donchain.
- Extra channel added Keltner
- Ideally
    - long when the cloud is thick and green and candles are trading in the upper channels.
    - short when the cloud is thick and red and candles are trading in the lower channels.

### Strategies
#### [Directional Index, 5/20 EMA, CMF Crossover](https://github.com/robinpunn/trade/blob/main/pinescript/strategies/crossover-cmf.pine)
- Long only strategy that looks for bullish DI, 5/20 EMA, and CMF zero line crossovers
- There are 5 different long conditions
- User can set percentage values for basic take-profit/stop-loss 

#### [Directional Index Bullish Cross](https://github.com/robinpunn/trade/blob/main/pinescript/strategies/dmi-cross.pine)
- Long only strategy on bullish DI crosses
- Uses [NNFX](https://youtu.be/bqWLFNpK6eg?list=PLPqWQo6-TXfE8G_Mmxow0znSSoWTu44e7&t=839) ATR based money management strategy that involves a "take profit 1" and trailing stop
- User can adjust risk (default 2%) and atr stop loss (default 1.5x) settings

#### [Kijun Price Cross](https://github.com/robinpunn/trade/blob/main/pinescript/strategies/kijun-price-cross.pine)
- Long only strategy strategy signaled by price crossing above the kijun sen
- Uses NNFX atr money management system

#### [Oversold Bullish Stochastic Cross](https://github.com/robinpunn/trade/blob/main/pinescript/strategies/stochastic-cross-oversold.pine)
- Long only strategy signaled by a bullish stochastic cross when k/d are in oversold
- Uses NNFX atr money management system

#### [Stochastic RSI Bullish Cross](https://github.com/robinpunn/trade/blob/main/pinescript/strategies/stochastic-cross-nnfx.pine)
- Long only strategy signaled buy a bullish stochatic RSI cross
- Uses NNFX atr money mangement system

#### [Stocastic RSI Bullish Cross with dynamic or fixed atr](https://github.com/robinpunn/trade/blob/main/pinescript/strategies/user-choice-stochRsi-nnfx.pine)
- Long only strategy signaled buy a bullish stochatic RSI cross
- Uses NNFX atr money mangement system with added user options
- User can choose a dynamic atr (atr that changes during the life of the trade) or a fixed atr (atr when trade was opened)
- Users can choose to initiate take profits and trailing stop based on high or close

## MQL5
### Indicators
#### [Kijun Sen](https://github.com/robinpunn/trade/blob/main/mql5/indicators/kijun.mq5)
- The kijun-sen line for the Ichimoku indicator

### Expert Advisor
#### [NNFX Kijun](https://github.com/robinpunn/trade/blob/main/mql5/ea/nnfx-kijun.mq5)
- Uses [NNFX](https://youtu.be/bqWLFNpK6eg?list=PLPqWQo6-TXfE8G_Mmxow0znSSoWTu44e7&t=839) ATR based money management strategy
- Long when price crosses above the kijun-sen and short when price crosses below