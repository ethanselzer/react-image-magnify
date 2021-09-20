import { getLargeToSmallImageRatio } from 'src/lib/imageRatio';
import type { ContainerDimensions, Point } from 'src/types';

function getLensCursorOffsetDimension(value: number, ratio: number): number {
    return Math.round((value * ratio) / 2);
}

export function getLensCursorOffset(
    smallImage: ContainerDimensions,
    largeImage: ContainerDimensions,
    enlargedImageContainerDimensions: ContainerDimensions,
): Point {
    const ratio = getLargeToSmallImageRatio(smallImage, largeImage);

    return {
        x: getLensCursorOffsetDimension(enlargedImageContainerDimensions.width, ratio.x),
        y: getLensCursorOffsetDimension(enlargedImageContainerDimensions.height, ratio.y),
    };
}
