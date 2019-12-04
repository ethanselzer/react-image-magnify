var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import detectIt from 'detect-it';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCursorPosition from 'react-cursor-position';

import RenderEnlargedImage from './RenderEnlargedImage';
import NegativeSpaceLens from './lens/negative-space';
import PositiveSpaceLens from './lens/positive-space';
import DisplayUntilActive from './hint/DisplayUntilActive';
import Hint from './hint/DefaultHint';

import { getLensCursorOffset } from './lib/lens';
import { getEnlargedImageContainerDimension } from './lib/dimensions';
import { getContainerStyle, getSmallImageStyle } from './lib/styles';
import { LargeImageShape, SmallImageShape } from './prop-types/Image';
import { EnlargedImagePosition, EnlargedImageContainerDimensions } from './prop-types/EnlargedImage';
import { noop } from './utils';
import { INPUT_TYPE, ENLARGED_IMAGE_POSITION } from './constants';

var ReactImageMagnify = function (_React$Component) {
    _inherits(ReactImageMagnify, _React$Component);

    function ReactImageMagnify(props) {
        _classCallCheck(this, ReactImageMagnify);

        var _this = _possibleConstructorReturn(this, (ReactImageMagnify.__proto__ || Object.getPrototypeOf(ReactImageMagnify)).call(this, props));

        var primaryInput = detectIt.primaryInput;
        var MOUSE = INPUT_TYPE.mouse,
            TOUCH = INPUT_TYPE.touch;


        _this.state = {
            smallImageWidth: 0,
            smallImageHeight: 0,
            detectedInputType: {
                isMouseDeteced: primaryInput === MOUSE,
                isTouchDetected: primaryInput === TOUCH
            }
        };

        _this.onSmallImageLoad = _this.onSmallImageLoad.bind(_this);
        _this.setSmallImageDimensionState = _this.setSmallImageDimensionState.bind(_this);
        _this.onDetectedInputTypeChanged = _this.onDetectedInputTypeChanged.bind(_this);
        return _this;
    }

    _createClass(ReactImageMagnify, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var isFluidWidth = this.props.smallImage.isFluidWidth;


            if (!isFluidWidth) {
                return;
            }

            this.setSmallImageDimensionState();
            window.addEventListener('resize', this.setSmallImageDimensionState);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.setSmallImageDimensionState);
        }
    }, {
        key: 'onSmallImageLoad',
        value: function onSmallImageLoad(e) {
            var _props$smallImage = this.props.smallImage,
                _props$smallImage$onL = _props$smallImage.onLoad,
                onLoad = _props$smallImage$onL === undefined ? noop : _props$smallImage$onL,
                isFluidWidth = _props$smallImage.isFluidWidth;


            onLoad(e);

            if (!isFluidWidth) {
                return;
            }

            this.setSmallImageDimensionState();
        }
    }, {
        key: 'onDetectedInputTypeChanged',
        value: function onDetectedInputTypeChanged(detectedInputType) {
            this.setState({
                detectedInputType: detectedInputType
            });
        }
    }, {
        key: 'setSmallImageDimensionState',
        value: function setSmallImageDimensionState() {
            var _smallImageEl = this.smallImageEl,
                smallImageWidth = _smallImageEl.offsetWidth,
                smallImageHeight = _smallImageEl.offsetHeight;


            this.setState({
                smallImageWidth: smallImageWidth,
                smallImageHeight: smallImageHeight
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                style = _props.style,
                hoverDelayInMs = _props.hoverDelayInMs,
                hoverOffDelayInMs = _props.hoverOffDelayInMs,
                isActivatedOnTouch = _props.isActivatedOnTouch,
                pressDuration = _props.pressDuration,
                pressMoveThreshold = _props.pressMoveThreshold,
                _props$smallImage$onE = _props.smallImage.onError,
                onError = _props$smallImage$onE === undefined ? noop : _props$smallImage$onE,
                imageClassName = _props.imageClassName,
                imageStyle = _props.imageStyle,
                lensStyle = _props.lensStyle,
                largeImage = _props.largeImage,
                enlargedImageContainerClassName = _props.enlargedImageContainerClassName,
                enlargedImageContainerStyle = _props.enlargedImageContainerStyle,
                enlargedImageClassName = _props.enlargedImageClassName,
                enlargedImageStyle = _props.enlargedImageStyle,
                enlargedImagePortalId = _props.enlargedImagePortalId,
                isEnlargedImagePortalEnabledForTouch = _props.isEnlargedImagePortalEnabledForTouch,
                fadeDurationInMs = _props.fadeDurationInMs,
                HintComponent = _props.hintComponent,
                isHintEnabled = _props.isHintEnabled,
                hintTextMouse = _props.hintTextMouse,
                hintTextTouch = _props.hintTextTouch,
                shouldHideHintAfterFirstActivation = _props.shouldHideHintAfterFirstActivation;


            var smallImage = this.smallImage;

            var isTouchDetected = this.state.detectedInputType.isTouchDetected;


            var cursorOffset = getLensCursorOffset(smallImage, largeImage, this.enlargedImageContainerDimensions);

            var Lens = this.lensComponent;

            return React.createElement(
                ReactCursorPosition,
                {
                    className: className,
                    hoverDelayInMs: hoverDelayInMs,
                    hoverOffDelayInMs: hoverOffDelayInMs,
                    isActivatedOnTouch: isActivatedOnTouch,
                    onDetectedInputTypeChanged: this.onDetectedInputTypeChanged,
                    pressDuration: pressDuration,
                    pressMoveThreshold: pressMoveThreshold,
                    shouldStopTouchMovePropagation: true,
                    style: getContainerStyle(smallImage, style)
                },
                React.createElement('img', {
                    src: smallImage.src,
                    srcSet: smallImage.srcSet,
                    sizes: smallImage.sizes,
                    alt: smallImage.alt,
                    className: imageClassName,
                    style: getSmallImageStyle(smallImage, imageStyle),
                    ref: function ref(el) {
                        return _this2.smallImageEl = el;
                    },
                    onLoad: this.onSmallImageLoad,
                    onError: onError
                }),
                isHintEnabled && React.createElement(
                    DisplayUntilActive,
                    {
                        shouldHideAfterFirstActivation: shouldHideHintAfterFirstActivation
                    },
                    React.createElement(HintComponent, {
                        isTouchDetected: isTouchDetected,
                        hintTextMouse: hintTextMouse,
                        hintTextTouch: hintTextTouch
                    })
                ),
                this.shouldShowLens && React.createElement(Lens, {
                    cursorOffset: cursorOffset,
                    fadeDurationInMs: fadeDurationInMs,
                    smallImage: smallImage,
                    style: lensStyle
                }),
                React.createElement(RenderEnlargedImage, {
                    containerClassName: enlargedImageContainerClassName,
                    containerDimensions: this.enlargedImageContainerDimensions,
                    containerStyle: enlargedImageContainerStyle,
                    cursorOffset: cursorOffset,
                    fadeDurationInMs: fadeDurationInMs,
                    imageClassName: enlargedImageClassName,
                    imageStyle: enlargedImageStyle,
                    largeImage: largeImage,
                    smallImage: smallImage,
                    portalId: enlargedImagePortalId,
                    isPortalEnabledForTouch: isEnlargedImagePortalEnabledForTouch,
                    isTouchDetected: this.isTouchDetected,
                    isInPlaceMode: this.isInPlaceMode
                })
            );
        }
    }, {
        key: 'smallImage',
        get: function get() {
            var _props2 = this.props,
                smallImage = _props2.smallImage,
                isFluidWidth = _props2.smallImage.isFluidWidth;


            if (!isFluidWidth) {
                return smallImage;
            }

            var _state = this.state,
                fluidWidth = _state.smallImageWidth,
                fluidHeight = _state.smallImageHeight;


            return objectAssign({}, smallImage, {
                width: fluidWidth,
                height: fluidHeight
            });
        }
    }, {
        key: 'enlargedImagePlacement',
        get: function get() {
            var userDefinedEnlargedImagePosition = this.props.enlargedImagePosition;
            var isTouchDetected = this.state.detectedInputType.isTouchDetected;


            var computedEnlargedImagePosition = isTouchDetected ? ENLARGED_IMAGE_POSITION.over : ENLARGED_IMAGE_POSITION.beside;

            return userDefinedEnlargedImagePosition || computedEnlargedImagePosition;
        }
    }, {
        key: 'isInPlaceMode',
        get: function get() {
            var OVER = ENLARGED_IMAGE_POSITION.over;

            return this.enlargedImagePlacement === OVER;
        }
    }, {
        key: 'enlargedImageContainerDimensions',
        get: function get() {
            var _props$enlargedImageC = this.props.enlargedImageContainerDimensions,
                containerWidth = _props$enlargedImageC.width,
                containerHeight = _props$enlargedImageC.height;
            var _smallImage = this.smallImage,
                smallImageWidth = _smallImage.width,
                smallImageHeight = _smallImage.height;

            var isInPlaceMode = this.isInPlaceMode;

            return {
                width: getEnlargedImageContainerDimension({
                    containerDimension: containerWidth,
                    smallImageDimension: smallImageWidth,
                    isInPlaceMode: isInPlaceMode
                }),
                height: getEnlargedImageContainerDimension({
                    containerDimension: containerHeight,
                    smallImageDimension: smallImageHeight,
                    isInPlaceMode: isInPlaceMode
                })
            };
        }
    }, {
        key: 'isTouchDetected',
        get: function get() {
            var isTouchDetected = this.state.detectedInputType.isTouchDetected;


            return isTouchDetected;
        }
    }, {
        key: 'shouldShowLens',
        get: function get() {
            return !this.isInPlaceMode && !this.isTouchDetected;
        }
    }, {
        key: 'lensComponent',
        get: function get() {
            var _props3 = this.props,
                shouldUsePositiveSpaceLens = _props3.shouldUsePositiveSpaceLens,
                lensComponent = _props3.lensComponent;


            if (lensComponent) {
                return lensComponent;
            }

            if (shouldUsePositiveSpaceLens) {
                return PositiveSpaceLens;
            }

            return NegativeSpaceLens;
        }
    }]);

    return ReactImageMagnify;
}(React.Component);

ReactImageMagnify.propTypes = {
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
    lensComponent: PropTypes.func,
    shouldUsePositiveSpaceLens: PropTypes.bool,
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
ReactImageMagnify.defaultProps = {
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
    hoverOffDelayInMs: 150,
    shouldUsePositiveSpaceLens: false
};


export default ReactImageMagnify;