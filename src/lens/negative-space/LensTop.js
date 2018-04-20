import React from 'react';
import clamp from 'clamp';
import objectAssign from 'object-assign';
import Lens from './Lens';
import LensPropTypes from '../../prop-types/Lens';

const LensTop = ({
    cursorOffset,
    position,
    fadeDurationInMs,
    isActive,
    isPositionOutside,
    smallImage,
    style: parentSpecifiedStyle
}) => {
    const clearLensHeight =  cursorOffset.y * 2;
    const maxHeight = smallImage.height - clearLensHeight;
    const height = clamp(position.y - cursorOffset.y, 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: '100%',
        top: '0px'
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

LensTop.propTypes = LensPropTypes;

export default LensTop;
