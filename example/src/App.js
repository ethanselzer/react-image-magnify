import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactImageZoom from '../../dist/ReactImageMagnify';

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
        <ReactImageZoom {...{
          largeImage: {
            alt: 'hello large image',
            src: 'https://www.hautelookcdn.com/products/KS8K955S/large/5793611.jpg',
            width: 1200,
            height: 1800
          },
          smallImage: {
            alt: 'hello small image',
            src: 'https://www.hautelookcdn.com/products/KS8K955S/large/5793611.jpg?interpolation=lanczos-none&downsize=434:650&output-quality=90&output-format=jpeg',
            width: 434,
            height: 650
          }
        }}/>
      </div>
    );
  }
}

export default App;
