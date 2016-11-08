import React, { Component } from 'react';
import ReactImageMagnify from '../src/ReactImageMagnify';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <ReactImageMagnify {...{
          largeImage: {
            alt: 'Wrist watch face',
            src: 'static/large-a.jpg',
            width: 1200,
            height: 1800
          },
          smallImage: {
            alt: 'Wrist watch face',
            src: 'static/large-a.jpg',
            width: 400,
            height: 600
          }
        }} />
      </div>
    );
  }
}

export default App;
