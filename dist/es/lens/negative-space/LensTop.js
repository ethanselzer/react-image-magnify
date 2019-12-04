import React from 'react';
import clamp from 'clamp';
import objectAssign from 'object-assign';
import Lens from './Lens';
import LensPropTypes from '../../prop-types/Lens';

var LensTop = function LensTop(_ref) {
    var cursorOffset = _ref.cursorOffset,
        position = _ref.position,
        fadeDurationInMs = _ref.fadeDurationInMs,
        isActive = _ref.isActive,
        isPositionOutside = _ref.isPositionOutside,
        smallImage = _ref.smallImage,
        parentSpecifiedStyle = _ref.style;

    var clearLensHeight = cursorOffset.y * 2;
    var maxHeight = smallImage.height - clearLensHeight;
    var height = clamp(position.y - cursorOffset.y, 0, maxHeight);
    var computedStyle = {
        height: height + 'px',
        width: '100%',
        top: '0px'
    };

    return React.createElement(Lens, {
        fadeDurationInMs: fadeDurationInMs,
        isActive: isActive,
        isPositionOutside: isPositionOutside,
        style: objectAssign({}, parentSpecifiedStyle, computedStyle)
    });
};

LensTop.propTypes = LensPropTypes;

export default LensTop;