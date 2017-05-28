import React from 'react';
import clamp from 'clamp';
import Lens from './Lens';

const LensBottom = ({
    cursorOffset,
    position,
    fadeDurationInMs,
    isHovering,
    smallImage,
    style
}) => {

    const maxHeight = smallImage.height - (cursorOffset.y * 2);
    const height = clamp(smallImage.height - position.y - cursorOffset.y, 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: '100%',
        bottom: '0px'
    };

    return (
        <Lens {...{
            fadeDurationInMs,
            isHovering,
            style: Object.assign(
                {},
                style,
                computedStyle
            )
        }}/>
    );
};

export default LensBottom;
