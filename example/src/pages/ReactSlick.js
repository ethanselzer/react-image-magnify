import React, { Component } from 'react';
import ReactImageMagnify from '../pkg-lnk/ReactImageMagnify';
import ReactSlick from 'react-slick';
import SpacedSpan from '../components/SpacedSpan';

import front_500 from '../images/versace-blue/front-500.jpg'
import front_779 from '../images/versace-blue/front-779.jpg';
import front_1020 from '../images/versace-blue/front-1020.jpg';
import front_1200 from '../images/versace-blue/front-1200.jpg';
import front_1426 from '../images/versace-blue/front-1426.jpg';

import back_500 from '../images/versace-blue/back-500.jpg'
import back_779 from '../images/versace-blue/back-779.jpg';
import back_1020 from '../images/versace-blue/back-1020.jpg';
import back_1200 from '../images/versace-blue/back-1200.jpg';
import back_1426 from '../images/versace-blue/back-1426.jpg';

import './app.css';
import './react-slick.css';

const frontSrcSet = [
    { src: front_500, setting: '500w' },
    { src: front_779, setting: '779w' },
    { src: front_1020, setting: '1020w' },
    { src: front_1200, setting: '1200w' },
    { src: front_1426, setting: '1426w' }
]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

const backSrcSet = [
    { src: back_500, setting: '500w' },
    { src: back_779, setting: '779w' },
    { src: back_1020, setting: '1020w' },
    { src: back_1200, setting: '1200w' },
    { src: back_1426, setting: '1426w' }
]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

const dataSource = [
    {
        srcSet: frontSrcSet,
        small: front_500,
        large: front_1426
    },
    {
        srcSet: backSrcSet,
        small: back_500,
        large: back_1426
    }
];

export default class ReactSlickExample extends Component {
    render() {
        return (
            <div className="fluid react-slick">
                <div className="fluid__image-container">
                    <ReactSlick {...{
                        dots: true,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }}>
                        {dataSource.map((src, index) => (
                            <div key={index}>
                                <ReactImageMagnify {...{
                                    largeImage: {
                                        alt: '',
                                        src: src.large,
                                        width: 1426,
                                        height: 2000
                                    },
                                    smallImage: {
                                        isFluidWidth: true,
                                        alt: 'Wristwatch by Versace',
                                        src: src.small,
                                        srcSet: src.srcSet,
                                        sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                    },
                                    isHintEnabled: true,
                                    shouldHideHintAfterFirstActivation: false,
                                    enlargedImagePosition: 'over'
                                }} />
                            </div>
                        ))}
                    </ReactSlick>
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
                        Side-by-side enlargement not yet compatible with react-slick.
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
                                source code
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
