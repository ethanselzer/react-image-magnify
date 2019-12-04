import React from 'react';
import objectAssign from 'object-assign';
import clamp from 'clamp';
import Lens from './Lens';
import LensPropTypes from '../../prop-types/Lens';

var LensBottom = function LensBottom(_ref) {
    var cursorOffset = _ref.cursorOffset,
        position = _ref.position,
        fadeDurationInMs = _ref.fadeDurationInMs,
        isActive = _ref.isActive,
        isPositionOutside = _ref.isPositionOutside,
        smallImage = _ref.smallImage,
        parentSpecifiedStyle = _ref.style;


    var clearLensHeight = cursorOffset.y * 2;
    var computedHeight = smallImage.height - position.y - cursorOffset.y;
    var maxHeight = smallImage.height - clearLensHeight;
    var height = clamp(computedHeight, 0, maxHeight);
    var clearLensBottom = position.y + cursorOffset.y;
    var top = Math.max(clearLensBottom, clearLensHeight);
    var computedStyle = {
        height: height + 'px',
        width: '100%',
        top: top + 'px'
    };

    return React.createElement(Lens, {
        fadeDurationInMs: fadeDurationInMs,
        isActive: isActive,
        isPositionOutside: isPositionOutside,
        style: objectAssign({}, parentSpecifiedStyle, computedStyle)
    });
};

LensBottom.propTypes = LensPropTypes;

export default LensBottom;