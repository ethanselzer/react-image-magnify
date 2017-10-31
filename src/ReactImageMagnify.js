import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import ReactCursorPosition from 'react-cursor-position';
import objectAssign from 'object-assign';
import detectIt from 'detect-it';

import ImageLensShaded from './ImageLensShaded';
import EnlargedImage from './EnlargedImage';
import DisplayUntilActive from './hint/DisplayUntilActive';
import Hint from './hint/DefaultHint';
import ImageShape from './ImageShape';
import noop from './noop';

class ReactImageMagnify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            smallImageWidth: 0,
            smallImageHeight: 0,
            detectedEnvironment: {
                isMouseDeteced: detectIt.hasMouse,
                isTouchDetected: detectIt.hasTouch
            },
            isActive: false
        }

        this.onSmallImageLoad = this.onSmallImageLoad.bind(this);
        this.setSmallImageDimensionState = this.setSmallImageDimensionState.bind(this);
        this.onDetectedEnvironmentChanged = this.onDetectedEnvironmentChanged.bind(this);
        this.onActivationChanged = this.onActivationChanged.bind(this);
    }

    static propTypes = {
        className: PropTypes.string,
        enlargedImageContainerClassName: PropTypes.string,
        enlargedImageContainerStyle: PropTypes.object,
        enlargedImageClassName: PropTypes.string,
        enlargedImageStyle: PropTypes.object,
        fadeDurationInMs: PropTypes.number,
        hintComponent: PropTypes.func,
        shouldHideHintAfterFirstActivation: PropTypes.bool,
        isHintEnabled: PropTypes.bool,
        hintTextMouse: PropTypes.string,
        hinTextTouch: PropTypes.string,
        hoverDelayInMs: PropTypes.number,
        hoverOffDelayInMs: PropTypes.number,
        isActivatedOnTouch: PropTypes.bool,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        largeImage: ImageShape,
        lensStyle: PropTypes.object,
        pressDuration: PropTypes.number,
        pressMoveThreshold: PropTypes.number,
        smallImage: PropTypes.shape({
            alt: PropTypes.string,
            isFluidWidth: PropTypes.bool,
            src: PropTypes.string.isRequired,
            srcSet: PropTypes.string,
            sizes: PropTypes.string,
            width: requiredIf(PropTypes.number, props => !props.isFluidWidth),
            height: requiredIf(PropTypes.number, props => !props.isFluidWidth),
            onLoad: PropTypes.func
        }),
        style: PropTypes.object,
        enlargedImagePosition: PropTypes.oneOf(['beside', 'over'])
    };

    static defaultProps = {
        fadeDurationInMs: 300,
        hintComponent: Hint,
        shouldHideHintAfterFirstActivation: true,
        isHintEnabled: false,
        hintTextMouse: 'Hover to Zoom',
        hintTextTouch: 'Long-Touch to Zoom',
        hoverDelayInMs: 250,
        hoverOffDelayInMs: 150
    };

    onSmallImageLoad(e) {
        const {
            smallImage: {
                onLoad = noop
            }
        } = this.props;

        onLoad(e);

        if (!this.props.smallImage.isFluidWidth) {
            return;
        }

        this.setSmallImageDimensionState();
    }

    setSmallImageDimensionState() {
        const {
            offsetWidth: smallImageWidth,
            offsetHeight: smallImageHeight
        } = this.smallImageEl;

        this.setState({
            smallImageWidth,
            smallImageHeight
        });
    }

    onDetectedEnvironmentChanged(detectedEnvironment) {
        this.setState({
            detectedEnvironment
        });
    }

    onActivationChanged({ isActive }) {
        this.setState({
            isActive
        });
    }

    getEnlargedImagePlacement() {
        const { enlargedImagePosition } = this.props;
        const {
            detectedEnvironment: {
                isTouchDetected
            }
        } = this.state;

        return enlargedImagePosition || (isTouchDetected ? 'over' : 'beside');
    }

    componentDidMount() {
        if (this.props.smallImage.isFluidWidth) {
            this.setSmallImageDimensionState();
            window.addEventListener('resize', this.setSmallImageDimensionState);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setSmallImageDimensionState);
    }

    getCursorOffsetDimension(smallImageDimension, largeImageDimension) {
        return Math.round(((smallImageDimension / largeImageDimension) * smallImageDimension) / 2);
    }

    render() {
        const {
            className,
            enlargedImageContainerClassName,
            enlargedImageContainerStyle,
            enlargedImageClassName,
            enlargedImageStyle,
            fadeDurationInMs,
            hintComponent: HintComponent,
            shouldHideHintAfterFirstActivation,
            isHintEnabled,
            hintTextMouse,
            hintTextTouch,
            hoverDelayInMs,
            hoverOffDelayInMs,
            isActivatedOnTouch,
            imageClassName,
            imageStyle,
            largeImage,
            lensStyle,
            pressDuration,
            pressMoveThreshold,
            smallImage: {
                isFluidWidth: isSmallImageFluidWidth
            },
            style,
        } = this.props;
        const {
            smallImageWidth,
            smallImageHeight,
            detectedEnvironment: {
                isTouchDetected
            }
        } = this.state;

        const fluidWidthSmallImage = objectAssign(
            {},
            this.props.smallImage,
            {
                width: smallImageWidth,
                height: smallImageHeight
            }
        );
        const fixedWidthSmallImage = this.props.smallImage;
        const smallImage = isSmallImageFluidWidth
            ? fluidWidthSmallImage
            : fixedWidthSmallImage

        const cursorOffset = {
            x: this.getCursorOffsetDimension(smallImage.width, largeImage.width),
            y: this.getCursorOffsetDimension(smallImage.height, largeImage.height)
        };

        const fluidWidthContainerStyle = {
            width: 'auto',
            height: 'auto',
            fontSize: '0px',
            position: 'relative'
        }
        const fixedWidthContainerStyle = {
            width: `${smallImage.width}px`,
            height: `${smallImage.height}px`,
            position: 'relative'
        };
        const priorityContainerStyle = isSmallImageFluidWidth
            ? fluidWidthContainerStyle
            : fixedWidthContainerStyle;
        const compositContainerStyle = objectAssign(
            {
                cursor: 'crosshair',
            },
            style,
            priorityContainerStyle
        );

        const fluidWidthSmallImageStyle = {
            width: '100%',
            height: 'auto',
            display: 'block',
            pointerEvents: 'none'
        };
        const fixedWidthSmallImageStyle = {
            width: `${smallImage.width}px`,
            height: `${smallImage.height}px`,
            pointerEvents: 'none'
        };
        const prioritySmallImageStyle = isSmallImageFluidWidth
            ? fluidWidthSmallImageStyle
            : fixedWidthSmallImageStyle;
        const compositSmallImageStyle = objectAssign(
            {},
            imageStyle,
            prioritySmallImageStyle
        );
        const enlargedImagePlacement = this.getEnlargedImagePlacement();
        const shouldShowLens = (
            enlargedImagePlacement !== 'over' &&
            !isTouchDetected
        );

        return (
            <ReactCursorPosition { ...{
                className,
                hoverDelayInMs,
                hoverOffDelayInMs,
                isActivatedOnTouch,
                onActivationChanged: this.onActivationChanged,
                onDetectedEnvironmentChanged: this.onDetectedEnvironmentChanged,
                pressDuration,
                pressMoveThreshold,
                style: compositContainerStyle
            }}>
                <img { ...{
                    src: smallImage.src,
                    srcSet: smallImage.srcSet,
                    sizes: smallImage.sizes,
                    alt: smallImage.alt,
                    className: imageClassName,
                    style: compositSmallImageStyle,
                    ref: (el) => this.smallImageEl = el,
                    onLoad: this.onSmallImageLoad
                }} />
                {isHintEnabled &&
                    <DisplayUntilActive {...{
                        shouldHideAfterFirstActivation: shouldHideHintAfterFirstActivation
                    }}>
                        <HintComponent {...{
                            isTouchDetected,
                            hintTextMouse,
                            hintTextTouch
                        }}/>
                    </DisplayUntilActive>
                }
                {shouldShowLens &&
                    <ImageLensShaded {...{
                        cursorOffset,
                        fadeDurationInMs,
                        smallImage,
                        style: lensStyle
                    }} />
                }
                <EnlargedImage { ...{
                    containerClassName: enlargedImageContainerClassName,
                    containerStyle: enlargedImageContainerStyle,
                    cursorOffset,
                    fadeDurationInMs,
                    imageClassName: enlargedImageClassName,
                    imageStyle: enlargedImageStyle,
                    imagePosition: enlargedImagePlacement,
                    largeImage,
                    smallImage
                }}/>
            </ReactCursorPosition>
        );
    }
}

export default ReactImageMagnify;
