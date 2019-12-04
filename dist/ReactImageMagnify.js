'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _detectIt = require('detect-it');

var _detectIt2 = _interopRequireDefault(_detectIt);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCursorPosition = require('react-cursor-position');

var _reactCursorPosition2 = _interopRequireDefault(_reactCursorPosition);

var _RenderEnlargedImage = require('./RenderEnlargedImage');

var _RenderEnlargedImage2 = _interopRequireDefault(_RenderEnlargedImage);

var _negativeSpace = require('./lens/negative-space');

var _negativeSpace2 = _interopRequireDefault(_negativeSpace);

var _positiveSpace = require('./lens/positive-space');

var _positiveSpace2 = _interopRequireDefault(_positiveSpace);

var _DisplayUntilActive = require('./hint/DisplayUntilActive');

var _DisplayUntilActive2 = _interopRequireDefault(_DisplayUntilActive);

var _DefaultHint = require('./hint/DefaultHint');

var _DefaultHint2 = _interopRequireDefault(_DefaultHint);

var _lens = require('./lib/lens');

var _dimensions = require('./lib/dimensions');

var _styles = require('./lib/styles');

var _Image = require('./prop-types/Image');

var _EnlargedImage = require('./prop-types/EnlargedImage');

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactImageMagnify = function (_React$Component) {
    _inherits(ReactImageMagnify, _React$Component);

    function ReactImageMagnify(props) {
        _classCallCheck(this, ReactImageMagnify);

        var _this = _possibleConstructorReturn(this, (ReactImageMagnify.__proto__ || Object.getPrototypeOf(ReactImageMagnify)).call(this, props));

        var primaryInput = _detectIt2.default.primaryInput;
        var MOUSE = _constants.INPUT_TYPE.mouse,
            TOUCH = _constants.INPUT_TYPE.touch;


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
                onLoad = _props$smallImage$onL === undefined ? _utils.noop : _props$smallImage$onL,
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
                onError = _props$smallImage$onE === undefined ? _utils.noop : _props$smallImage$onE,
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


            var cursorOffset = (0, _lens.getLensCursorOffset)(smallImage, largeImage, this.enlargedImageContainerDimensions);

            var Lens = this.lensComponent;

            return _react2.default.createElement(
                _reactCursorPosition2.default,
                {
                    className: className,
                    hoverDelayInMs: hoverDelayInMs,
                    hoverOffDelayInMs: hoverOffDelayInMs,
                    isActivatedOnTouch: isActivatedOnTouch,
                    onDetectedInputTypeChanged: this.onDetectedInputTypeChanged,
                    pressDuration: pressDuration,
                    pressMoveThreshold: pressMoveThreshold,
                    shouldStopTouchMovePropagation: true,
                    style: (0, _styles.getContainerStyle)(smallImage, style)
                },
                _react2.default.createElement('img', {
                    src: smallImage.src,
                    srcSet: smallImage.srcSet,
                    sizes: smallImage.sizes,
                    alt: smallImage.alt,
                    className: imageClassName,
                    style: (0, _styles.getSmallImageStyle)(smallImage, imageStyle),
                    ref: function ref(el) {
                        return _this2.smallImageEl = el;
                    },
                    onLoad: this.onSmallImageLoad,
                    onError: onError
                }),
                isHintEnabled && _react2.default.createElement(
                    _DisplayUntilActive2.default,
                    {
                        shouldHideAfterFirstActivation: shouldHideHintAfterFirstActivation
                    },
                    _react2.default.createElement(HintComponent, {
                        isTouchDetected: isTouchDetected,
                        hintTextMouse: hintTextMouse,
                        hintTextTouch: hintTextTouch
                    })
                ),
                this.shouldShowLens && _react2.default.createElement(Lens, {
                    cursorOffset: cursorOffset,
                    fadeDurationInMs: fadeDurationInMs,
                    smallImage: smallImage,
                    style: lensStyle
                }),
                _react2.default.createElement(_RenderEnlargedImage2.default, {
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


            return (0, _objectAssign2.default)({}, smallImage, {
                width: fluidWidth,
                height: fluidHeight
            });
        }
    }, {
        key: 'enlargedImagePlacement',
        get: function get() {
            var userDefinedEnlargedImagePosition = this.props.enlargedImagePosition;
            var isTouchDetected = this.state.detectedInputType.isTouchDetected;


            var computedEnlargedImagePosition = isTouchDetected ? _constants.ENLARGED_IMAGE_POSITION.over : _constants.ENLARGED_IMAGE_POSITION.beside;

            return userDefinedEnlargedImagePosition || computedEnlargedImagePosition;
        }
    }, {
        key: 'isInPlaceMode',
        get: function get() {
            var OVER = _constants.ENLARGED_IMAGE_POSITION.over;

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
                width: (0, _dimensions.getEnlargedImageContainerDimension)({
                    containerDimension: containerWidth,
                    smallImageDimension: smallImageWidth,
                    isInPlaceMode: isInPlaceMode
                }),
                height: (0, _dimensions.getEnlargedImageContainerDimension)({
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
                return _positiveSpace2.default;
            }

            return _negativeSpace2.default;
        }
    }]);

    return ReactImageMagnify;
}(_react2.default.Component);

ReactImageMagnify.propTypes = {
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    hoverDelayInMs: _propTypes2.default.number,
    hoverOffDelayInMs: _propTypes2.default.number,
    fadeDurationInMs: _propTypes2.default.number,
    pressDuration: _propTypes2.default.number,
    pressMoveThreshold: _propTypes2.default.number,
    isActivatedOnTouch: _propTypes2.default.bool,
    imageClassName: _propTypes2.default.string,
    imageStyle: _propTypes2.default.object,
    lensStyle: _propTypes2.default.object,
    lensComponent: _propTypes2.default.func,
    shouldUsePositiveSpaceLens: _propTypes2.default.bool,
    smallImage: _Image.SmallImageShape,
    largeImage: _Image.LargeImageShape,
    enlargedImageContainerClassName: _propTypes2.default.string,
    enlargedImageContainerStyle: _propTypes2.default.object,
    enlargedImageClassName: _propTypes2.default.string,
    enlargedImageStyle: _propTypes2.default.object,
    enlargedImageContainerDimensions: _EnlargedImage.EnlargedImageContainerDimensions,
    enlargedImagePosition: _EnlargedImage.EnlargedImagePosition,
    enlargedImagePortalId: _propTypes2.default.string,
    isEnlargedImagePortalEnabledForTouch: _propTypes2.default.bool,
    hintComponent: _propTypes2.default.func,
    hintTextMouse: _propTypes2.default.string,
    hintTextTouch: _propTypes2.default.string,
    isHintEnabled: _propTypes2.default.bool,
    shouldHideHintAfterFirstActivation: _propTypes2.default.bool
};
ReactImageMagnify.defaultProps = {
    enlargedImageContainerDimensions: {
        width: '100%',
        height: '100%'
    },
    isEnlargedImagePortalEnabledForTouch: false,
    fadeDurationInMs: 300,
    hintComponent: _DefaultHint2.default,
    shouldHideHintAfterFirstActivation: true,
    isHintEnabled: false,
    hintTextMouse: 'Hover to Zoom',
    hintTextTouch: 'Long-Touch to Zoom',
    hoverDelayInMs: 250,
    hoverOffDelayInMs: 150,
    shouldUsePositiveSpaceLens: false
};
exports.default = ReactImageMagnify;