import type {
    ContainerDimensions, Point,
} from 'src/types';

function getSmallToLargeElementRatio(
    smallElement: ContainerDimensions,
    largeElement: ContainerDimensions,
): Point {
    return {
        x: smallElement.width ? (largeElement.width / smallElement.width) : 1,
        y: smallElement.height ? (largeElement.height / smallElement.height) : 1,
    };
}

export function getSmallToLargeImageRatio(
    smallImage: ContainerDimensions,
    largeImage: ContainerDimensions,
): Point {
    return getSmallToLargeElementRatio(smallImage, largeImage);
}

export function getLargeToSmallImageRatio(
    smallImage: ContainerDimensions,
    largeImage: ContainerDimensions,
): Point {
    return {
        x: smallImage.width ? (smallImage.width / largeImage.width) : 1,
        y: smallImage.height ? (smallImage.height / largeImage.height) : 1,
    };
}

export function getContainerToImageRatio(
    container: ContainerDimensions,
    image: ContainerDimensions,
): Point {
    return getSmallToLargeElementRatio(
        container,
        {
            width: image.width - container.width,
            height: image.height - container.height,
        },
    );
}
