import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';

import '../styles/react-slick.css';

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
        const {
            rimProps,
            rsProps
        } = this.props;

        return (
            <ReactSlick
                {...{
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }}
                {...rsProps}
            >
                {dataSource.map((src, index) => (
                    <div key={index}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Versace',
                                    isFluidWidth: true,
                                    src: src.small,
                                    srcSet: src.srcSet,
                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                },
                                largeImage: {
                                    src: src.large,
                                    width: 1426,
                                    height: 2000
                                },
                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                            }}
                            {...rimProps}
                        />
                    </div>
                ))}
            </ReactSlick>
        );
    }
}
