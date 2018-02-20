import React from 'react';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';

import {
    getLensModeEnlargedImageCoordinates,
    getInPlaceEnlargedImageCoordinates
} from './lib/imageCoordinates';
import ImageShape from './prop-types/ImageShape';
import { noop } from './utils';
import Point from './prop-types/Point';
import { ENLARGED_IMAGE_POSITION } from './constants';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false
        };

        this.timers = [];
    }

    static displayName = 'EnlargedImage';

    static defaultProps = {
        fadeDurationInMs: 0,
        isLazyLoaded: true
    };

    static propTypes = {
        containerClassName: PropTypes.string,
        containerStyle: PropTypes.object,
        cursorOffset: Point,
        position: Point,
        fadeDurationInMs: PropTypes.number,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        isActive: PropTypes.bool,
        isLazyLoaded: PropTypes.bool,
        largeImage: ImageShape,
        containerDimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number
        }),
        imagePosition: PropTypes.oneOf([
            ENLARGED_IMAGE_POSITION.beside,
            ENLARGED_IMAGE_POSITION.over
        ])
    };

    componentWillReceiveProps(nextProps) {
        this.scheduleCssTransition(nextProps);
    }

    componentWillUnmount() {
        this.timers.forEach((timerId) => {
            clearTimeout(timerId);
        });
    }

    scheduleCssTransition(nextProps) {
        const {
            fadeDurationInMs,
            isActive,
            isPositionOutside
        } = this.props;
        const willIsActiveChange = isActive !== nextProps.isActive;
        const willIsPositionOutsideChange = isPositionOutside !== nextProps.isPositionOutside;

        if (!willIsActiveChange && !willIsPositionOutsideChange) {
            return;
        }

        if (nextProps.isActive && !nextProps.isPositionOutside) {
            this.setState({
                isTrainsitionDone: false,
                isTransitionEntering: true
            });

            this.timers.push(setTimeout(() => {
                this.setState({
                    isTransitionEntering: false,
                    isTransitionActive: true
                });
            }, 0));
        } else {
            this.setState({
                isTransitionLeaving: true,
                isTransitionActive: false
            });

            this.timers.push(setTimeout(() => {
                this.setState({
                    isTransitionDone: true,
                    isTransitionLeaving: false
                });
            }, fadeDurationInMs));
        }
    }

    getDefaultContainerStyle() {
        const { imagePosition } = this.props;
        const baseContainerStyle = {
            position: 'absolute',
            top: '0px',
            overflow: 'hidden'
        };
        const { over: OVER } = ENLARGED_IMAGE_POSITION;
        const isInPlaceMode = imagePosition === OVER;

        if (isInPlaceMode) {
            return objectAssign(baseContainerStyle, {
                left: '0px'
            });
        }

        return objectAssign(baseContainerStyle, {
            left: '100%',
            marginLeft: '10px',
            border: '1px solid #d6d6d6',
        });
    }

    getImageCoordinates() {
        const {
            imagePosition,
            cursorOffset,
            largeImage,
            containerDimensions,
            position,
            smallImage
        } = this.props;
        const { over: OVER } = ENLARGED_IMAGE_POSITION;
        const isInPlaceMode = imagePosition === OVER;

        if (isInPlaceMode) {
            return getInPlaceEnlargedImageCoordinates({
                containerDimensions,
                largeImage,
                position
            });
        }

        return getLensModeEnlargedImageCoordinates({
            containerDimensions,
            cursorOffset,
            largeImage,
            position,
            smallImage
        });
    }

    render() {
        const {
            containerClassName,
            containerStyle,
            fadeDurationInMs,
            imageClassName,
            imageStyle,
            isLazyLoaded,
            largeImage,
            largeImage: {
                onLoad = noop,
                onError = noop
            },
            containerDimensions,
        } = this.props;

        const {
            isTransitionEntering,
            isTransitionActive,
            isTransitionLeaving
        } = this.state;
        const isVisible = !!(isTransitionEntering || isTransitionActive || isTransitionLeaving);

        const defaultContainerStyle = this.getDefaultContainerStyle();
        const computedContainerStyle = {
            width: containerDimensions.width,
            height: containerDimensions.height,
            opacity: this.state.isTransitionActive ? 1 : 0,
            transition: `opacity ${fadeDurationInMs}ms ease-in`,
            pointerEvents: 'none'
        };
        const compositeContainerStyle = objectAssign({}, defaultContainerStyle, containerStyle, computedContainerStyle);

        const imageCoordinates = this.getImageCoordinates();
        const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;
        const computedImageStyle = {
            width: largeImage.width,
            height: largeImage.height,
            transform: translate,
            WebkitTransform: translate,
            msTransform: translate,
            pointerEvents: 'none'
        };
        const compositeImageStyle = objectAssign({}, imageStyle, computedImageStyle);

        const component = (
            <div { ...{
                className: containerClassName,
                style: compositeContainerStyle
            }}>
                <img { ...{
                    alt: largeImage.alt,
                    className: imageClassName,
                    src: largeImage.src,
                    srcSet: largeImage.srcSet,
                    sizes: largeImage.sizes,
                    style: compositeImageStyle,
                    onLoad,
                    onError
                }}/>
            </div>
        );

        if (isLazyLoaded) {
            return isVisible ? component : null;
        }

        return component;
    }
}
