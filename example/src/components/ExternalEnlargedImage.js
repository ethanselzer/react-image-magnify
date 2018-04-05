import React, { Component } from 'react';
import ReactSlick from '../components/ReactSlick';
import SpacedSpan from '../components/SpacedSpan';

import '../styles/examples.css';

export default class ReactSlickExample extends Component {
    render() {
        return (
            <div className="fluid react-slick">
                <div className="fluid__image-container">
                    <ReactSlick {...{
                        rimProps: {
                            enlargedImagePortalId: 'portal',
                            enlargedImageContainerDimensions: {
                                width: '200%',
                                height: '100%'
                            }
                        }
                    }}/>
                </div>
                <div className="fluid__instructions" style={{position: 'relative'}}>
                    <div
                        id="portal"
                        className="portal"
                    />
                    <h3>External Enlarged Image Example</h3>
                    <p>
                        Render enlarged image into an HTML element of your choosing.
                    </p>
                    <p>
                        Ignored for touch input by default but will be honored if
                        isEnlargedImagePortalEnabledForTouch is implemented.
                    </p>
                    <p>
                        Use cases include a scenario where an ancestor element of
                        react-image-magnify implements overflow hidden.
                    </p>
                    <p>
                        Requires React v16.
                    </p>
                    <p>
                        Please see
                        <SpacedSpan>
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/components/ExternalEnlargedImage.js">
                                example source code
                            </a>
                        </SpacedSpan>
                        for details.
                    </p>
                </div>
                <div style={{height: '1000px'}} />
            </div>
        );
    }
}
