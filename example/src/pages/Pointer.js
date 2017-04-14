import React, { Component } from 'react';
// import { ReactImageMagnify } from 'react-image-magnify';
import ReactImageMagnify from '../../../dist/ReactImageMagnify';

import './App.css';

import watchImg from '../../images/wristwatch_1200.jpg';

export default class extends Component {
    render() {
        return (
            <div className="pointer">
                <div className="pointer__instructions">
                    Hover image to magnify
                </div>
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
        );
    }
}
