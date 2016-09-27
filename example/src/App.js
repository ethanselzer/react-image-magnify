import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactImageMagnify from '../../dist/ReactImageMagnify';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactImageMagnify {...{
          largeImage: {
            alt: 'hello large image',
            src: 'https://goo.gl/Bi9OCm',
            width: 1200,
            height: 672
          },
          smallImage: {
            alt: 'hello small image',
            src: 'https://goo.gl/Bi9OCm',
            width: 300,
            height: 168
          }
        }}/>
      </div>
    );
  }
}

export default App;
