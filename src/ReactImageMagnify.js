import detectIt from 'detect-it';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCursorPosition from 'react-cursor-position';

import RenderEnlargedImage from './RenderEnlargedImage';
import ShadedLens from './shaded-lens';
import DisplayUntilActive from './hint/DisplayUntilActive';
import Hint from './hint/DefaultHint';

import { getLensCursorOffset } from './lib/lens';
import { getEnlargedImageContainerDimension } from './lib/dimensions';
import {
    getContainerStyle,
    getSmallImageStyle
} from './lib/styles';
import {
    LargeImageShape,
    SmallImageShape
} from './prop-types/Image';
import {
    EnlargedImagePosition,
    EnlargedImageContainerDimensions
} from './prop-types/EnlargedImage';
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
        style: PropTypes.object,
        hoverDelayInMs: PropTypes.number,
        hoverOffDelayInMs: PropTypes.number,
        fadeDurationInMs: PropTypes.number,
        pressDuration: PropTypes.number,
        pressMoveThreshold: PropTypes.number,
        isActivatedOnTouch: PropTypes.bool,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        lensStyle: PropTypes.object,
        smallImage: SmallImageShape,
        largeImage: LargeImageShape,
        enlargedImageContainerClassName: PropTypes.string,
        enlargedImageContainerStyle: PropTypes.object,
        enlargedImageClassName: PropTypes.string,
        enlargedImageStyle: PropTypes.object,
        enlargedImageContainerDimensions: EnlargedImageContainerDimensions,
        enlargedImagePosition: EnlargedImagePosition,
        enlargedImagePortalId: PropTypes.string,
        isEnlargedImagePortalEnabledForTouch: PropTypes.bool,
        hintComponent: PropTypes.func,
        hintTextMouse: PropTypes.string,
        hintTextTouch: PropTypes.string,
        isHintEnabled: PropTypes.bool,
        shouldHideHintAfterFirstActivation: PropTypes.bool
    };

    static defaultProps = {
        enlargedImageContainerDimensions: {
            width: '100%',
            height: '100%'
        },
        isEnlargedImagePortalEnabledForTouch: false,
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
        const { over: OVER } = ENLARGED_IMAGE_POSITION;
        return this.enlargedImagePlacement === OVER;
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
        const isInPlaceMode = this.isInPlaceMode;

        return {
            width: getEnlargedImageContainerDimension({
                containerDimension: containerWidth,
                smallImageDimension: smallImageWidth,
                isInPlaceMode
            }),
            height: getEnlargedImageContainerDimension({
                containerDimension: containerHeight,
                smallImageDimension: smallImageHeight,
                isInPlaceMode
            })
        };
    }

    get isTouchDetected() {
        const {
            detectedInputType: {
                isTouchDetected
            }
        } = this.state;

        return isTouchDetected;
    }

    get shouldShowLens() {
        return (
            !this.isInPlaceMode &&
            !this.isTouchDetected
        );
    }

    render() {
        const {
            className,
            style,
            hoverDelayInMs,
            hoverOffDelayInMs,
            isActivatedOnTouch,
            pressDuration,
            pressMoveThreshold,
            smallImage: {
                onError = noop
            },
            imageClassName,
            imageStyle,
            lensStyle,
            largeImage,
            enlargedImageContainerClassName,
            enlargedImageContainerStyle,
            enlargedImageClassName,
            enlargedImageStyle,
            enlargedImagePortalId,
            isEnlargedImagePortalEnabledForTouch,
            fadeDurationInMs,
            hintComponent: HintComponent,
            isHintEnabled,
            hintTextMouse,
            hintTextTouch,
            shouldHideHintAfterFirstActivation
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
                <RenderEnlargedImage { ...{
                    containerClassName: enlargedImageContainerClassName,
                    containerDimensions: this.enlargedImageContainerDimensions,
                    containerStyle: enlargedImageContainerStyle,
                    cursorOffset,
                    fadeDurationInMs,
                    imageClassName: enlargedImageClassName,
                    imageStyle: enlargedImageStyle,
                    largeImage,
                    smallImage,
                    portalId: enlargedImagePortalId,
                    isPortalEnabledForTouch: isEnlargedImagePortalEnabledForTouch,
                    isTouchDetected: this.isTouchDetected,
                    isInPlaceMode: this.isInPlaceMode
                }}/>
            </ReactCursorPosition>
        );
    }
}

export default ReactImageMagnify;
