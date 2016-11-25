import React, { Component } from 'react';
import './App.css';
import { ReactImageMagnify } from '../../../dist';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div style={{
                    width: '400px',
                    margin: '20px 0 10px',
                    font: '21px Arial',
                    textAlign: 'center'
                }}>
                    Hover image to magnify
                </div>
                <div className="App-body">
                  <ReactImageMagnify {...{
                      largeImage: {
                          alt: 'Enlarged product image',
                          src: 'large-a.jpg',
                          width: 1200,
                          height: 1800
                      },
                      smallImage: {
                          alt: 'Product image',
                          src: 'large-a.jpg',
                          width: 300,
                          height: 450
                      }
                  }} />
                </div>
            </div>
        );
    }
}

export default App;
