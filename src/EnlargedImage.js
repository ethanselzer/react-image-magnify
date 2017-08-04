import React from 'react';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import clamp from 'clamp';
import ImageShape from './ImageShape';
import Point from './Point';

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
        smallImage: ImageShape,
        imagePosition: PropTypes.oneOf(['beside', 'over'])
    };

    componentWillReceiveProps(nextProps) {
        const {
            fadeDurationInMs,
            isActive,
            isPositionOutside
        } = this.props;

        if (isActive === nextProps.isActive && isPositionOutside === nextProps.isPositionOutside) {
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

    componentWillUnmount() {
        this.timers.forEach((timerId) => {
            clearTimeout(timerId);
        });
    }

    render() {
        const {
            containerClassName,
            containerStyle,
            cursorOffset,
            position,
            fadeDurationInMs,
            imageClassName,
            imageStyle,
            isLazyLoaded,
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
            x: (Math.round((position.x - cursorOffset.x) * offsetRatio.x) * -1),
            y: (Math.round((position.y - cursorOffset.y) * offsetRatio.y) * -1)
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

        let defaultContainerStyle = {
            position: 'absolute',
            top: '0px',
            overflow: 'hidden'
        };

        switch (imagePosition) {
        case 'over':
            defaultContainerStyle = objectAssign({}, defaultContainerStyle, {
                left: '0px'
            });
            break;
        case 'beside':
        default:
            defaultContainerStyle = objectAssign({}, defaultContainerStyle, {
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
            transition: `opacity ${fadeDurationInMs}ms ease-in`,
            pointerEvents: 'none'
        };

        const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

        const computedImageStyle = {
            width: largeImage.width,
            height: largeImage.height,
            transform: translate,
            WebkitTransform: translate,
            msTransform: translate,
            pointerEvents: 'none'
        };

        const component = (
            <div { ...{
                className: containerClassName,
                style: objectAssign({}, defaultContainerStyle, containerStyle, computedContainerStyle)
            }}>
                <img { ...{
                    alt: largeImage.alt,
                    className: imageClassName,
                    src: largeImage.src,
                    srcSet: largeImage.srcSet,
                    sizes: largeImage.sizes,
                    style: objectAssign({}, imageStyle, computedImageStyle)
                }}/>
            </div>
        );

        if (isLazyLoaded) {
            return isVisible ? component : null;
        }

        return component;
    }
}
