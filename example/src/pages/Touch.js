import React, { Component } from 'react';
import ReactImageMagnifyTouch from '../pkg-lnk/ReactImageMagnifyTouch';

import './App.css';

import watchImg from '../images/wristwatch_1200.jpg';

export default class extends Component {
    render() {
        return (
            <div className="touch">
                <ReactImageMagnifyTouch {...{
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
                <p className="App-intro">Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                <p className="App-intro">Note the page can be scrolled when touch begins on image.</p>
                <div style={{height: '1000px'}} />
            </div>
        );
    }
}
