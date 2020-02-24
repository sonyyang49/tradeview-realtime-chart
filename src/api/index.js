import historyProvider from "./historyProvider";
import axios from "axios";
const supportedResolutions = ["1", "5", "15", "30", "60", "240", "D"];

const config = {
  supported_resolutions: supportedResolutions
};

//use axios to get a list of token symbols. 
const getSymbols = async() => {
  let postData = {
    id: "ContractB8gH3sMXFG5Jk32j1ZkbCmUmtTknHeThpvSTFfhSZPZh",
    key: "tokens",
    by_longest_chain: true
  };

  return axios
    .post("https://api.iost.io/getContractStorageFields", postData)
    .then(async res => {
      return res.data;

    }).then(data => {
      return data.fields
    }).catch(err => {
      return [];
    })
}


export default class Datafeed {
  constructor() {
    this.symbols = null
  }

  onReady = cb => {

    getSymbols().then(sym => {
      this.symbols = sym.map(s => s.toUpperCase()); 
      setTimeout(() => cb(config), 0);
    })
    
  }

  searchSymbols= (userInput, exchange, symbolType, onResultReadyCallback) => {
    userInput = userInput.toUpperCase()

    onResultReadyCallback(

      this.symbols.filter((symbol) => {

        return symbol.indexOf(userInput) >= 0

      }).map((symbol) => {

        return {

          symbol: symbol,

        }

      })

    )
  }

  resolveSymbol = (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    // expects a symbolInfo object in response

    // console.log('resolveSymbol:',{symbolName})
    let symb = symbolName.toUpperCase();

    for (let symbol of this.symbols) {
      if (symbol === symb) {
        setTimeout(() => {
          onSymbolResolvedCallback({
            name: symbol,
            description: "",
            type: "crypto",
            session: "24x7",
            timezone: "America/Chicago",
            ticker: symbol,
            exchange: "otbTrade",
            minmov: 1,
            pricescale: 1000000000,
            has_intraday: true,
            supported_resolution: supportedResolutions,
            volume_precision: 8,
            data_status: "streaming"

          })

        }, 0)

        return

      }

    }

    onResolveErrorCallback('Not found.')
  }

  getBars = (symbolInfo,resolution,from,to,onHistoryCallback,onErrorCallback,firstDataRequest) => {
    // console.log('function args',arguments)
    // console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
    historyProvider
      .getBars(symbolInfo, resolution, from, to, firstDataRequest)
      .then(bars => {
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch(err => {
        onErrorCallback(err);
      });
  }

  subscribeBars = (symbolInfo,resolution,onRealtimeCallback,subscribeUID,onResetCacheNeededCallback) => {
    console.log("=====subscribeBars runnning");


  }

  unsubscribeBars= subscriberUID => {
    console.log("=====unsubscribeBars running");

  }

  calculateHistoryDepth= (resolution, resolutionBack, intervalBack) => {
    //optional

    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "1" }
      : undefined;
  }

  getMarks = (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
  }

  getTimeScaleMarks = (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
  }

  getServerTime = cb => {}
};
