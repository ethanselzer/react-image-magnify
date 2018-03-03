import detectIt from 'detect-it';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCursorPosition from 'react-cursor-position';
import requiredIf from 'react-required-if';

import DisplayUntilActive from './hint/DisplayUntilActive';
import EnlargedImage from './EnlargedImage';
import { getLensCursorOffset } from './lib/lens';
import {
    getEnlargedImageContainerDimension,
    getDefaultEnlargedImageContainerDimensions
} from './lib/dimensions';
import {
    getContainerStyle,
    getSmallImageStyle
} from './lib/styles';
import Hint from './hint/DefaultHint';
import ShadedLens from './shaded-lens';
import ImageShape from './prop-types/ImageShape';
import { noop } from './utils';
import {
    INPUT_TYPE,
    ENLARGED_IMAGE_POSITION
} from './constants';

class ReactImageMagnify extends React.Component {

    constructor(props) {
        super(props);

        const { primaryInput } = detectIt;
        const {
            mouse: MOUSE,
            touch: TOUCH
        } = INPUT_TYPE;

        this.state = {
            smallImageWidth: 0,
            smallImageHeight: 0,
            detectedInputType: {
                isMouseDeteced: (primaryInput === MOUSE),
                isTouchDetected: (primaryInput === TOUCH)
            }
        }

        this.onSmallImageLoad = this.onSmallImageLoad.bind(this);
        this.setSmallImageDimensionState = this.setSmallImageDimensionState.bind(this);
        this.onDetectedInputTypeChanged = this.onDetectedInputTypeChanged.bind(this);
    }

    static propTypes = {
        className: PropTypes.string,
        enlargedImageContainerClassName: PropTypes.string,
        enlargedImageContainerStyle: PropTypes.object,
        enlargedImageClassName: PropTypes.string,
        enlargedImageStyle: PropTypes.object,
        enlargedImageContainerDimensions: PropTypes.object,
        fadeDurationInMs: PropTypes.number,
        hintComponent: PropTypes.func,
        shouldHideHintAfterFirstActivation: PropTypes.bool,
        isHintEnabled: PropTypes.bool,
        hintTextMouse: PropTypes.string,
        hintTextTouch: PropTypes.string,
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
            onLoad: PropTypes.func,
            onError: PropTypes.func
        }),
        style: PropTypes.object,
        enlargedImagePosition: PropTypes.oneOf([
            ENLARGED_IMAGE_POSITION.beside,
            ENLARGED_IMAGE_POSITION.over
        ])
    };

    static defaultProps = {
        enlargedImageContainerDimensions: {
            width: '100%',
            height: '100%'
        },
        fadeDurationInMs: 300,
        hintComponent: Hint,
        shouldHideHintAfterFirstActivation: true,
        isHintEnabled: false,
        hintTextMouse: 'Hover to Zoom',
        hintTextTouch: 'Long-Touch to Zoom',
        hoverDelayInMs: 250,
        hoverOffDelayInMs: 150
    };

    componentDidMount() {
        const {
            smallImage: {
                isFluidWidth
            }
        } = this.props;

        if (!isFluidWidth) {
            return;
        }

        this.setSmallImageDimensionState();
        window.addEventListener('resize', this.setSmallImageDimensionState);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setSmallImageDimensionState);
    }

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

    onDetectedInputTypeChanged(detectedInputType) {
        this.setState({
            detectedInputType
        });
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

    get smallImage() {
        const {
            smallImage,
            smallImage: {
                isFluidWidth: isSmallImageFluidWidth
            },
        } = this.props;
        const {
            smallImageWidth,
            smallImageHeight
        } = this.state;

        const fluidWidthSmallImage = objectAssign(
            {},
            smallImage,
            {
                width: smallImageWidth,
                height: smallImageHeight
            }
        );
        const fixedWidthSmallImage = smallImage;

        return isSmallImageFluidWidth
            ? fluidWidthSmallImage
            : fixedWidthSmallImage
    }

    get enlargedImagePlacement() {
        const {
            enlargedImagePosition: userDefinedEnlargedImagePosition
        } = this.props;

        const {
            detectedInputType: {
                isTouchDetected
            }
        } = this.state;

        const computedEnlargedImagePosition = (
            isTouchDetected
                ? ENLARGED_IMAGE_POSITION.over
                : ENLARGED_IMAGE_POSITION.beside
        );

        return userDefinedEnlargedImagePosition || computedEnlargedImagePosition;
    }

    get isInPlaceMode() {
        return this.enlargedImagePlacement === ENLARGED_IMAGE_POSITION.over;
    }

    get enlargedImageContainerDimensions() {
        const {
            enlargedImageContainerDimensions: {
                width: containerWidth,
                height: containerHeight
            }
        } = this.props;
        const {
            width: smallImageWidth,
            height: smallImageHeight
        } = this.smallImage;

        if (this.isInPlaceMode) {
            return getDefaultEnlargedImageContainerDimensions(this.smallImage);
        }

        return {
            width: getEnlargedImageContainerDimension({
                containerDimension: containerWidth,
                smallImageDimension: smallImageWidth
            }),
            height: getEnlargedImageContainerDimension({
                containerDimension: containerHeight,
                smallImageDimension: smallImageHeight
            })
        };
    }

    get shouldShowLens() {
        const {
            detectedInputType: {
                isTouchDetected
            }
        } = this.state;

        const enlargeImagePlacement = this.enlargedImagePlacement;

        return (
            enlargeImagePlacement !== ENLARGED_IMAGE_POSITION.over &&
            !isTouchDetected
        );

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
                onError = noop
            },
            style,
        } = this.props;

        const smallImage = this.smallImage;

        const {
            detectedInputType: {
                isTouchDetected
            }
        } = this.state;

        const cursorOffset = getLensCursorOffset(
            smallImage,
            largeImage,
            this.enlargedImageContainerDimensions
        );

        return (
            <ReactCursorPosition { ...{
                className,
                hoverDelayInMs,
                hoverOffDelayInMs,
                isActivatedOnTouch,
                onDetectedInputTypeChanged: this.onDetectedInputTypeChanged,
                pressDuration,
                pressMoveThreshold,
                shouldStopTouchMovePropagation: true,
                style: getContainerStyle(smallImage, style)
            }}>
                <img { ...{
                    src: smallImage.src,
                    srcSet: smallImage.srcSet,
                    sizes: smallImage.sizes,
                    alt: smallImage.alt,
                    className: imageClassName,
                    style: getSmallImageStyle(smallImage, imageStyle),
                    ref: (el) => this.smallImageEl = el,
                    onLoad: this.onSmallImageLoad,
                    onError
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
                {this.shouldShowLens &&
                    <ShadedLens {...{
                        cursorOffset,
                        fadeDurationInMs,
                        enlargedImageContainerDimensions: this.enlargedImageContainerDimensions,
                        smallImage,
                        style: lensStyle
                    }} />
                }
                <EnlargedImage { ...{
                    containerClassName: enlargedImageContainerClassName,
                    containerDimensions: this.enlargedImageContainerDimensions,
                    containerStyle: enlargedImageContainerStyle,
                    cursorOffset,
                    fadeDurationInMs,
                    imageClassName: enlargedImageClassName,
                    imageStyle: enlargedImageStyle,
                    imagePosition: this.enlargedImagePlacement,
                    largeImage,
                    smallImage
                }}/>
            </ReactCursorPosition>
        );
    }
}

export default ReactImageMagnify;
