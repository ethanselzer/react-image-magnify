'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLensModeEnlargedImageCoordinates = getLensModeEnlargedImageCoordinates;
exports.getInPlaceEnlargedImageCoordinates = getInPlaceEnlargedImageCoordinates;

var _clamp = require('clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _imageRatio = require('./imageRatio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMinCoordinates(container, largeImage) {
    return {
        x: (largeImage.width - container.width) * -1,
        y: (largeImage.height - container.height) * -1
    };
}

function getMaxCoordinates() {
    return {
        x: 0,
        y: 0
    };
}

function getLensModeEnlargedImageCoordinates(_ref) {
    var containerDimensions = _ref.containerDimensions,
        lensCursorOffset = _ref.cursorOffset,
        largeImage = _ref.largeImage,
        position = _ref.position,
        smallImage = _ref.smallImage;

    var adjustedPosition = getCursorPositionAdjustedForLens(position, lensCursorOffset);
    var ratio = (0, _imageRatio.getSmallToLargeImageRatio)(smallImage, largeImage);
    var coordinates = {
        x: Math.round(adjustedPosition.x * ratio.x) * -1,
        y: Math.round(adjustedPosition.y * ratio.y) * -1
    };
    var minCoordinates = getMinCoordinates(containerDimensions, largeImage);
    var maxCoordinates = getMaxCoordinates();

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

function getInPlaceEnlargedImageCoordinates(_ref2) {
    var containerDimensions = _ref2.containerDimensions,
        largeImage = _ref2.largeImage,
        position = _ref2.position;

    var minCoordinates = getMinCoordinates(containerDimensions, largeImage);
    var maxCoordinates = getMaxCoordinates();
    var ratio = (0, _imageRatio.getContainerToImageRatio)(containerDimensions, largeImage);
    var coordinates = {
        x: Math.round(position.x * ratio.x) * -1,
        y: Math.round(position.y * ratio.y) * -1
    };

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

function clampImageCoordinates(imageCoordinates, minCoordinates, maxCoordinates) {
    return {
        x: (0, _clamp2.default)(imageCoordinates.x, minCoordinates.x, maxCoordinates.x),
        y: (0, _clamp2.default)(imageCoordinates.y, minCoordinates.y, maxCoordinates.y)
    };
}

function getCursorPositionAdjustedForLens(position, lensCursorOffset) {
    return {
        x: position.x - lensCursorOffset.x,
        y: position.y - lensCursorOffset.y
    };
}