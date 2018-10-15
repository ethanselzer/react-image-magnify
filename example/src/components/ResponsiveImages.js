import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import SpacedSpan from '../components/SpacedSpan';

import '../styles/app.css';

import watchImg355 from '../images/wristwatch_355.jpg';
import watchImg481 from '../images/wristwatch_481.jpg';
import watchImg584 from '../images/wristwatch_584.jpg';
import watchImg687 from '../images/wristwatch_687.jpg';
import watchImg770 from '../images/wristwatch_770.jpg';
import watchImg861 from '../images/wristwatch_861.jpg';
import watchImg955 from '../images/wristwatch_955.jpg';
import watchImg1033 from '../images/wristwatch_1033.jpg';
import watchImg1112 from '../images/wristwatch_1112.jpg';
import watchImg1192 from '../images/wristwatch_1192.jpg';
import watchImg1200 from '../images/wristwatch_1200.jpg';

export default class BasicExample extends Component {
    get srcSet() {
        return [
            `${watchImg355} 355w`,
            `${watchImg481} 481w`,
            `${watchImg584} 584w`,
            `${watchImg687} 687w`,
            `${watchImg770} 770w`,
            `${watchImg861} 861w`,
            `${watchImg955} 955w`,
            `${watchImg1033} 1033w`,
            `${watchImg1112} 1112w`,
            `${watchImg1192} 1192w`,
            `${watchImg1200} 1200w`,
        ].join(', ');
    }

    render() {
        return (
            <div className="fluid">
                <div className="fluid__image-container">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: watchImg1200,
                            srcSet: this.srcSet,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                            src: watchImg1200,
                            width: 1200,
                            height: 1800
                        }
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>Responsive Images Example</h3>
                    <p>
                        Fluid between breakpoints.
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
                        For more information on responsive images, please try these resources:
                        <br />
                        <a href="https://cloudfour.com/thinks/responsive-images-101-definitions">
                            Responsive Images 101
                        </a>
                        <br />
                        <a href="https://bitsofco.de/the-srcset-and-sizes-attributes/">
                            Responsive Images - The srcset and sizes Attributes
                        </a>
                    </p>
                    <p>
                        Please see
                        <SpacedSpan>
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/components/ResponsiveImages.js">
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
