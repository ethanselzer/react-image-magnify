'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPercentageFormat = isPercentageFormat;
exports.convertPercentageToDecimal = convertPercentageToDecimal;
exports.getEnlargedImageContainerDimension = getEnlargedImageContainerDimension;
function isPercentageFormat(val) {
    return typeof val === 'string' && /^\d+%$/.test(val);
}

function convertPercentageToDecimal(percentage) {
    return parseInt(percentage) / 100;
}

function getEnlargedImageContainerDimension(_ref) {
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