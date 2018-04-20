import React from 'react';
import objectAssign from 'object-assign';
import clamp from 'clamp';
import Lens from './Lens';
import LensPropTypes from '../../prop-types/Lens';

const LensLeft = ({
    cursorOffset,
    position,
    fadeDurationInMs,
    isActive,
    isPositionOutside,
    smallImage,
    style: parentSpecifiedStyle
}) => {
    const clearLensHeight = cursorOffset.y * 2;
    const clearLensWidth = cursorOffset.x * 2;
    const maxHeight =  smallImage.height - clearLensHeight;
    const maxWidth = smallImage.width - clearLensWidth;
    const height = clearLensHeight;
    const width = clamp(position.x - cursorOffset.x, 0, maxWidth);
    const top = clamp(position.y - cursorOffset.y, 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        left: '0px'
    };

    return (
        <Lens {...{
            fadeDurationInMs,
            isActive,
            isPositionOutside,
            style: objectAssign(
                {},
                parentSpecifiedStyle,
                computedStyle
            )
        }}/>
    );
};

LensLeft.propTypes = LensPropTypes;

export default LensLeft;
