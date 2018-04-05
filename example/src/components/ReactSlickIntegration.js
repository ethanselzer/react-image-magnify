import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactSlick from '../components/ReactSlick';
import SpacedSpan from '../components/SpacedSpan';

import '../styles/app.css';

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
                        Basic integration with&nbsp;
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
                        <Link
                            to="/external"
                        >
                            External Enlarged Image Demo
                        </Link>
                        .
                    </p>
                    <p>
                        Responsive and fluid between breakpoints.
                    </p>
                    <p>
                        Initial file size optimized via
                        <SpacedSpan className="code">
                            srcset
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
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/components/ReactSlick.js#L60-L92">
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
