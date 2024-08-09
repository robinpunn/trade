# Custom Indicators
This repository is a collection of technical indicators 

### Debit Spread Point of No Return
- This indicator was created for the formula found in the book [Mean Reversion Trading](https://www.amazon.com/Mean-Reversion-Trading-Technical-Analysis-ebook/dp/B0B781VTZX/ref=sr_1_1?crid=35C2DW94FESUV&dib=eyJ2IjoiMSJ9.26n3tNbcUQflWrHzWPbPcAEHOCCw44N8TkqgrJHtWTWVrwRqUW95sm-qD6-plM5QiMpKUnqBi5SzLISKXLK2dO6zs3_pWJBfzTnhDwvF0Bs.mMBT33qp9k_URothrDm0eGMz_ALZ9OzmPgI7sE5Ku9Y&dib_tag=se&keywords=mean+reversion+trading+nishant+pant&qid=1723005127&sprefix=mean+rever%2Caps%2C106&sr=8-1).
- When running a debit spread, enter the open date, expiration date, long strike, and short strike. 
- A diagonal line is created from the calculated PNR price and the short strike price. For longs watch for price to go below the line and for shorts, watch for price to go above the line. Consider closing the position if price is breaching the line

### Multi-Channel SARCloud
- This indicator is to be used with TradingView
- It combines Bollinger Bands, Keltner Channels, Donchain Channels, Ichimoku Cloud, and SAR. 
- All of these indicators are lagging, but combining them provides an enhanced visual representation of trends/consolidation

### Multi-Channel Cloud
- This indicator is to be used with TradingView
- Similar to the previous indicator, but this one removes SAR and Donchain.
- There is also an extra channel added to the Keltner channel
- Ideally
    - long when the cloud is thick and green and candles are trading in the upper channels.
    - short when the cloud is thick and red and candles are trading in the lower channels.
