import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactImageMagnifyTouch from '../../../dist/ReactImageMagnifyTouch';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>React Image Magnify</h2>
                </div>
                <div className="App-body">
                    <p className="App-intro">Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                    <p style={{display: 'none'}} className="App-intro">Note the page can be scrolled when touch begins on image.</p>
                    <ReactImageMagnifyTouch {...{
                        enlargedImageContainerStyle: {
                            left: '0px',
                            border: 'none',
                            margin: '0px'
                        },
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
                    }} />
                </div>
            </div>
        );
    }
}

export default App;
