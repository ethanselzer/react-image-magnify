import React from 'react';
import objectAssign from 'object-assign';
import clamp from 'clamp';
import Lens from './Lens';
import LensPropTypes from '../../prop-types/Lens';

var LensRight = function LensRight(_ref) {
    var cursorOffset = _ref.cursorOffset,
        position = _ref.position,
        fadeDurationInMs = _ref.fadeDurationInMs,
        isActive = _ref.isActive,
        isPositionOutside = _ref.isPositionOutside,
        smallImage = _ref.smallImage,
        parentSpecifiedStyle = _ref.style;

    var clearLensHeight = cursorOffset.y * 2;
    var clearLensWidth = cursorOffset.x * 2;
    var maxHeight = smallImage.height - clearLensHeight;
    var maxWidth = smallImage.width - clearLensWidth;
    var height = clearLensHeight;
    var width = clamp(smallImage.width - position.x - cursorOffset.x, 0, maxWidth);
    var top = clamp(position.y - cursorOffset.y, 0, maxHeight);
    var computedStyle = {
        height: height + 'px',
        width: width + 'px',
        top: top + 'px',
        right: '0px'
    };

    return React.createElement(Lens, {
        fadeDurationInMs: fadeDurationInMs,
        isActive: isActive,
        isPositionOutside: isPositionOutside,
        style: objectAssign({}, parentSpecifiedStyle, computedStyle)
    });
};

LensRight.propTypes = LensPropTypes;

export default LensRight;