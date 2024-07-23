const Binance = require('node-binance-api');
const cs = require('candlestick');

// Initialize Binance API client
const binance = new Binance().options({
  APIKEY: '',
  APISECRET: ''
});

// Symbol and interval for the candlestick data
const symbol = 'SOLUSDT'; // Example symbol for Bitcoin/USDT pair
const interval = '1m';

let sam = 0;
let order = true;

// Function to retrieve candlestick data and perform analysis
function getCandlestickData() {
  // Retrieve candlestick data
  binance.candlesticks(symbol, interval, (error, ticks) => {
    if (error) {
      console.error('Error fetching candlestick data:', error);
      return;
    }

    // Extracting the most recent tick (the last one in the array)
    const latestTick = ticks[ticks.length - 1];

    // Creating the previous OHLC object
    const curr = {
      security: symbol,
      date: new Date(latestTick[0]), // Timestamp
      open: parseFloat(latestTick[1]),
      high: parseFloat(latestTick[2]),
      low: parseFloat(latestTick[3]),
      close: parseFloat(latestTick[4])
    };

    // Finding the second-to-last tick for the current OHLC object
    const secondLastTick = ticks[ticks.length - 2];

    // Creating the current OHLC object
    const prev = {
      security: symbol,
      date: new Date(secondLastTick[0]), // Timestamp
      open: parseFloat(secondLastTick[1]),
      high: parseFloat(secondLastTick[2]),
      low: parseFloat(secondLastTick[3]),
      close: parseFloat(secondLastTick[4])
    };

    // Log the OHLC objects
    console.log('Previous OHLC:', prev);
    console.log('Current OHLC:', curr);

    if ((cs.isHammer(prev, curr) && console.log('isHammer') || cs.isBullishHammer(prev, curr) || cs.isBullishInvertedHammer(prev, curr) || cs.isBullishEngulfing(prev, curr) ||
        cs.isHangingMan(prev, curr) || cs.isBullishHarami(prev, curr) || cs.isBullishKicker(prev, curr)) && order) {

      console.log(1, 'isHammer', cs.isHammer(prev, curr));
      console.log(2, 'isBullishHammer', cs.isBullishHammer(prev, curr));
      console.log(3, 'isBullishInvertedHammerb', cs.isBullishInvertedHammer(prev, curr));
      console.log(4, 'isBullishEngulfing', cs.isBullishEngulfing(prev, curr));
      console.log(5, 'isHangingMan', cs.isHangingMan(prev, curr));
      console.log(6, 'isBullishHarami', cs.isBullishHarami(prev, curr));
      console.log(7, 'isBullishKicker', cs.isBullishKicker(prev, curr));
      sam += curr.close;
      console.log("----------BUY--------->", sam);
      order = false;
    }

    if ((cs.isInvertedHammer(prev, curr)   && console.log('isInvertedHammer')|| cs.isBearishHammer(prev, curr)  && console.log('isBearishHammer')|| cs.isBearishInvertedHammer(prev, curr) && console.log('isBearishInvertedHammer') || cs.isShootingStar(prev, curr)  && console.log('isShootingStar')||
        cs.isBearishEngulfing(prev, curr)  && console.log('isBearishEngulfing') || cs.isBearishHarami(prev, curr)  && console.log('isBearishHarami') || cs.isBearishKicker(prev, curr)) && console.log('isBearishKicker') && !order) {

      console.log(8, 'isInvertedHammer', cs.isInvertedHammer(prev, curr));
      console.log(9, 'isBearishHammer', cs.isBearishHammer(prev, curr));
      console.log(10, 'isBearishInvertedHammer', cs.isBearishInvertedHammer(prev, curr));
      console.log(11, 'isShootingStar', cs.isShootingStar(prev, curr));
      console.log(12, 'sBearishEngulfing', cs.isBearishEngulfing(prev, curr));
      console.log(13, 'isBearishHarami', cs.isBearishHarami(prev, curr));
      console.log(14, 'isBearishKicker', cs.isBearishKicker(prev, curr));

      sam -= curr.close;
      order = true;
      console.log("----------SALE--------->", sam);
    }
  });
}

// Call the function immediately
getCandlestickData();

// // Set interval to call the function every 1 minute (in milliseconds)
// setInterval(getCandlestickData, 4 * 60 * 1000);
