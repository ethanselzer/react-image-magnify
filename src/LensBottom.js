import React from 'react';
import clamp from 'lodash.clamp';
import Lens from './Lens';

const LensBottom = ({
    cursorOffset,
    cursorPosition,
    fadeDurationInMs,
    isHovering,
    smallImage,
    style
}) => {

    const maxHeight = smallImage.height - (cursorOffset.y * 2);
    const height = clamp(smallImage.height - cursorPosition.y - cursorOffset.y, 0, maxHeight);
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
