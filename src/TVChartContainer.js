import React from "react";
import Datafeed from "./api/index.js";
import { widget } from "./charting_library/charting_library.min";


function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

class TVChartContainer extends React.PureComponent {
  state = {
    symbol: "abct",
    interval: "5",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: false,
    studiesOverrides: {}
  };

  tvWidget = null;

  componentDidMount() {

    const widgetOptions = {
      debug: false,
      symbol: this.state.symbol,
      datafeed: new Datafeed(),
      interval: this.state.interval,
      container_id: this.state.containerId,
      library_path: this.state.libraryPath,
      locale: getLanguageFromURL() || "en",
      disabled_features: ["volume_force_overlay"],
      enabled_features: ["study_templates"],
      charts_storage_url: this.state.chartsStorageUrl,
      charts_storage_api_version: this.state.chartsStorageApiVersion,
      client_id: this.state.clientId,
      user_id: this.state.userId,
      fullscreen: this.state.fullscreen,
      autosize: this.state.autosize,
      studies_overrides: this.state.studiesOverrides,
      timezone: "America/Chicago",
      time_frames: [],
      theme: "dark",
      overrides: {
        // "mainSeriesProperties.showCountdown": true,

        "scalesProperties.scaleSeriesOnly": false,
        "paneProperties.background": "black",
        "paneProperties.vertGridProperties.color": "black",

        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "white",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f"
      }
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    this.tvWidget = tvWidget;
    
    this.tvWidget.onChartReady(() => {
      console.log("Chart has loaded!");
    });

  }


  render() {
    return (
      <div id={this.state.containerId} />
      
    );
  }
}

export default TVChartContainer;
