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
            fadeDurationInMs: 0
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
        largeImage: ImageShape,
        smallImage: ImageShape
    },

    componentWillReceiveProps(nextProps) {
        const { isHovering } = nextProps;

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
                    isTransitionLeaving: false,
                    isTransitionDone: true
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
            isHovering,
            largeImage,
            smallImage,
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

        const defaultContainerStyle = {
            marginLeft: '10px',
            position: 'absolute',
            left: '100%',
            top: '0px',
            border: '1px solid #d6d6d6',
            overflow: 'hidden'
        };

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
                <img data-hover="false" { ...{
                    alt: largeImage.alt,
                    className: imageClassName,
                    src: largeImage.src,
                    style: Object.assign({}, imageStyle, computedImageStyle)
                }}/>
            </div>
        );

        return isVisible ? component : null;
    }
});
