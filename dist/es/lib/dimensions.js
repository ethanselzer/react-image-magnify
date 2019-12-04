export function isPercentageFormat(val) {
    return typeof val === 'string' && /^\d+%$/.test(val);
}

export function convertPercentageToDecimal(percentage) {
    return parseInt(percentage) / 100;
}

export function getEnlargedImageContainerDimension(_ref) {
    var containerDimension = _ref.containerDimension,
        smallImageDimension = _ref.smallImageDimension,
        isInPlaceMode = _ref.isInPlaceMode;

    if (isInPlaceMode) {
        return smallImageDimension;
    }

    if (isPercentageFormat(containerDimension)) {
        return smallImageDimension * convertPercentageToDecimal(containerDimension);
    }

    return containerDimension;
}