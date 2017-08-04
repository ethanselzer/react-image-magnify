import React, { Component } from 'react';
import ReactImageMagnify from '../pkg-lnk/ReactImageMagnify';

import './App.css';

import watchImg from '../images/wristwatch_1200.jpg';

export default class extends Component {
    render() {
        return (
            <div className="fluid">
                <div className="fluid__image-container">
                    <ReactImageMagnify {...{
                        largeImage: {
                            alt: '',
                            src: watchImg,
                            width: 1200,
                            height: 1800
                        },
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            src: watchImg,
                            width: 300,
                            height: 450
                        }
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>Touch</h3>
                    <p className="App-intro">Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                    <p className="App-intro">Note the page can be scrolled when touch begins on image.</p>
                    <h3>Mouse</h3>
                    <p>Hover image to magnify</p>
                </div>
                <div style={{height: '1000px'}} />
            </div>
        );
    }
}
