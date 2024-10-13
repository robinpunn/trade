# Trading Scripts
This repository is a collection of trading scripts (currently Pinescript and MQL5)

## Pinescript
### Indicators
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

#### [CMF with moving average](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/cmf-ma.pine)
- Chaikin Money Flow indicator with 3 moving averages
- Moving average #3 has a label for when CMF crosses below it

#### [Trend Strength Oscillator](https://github.com/robinpunn/trade/blob/main/pinescript/indicators/trend-strenth.pine)
- Uses Kijun-sen, Chaikin Money Flow, and Directional Index to create an oscillator that attempts to judge trend strength
- Each indicator generates positive or negative points for each candle and the cumulative point total is plotted on the oscillator
- The larger the number, the stronger the trend
- The raw point total is plotted daily and a labels are placed on this like when price crosses above or below the daily (C) and weekly (S) kijun sen
- Optional moving averages of the point total can also be plotted on the oscillator
- The plots are colored based on their position relative to the zero line

### Strategies