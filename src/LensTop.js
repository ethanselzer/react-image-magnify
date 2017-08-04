import React from 'react';
import clamp from 'clamp';
import objectAssign from 'object-assign';
import Lens from './Lens';

const LensTop = ({
    cursorOffset,
    position,
    fadeDurationInMs,
    isActive,
    isPositionOutside,
    smallImage,
    style
}) => {
    const maxHeight = smallImage.height - (cursorOffset.y * 2);
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
            style: objectAssign({}, style, computedStyle)
        }}/>
    );
};

export default LensTop;
