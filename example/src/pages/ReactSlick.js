import React, { Component } from 'react';
import ReactSlick from '../components/ReactSlick';
import SpacedSpan from '../components/SpacedSpan';

import './app.css';
import './react-slick.css';

export default class ReactSlickExample extends Component {
    render() {
        return (
            <div className="fluid react-slick">
                <div className="fluid__image-container">
                    <ReactSlick {...{
                        rimProps: {
                            isHintEnabled: true,
                            shouldHideHintAfterFirstActivation: false,
                            enlargedImagePosition: 'over'
                        }
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>Carousel Example</h3>
                    <p>
                        Integration with&nbsp;
                        <a href="https://www.npmjs.com/package/react-slick">
                            react-slick
                        </a>
                        .
                    </p>
                    <p>
                        In-place enlargement for mouse and touch input.
                    </p>
                    <p>
                        Side-by-side enlargement supported, please see&nbsp;
                        <a
                            href="https://ethanselzer.github.io/react-image-magnify/#/external"
                        >
                            External Enlarged Image Demo
                        </a>
                        .
                    </p>
                    <p>
                        Responsive and fluid between breakpoints.
                    </p>
                    <p>
                        Initial file size optimized via
                        <SpacedSpan className="code">
                            srcSet
                        </SpacedSpan>
                        and
                        <SpacedSpan className="code">
                            sizes
                        </SpacedSpan>
                        attributes.
                    </p>
                    <p>
                        Please see
                        <SpacedSpan>
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/pages/ReactSlick.js">
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
