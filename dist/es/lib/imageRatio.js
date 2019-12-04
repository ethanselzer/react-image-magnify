
export function getSmallToLargeImageRatio(smallImage, largeImage) {
    return getSmallToLargeElementRatio(smallImage, largeImage);
}

export function getLargeToSmallImageRatio(smallImage, largeImage) {
    return {
        x: smallImage.width / largeImage.width,
        y: smallImage.height / largeImage.height
    };
}

export function getContainerToImageRatio(container, image) {
    return getSmallToLargeElementRatio(container, {
        width: image.width - container.width,
        height: image.height - container.height
    });
}

function getSmallToLargeElementRatio(smallElement, largeElement) {
    return {
        x: largeElement.width / smallElement.width,
        y: largeElement.height / smallElement.height
    };
}