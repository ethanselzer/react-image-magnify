import React, { Component } from 'react';
import ReactImageMagnify from '../pkg-lnk/ReactImageMagnify';
import SpacedSpan from '../components/SpacedSpan';

import './app.css';

import watchImg687 from '../images/wristwatch_687.jpg';
import watchImg1200 from '../images/wristwatch_1200.jpg';

export default class BasicExample extends Component {
    render() {
        return (
            <div className="fluid">
                <div className="fluid__image-container">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: watchImg687,
                        },
                        largeImage: {
                            src: watchImg1200,
                            width: 1200,
                            height: 1800
                        },
                        isHintEnabled: true
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>Hint Example</h3>
                    <p>
                        Helps inform users of zoom feature.
                    </p>
                    <p>
                        Configurable text for mouse and touch inputs. English defaults provided.
                    </p>
                    <p>
                        Custom component option.
                    </p>
                    <p>
                        Hidden after first interaction by default.
                    </p>
                    <p>
                        Please see
                        <SpacedSpan>
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/pages/Hint.js">
                                source code
                            </a>
                        </SpacedSpan>
                        for details.
                    </p>
                </div>
                <div style={{height: '500px'}} />
            </div>
        );
    }
}
