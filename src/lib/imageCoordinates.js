import clamp from 'clamp';
import {
    getContainerToImageRatio,
    getSmallToLargeImageRatio
} from './imageRatio';

function getMinCoordinates(smallImage, largeImage) {
    return {
        x: ((largeImage.width - smallImage.width) * -1),
        y: ((largeImage.height - smallImage.height) * -1)
    };
}

function getMaxCoordinates() {
    return {
        x: 0,
        y: 0
    };
}

export function getLensModeEnlargedImageCoordinates(smallImage, largeImage, position, lensCursorOffset) {
    const adjustedPosition = getCursorPositionAdjustedForLens(position, lensCursorOffset);
    const ratio = getSmallToLargeImageRatio(smallImage, largeImage);
    const coordinates = {
        x: (Math.round(adjustedPosition.x * ratio.x) * -1),
        y: (Math.round(adjustedPosition.y * ratio.y) * -1)
    };
    const minCoordinates = getMinCoordinates(smallImage, largeImage);
    const maxCoordinates = getMaxCoordinates();

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

export function getInPlaceEnlargedImageCoordinates(containerDimensions, imageDimensions, position) {
    const minCoordinates = getMinCoordinates(containerDimensions, imageDimensions);
    const maxCoordinates = getMaxCoordinates();
    const ratio = getContainerToImageRatio(containerDimensions, imageDimensions);
    const coordinates = {
        x: (Math.round(position.x * ratio.x) * -1),
        y: (Math.round(position.y * ratio.y) * -1)
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

