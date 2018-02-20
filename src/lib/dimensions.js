export function isPercentageFormat(val) {
    return (
        typeof val === 'string' &&
        /^\d+%$/.test(val)
    );
}

export function convertPercentageToDecimal(percentage) {
    return parseInt(percentage) / 100;
}

export function getEnlargedImageContainerDimension({ containerDimension, smallImageDimension }) {
    if (isPercentageFormat(containerDimension)) {
        return smallImageDimension * convertPercentageToDecimal(containerDimension);
    }

    return containerDimension;
}

export function getDefaultEnlargedImageContainerDimensions(smallImage) {
    const {
        width,
        height
    } = smallImage;

    return {
        width,
        height
    };
}
