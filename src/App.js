import React from 'react';
import TVChartContainer from './TVChartContainer.js';

class App extends React.Component {

  //update the symbol to abct
  onClickABCT = () => {
    console.log("do something")
  }

  //update the symbol to otbc
  onClickOTBC = () => {
    console.log("do something")
  }

  //update the symbol to win
  onClickWIN = () => {
    console.log("do something")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Real Time Chart Test</h1>
        </header>

        <div>

            <TVChartContainer />

        </div>

        
      </div>
    );

  }
}

export default App;
