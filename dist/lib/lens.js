'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLensCursorOffset = getLensCursorOffset;

var _imageRatio = require('./imageRatio');

function getLensCursorOffset(smallImage, largeImage, enlargedImageContainerDimensions) {
    var ratio = (0, _imageRatio.getLargeToSmallImageRatio)(smallImage, largeImage);
    return {
        x: getLensCursorOffsetDimension(enlargedImageContainerDimensions.width, ratio.x),
        y: getLensCursorOffsetDimension(enlargedImageContainerDimensions.height, ratio.y)
    };
}

function getLensCursorOffsetDimension(enlargedImageContainerDimension, ratio) {
    return Math.round(enlargedImageContainerDimension * ratio / 2);
}