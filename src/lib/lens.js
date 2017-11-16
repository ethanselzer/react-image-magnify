import { getLargeToSmallImageRatio } from './imageRatio';

export function getLensCursorOffset(smallImage, largeImage) {
    const ratio = getLargeToSmallImageRatio(smallImage, largeImage);
    return {
        x: getLensCursorOffsetDimension(smallImage.width, ratio.x),
        y: getLensCursorOffsetDimension(smallImage.height, ratio.y)
    }
}

function getLensCursorOffsetDimension(smallImageDimension, ratio) {
    return Math.round((smallImageDimension * ratio) / 2);
}
