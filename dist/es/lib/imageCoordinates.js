import clamp from 'clamp';
import { getContainerToImageRatio, getSmallToLargeImageRatio } from './imageRatio';

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

export function getLensModeEnlargedImageCoordinates(_ref) {
    var containerDimensions = _ref.containerDimensions,
        lensCursorOffset = _ref.cursorOffset,
        largeImage = _ref.largeImage,
        position = _ref.position,
        smallImage = _ref.smallImage;

    var adjustedPosition = getCursorPositionAdjustedForLens(position, lensCursorOffset);
    var ratio = getSmallToLargeImageRatio(smallImage, largeImage);
    var coordinates = {
        x: Math.round(adjustedPosition.x * ratio.x) * -1,
        y: Math.round(adjustedPosition.y * ratio.y) * -1
    };
    var minCoordinates = getMinCoordinates(containerDimensions, largeImage);
    var maxCoordinates = getMaxCoordinates();

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

export function getInPlaceEnlargedImageCoordinates(_ref2) {
    var containerDimensions = _ref2.containerDimensions,
        largeImage = _ref2.largeImage,
        position = _ref2.position;

    var minCoordinates = getMinCoordinates(containerDimensions, largeImage);
    var maxCoordinates = getMaxCoordinates();
    var ratio = getContainerToImageRatio(containerDimensions, largeImage);
    var coordinates = {
        x: Math.round(position.x * ratio.x) * -1,
        y: Math.round(position.y * ratio.y) * -1
    };

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

function clampImageCoordinates(imageCoordinates, minCoordinates, maxCoordinates) {
    return {
        x: clamp(imageCoordinates.x, minCoordinates.x, maxCoordinates.x),
        y: clamp(imageCoordinates.y, minCoordinates.y, maxCoordinates.y)
    };
}

function getCursorPositionAdjustedForLens(position, lensCursorOffset) {
    return {
        x: position.x - lensCursorOffset.x,
        y: position.y - lensCursorOffset.y
    };
}