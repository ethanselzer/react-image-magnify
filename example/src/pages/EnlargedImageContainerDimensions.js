import React, { Component } from 'react';
import ReactImageMagnify from '../pkg-lnk/ReactImageMagnify';
import SpacedSpan from '../components/SpacedSpan';

import './app.css';

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

export default class EnlargedImageContainerDimensions extends Component {
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
                        largeImage: {
                            alt: '',
                            src: watchImg1200,
                            width: 1200,
                            height: 1800
                        },
                        smallImage: {
                            isFluidWidth: true,
                            alt: 'Wristwatch by Ted Baker London',
                            src: watchImg1200,
                            srcSet: this.srcSet,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        isHintEnabled: true,
                        enlargedImageContainerDimensions: {
                            width: ('200%'),
                            height: '100%'
                        }
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>Enlarged Image Container Dimensions Example</h3>
                    <p>
                        Specify dimensions as percentage of small image or number of pixels.
                    </p>
                    <p>
                        May be percentage for one dimension and number for the other.
                    </p>
                    <p>
                        Exmample specifies width of
                        <SpacedSpan className="code">200%</SpacedSpan>
                        and height of
                        <SpacedSpan className="code">100%.</SpacedSpan>
                    </p>
                    <p>
                        Please see
                        <SpacedSpan>
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/pages/EnlargedImageContainerDimensions.js">
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
