import { getLargeToSmallImageRatio } from './imageRatio';

export function getLensCursorOffset(smallImage, largeImage, enlargedImageContainerDimensions) {
    var ratio = getLargeToSmallImageRatio(smallImage, largeImage);
    return {
        x: getLensCursorOffsetDimension(enlargedImageContainerDimensions.width, ratio.x),
        y: getLensCursorOffsetDimension(enlargedImageContainerDimensions.height, ratio.y)
    };
}

function getLensCursorOffsetDimension(enlargedImageContainerDimension, ratio) {
    return Math.round(enlargedImageContainerDimension * ratio / 2);
}