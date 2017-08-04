import React from 'react';
import objectAssign from 'object-assign';
import clamp from 'clamp';
import Lens from './Lens';

const LensBottom = ({
    cursorOffset,
    position,
    fadeDurationInMs,
    isActive,
    isPositionOutside,
    smallImage,
    style
}) => {

    const maxHeight = smallImage.height - (cursorOffset.y * 2);
    const height = clamp(smallImage.height - position.y - cursorOffset.y, 0, maxHeight);
    const top = Math.max(position.y + cursorOffset.y, cursorOffset.y * 2);
    const computedStyle = {
        height: `${height}px`,
        width: '100%',
        top
    };

    return (
        <Lens {...{
            fadeDurationInMs,
            isActive,
            isPositionOutside,
            style: objectAssign(
                {},
                style,
                computedStyle
            )
        }}/>
    );
};

export default LensBottom;
