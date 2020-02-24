var axios = require("axios");

const api = "https://www.otbtrade.com/api/";

const history = {};

export default {
  history: {},

  getBars: async function(symbolInfo, resolution, from, to, first, limit) {
    var symbol = symbolInfo.name.toLowerCase();

    var res =
      resolution === "5"
        ? "getChartData/" + symbol + "/5M"
        : resolution === "15"
          ? "getChartData/" + symbol + "/15M"
        : resolution === "30"
            ? "getChartData/" + symbol + "/30M"
        : resolution === "60"
              ? "getChartData/" + symbol + "/1H"
        : resolution === "240"
                ? "getChartData/" + symbol + "/4H"
        : resolution === "1" 
                  ? "getChartData/" + symbol + "/1M"
                  : "getChartData/" + symbol + "/1D";

    var url = api + res;

    return axios
      .get(url)
      .then(data => {
        if (data.data.length) {
          var bars = data.data;


          if (first) {
            var lastBar = bars[bars.length - 1];
            history[symbol] = { lastBar: lastBar };
            
          }

          return bars;
        } else {
          return [];
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
