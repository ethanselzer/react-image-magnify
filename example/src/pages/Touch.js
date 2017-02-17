import React, { Component } from 'react';
import './App.css';
import { ReactImageMagnifyTouch } from '../../../dist';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ReactImageMagnifyTouch {...{
                        fadeDurationInMs: 500,
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
                    <p className="App-intro">Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                    <p style={{ display: 'none' }} className="App-intro">Note the page can be scrolled when touch begins on image.</p>
                    <div style={{height: '1000px'}} />
                </div>
            </div>
        );
    }
}

export default App;
