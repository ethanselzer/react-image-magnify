import React, { PropTypes } from 'react';
import clamp from 'lodash.clamp';
import { Image } from './ReactImageMagnify';

export const Point = PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
});

export const ImageShape = PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
});

export default React.createClass({

    displayName: 'EnlargedImage',

    getInitialState() {
        return {
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false
        };
    },

    getDefaultProps() {
        return {
            fadeDurationInMs: 0,
            isRenderOnDemand: true
        };
    },

    propTypes: {
        containerClassName: PropTypes.string,
        containerStyle: PropTypes.object,
        cursorOffset: Point,
        cursorPosition: Point,
        fadeDurationInMs: PropTypes.number,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        isHovering: PropTypes.bool,
        isRenderOnDemand: PropTypes.bool,
        largeImage: ImageShape,
        smallImage: ImageShape,
        imagePosition: PropTypes.string
    },

    componentWillReceiveProps(nextProps) {
        const { isHovering } = nextProps;

        if (isHovering === this.props.isHovering) {
            return;
        }

        if (isHovering) {
            this.setState({
                isTransitionEntering: true
            });

            setTimeout(() => {
                this.setState({
                    isTransitionEntering: false,
                    isTransitionActive: true
                });
            }, 0);
        } else {
            this.setState({
                isTransitionActive: false,
                isTransitionLeaving: true
            });

            setTimeout(() => {
                this.setState({
                    isTransitionLeaving: false
                });
            }, this.props.fadeDurationInMs);
        }
    },

    render() {
        const {
            containerClassName,
            containerStyle,
            cursorOffset,
            cursorPosition,
            fadeDurationInMs,
            imageClassName,
            imageStyle,
            isRenderOnDemand,
            largeImage,
            smallImage,
            imagePosition
        } = this.props;

        const {
            isTransitionEntering,
            isTransitionActive,
            isTransitionLeaving
        } = this.state;

        const offsetRatio = {
            x: largeImage.width / smallImage.width,
            y: largeImage.height / smallImage.height
        };

        const differentiatedImageCoordinates = {
            x: (Math.round((cursorPosition.x - cursorOffset.x) * offsetRatio.x) * -1),
            y: (Math.round((cursorPosition.y - cursorOffset.y) * offsetRatio.y) * -1)
        };

        const minCoordinates = {
            x: ((largeImage.width - smallImage.width) * -1),
            y: ((largeImage.height - smallImage.height) * -1)
        };

        const maxCoordinate = 0;

        const imageCoordinates = {
            x: clamp(differentiatedImageCoordinates.x, minCoordinates.x, maxCoordinate),
            y: clamp(differentiatedImageCoordinates.y, minCoordinates.y, maxCoordinate)
        };

        let isVisible;
        if (isTransitionEntering || isTransitionActive || isTransitionLeaving) {
            isVisible = true;
        } else {
            isVisible = false;
        }

        let imgDataHover;
        let defaultContainerStyle = {
            position: 'absolute',
            top: '0px',
            
            overflow: 'hidden'
        };
        
        switch (imagePosition) {
        case 'over':
            imgDataHover = true;
            defaultContainerStyle = Object.assign({}, defaultContainerStyle, {
                left: '0px'                    
            });
            break;
            
        case 'beside':
        default:
            imgDataHover = false;
            defaultContainerStyle = Object.assign({}, defaultContainerStyle, {
                left: '100%',
                marginLeft: '10px',
                border: '1px solid #d6d6d6',
            });
            break;
        }

        const computedContainerStyle = {
            width: smallImage.width,
            height: smallImage.height,
            opacity: this.state.isTransitionActive ? 1 : 0,
            transition: `opacity ${fadeDurationInMs}ms ease-in`
        };

        const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

        const computedImageStyle = {
            width: largeImage.width,
            height: largeImage.height,
            transform: translate,
            WebkitTransform: translate,
            msTransform: translate
        };
        
        const component = (
            <div { ...{
                className: containerClassName,
                key: 'enlarged',
                style: Object.assign({}, defaultContainerStyle, containerStyle, computedContainerStyle)
            }}>
                <img data-hover={imgDataHover} { ...{
                    alt: largeImage.alt,
                    className: imageClassName,
                    src: largeImage.src,
                    srcSet: largeImage.srcSet,
                    style: Object.assign({}, imageStyle, computedImageStyle)
                }}/>
            </div>
        );
        
        if (isRenderOnDemand) {
            return isVisible ? component : null;
        }

        return component;
    }
});
