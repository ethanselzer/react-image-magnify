import React from 'react';
import clamp from 'lodash.clamp';
import Lens from './Lens';

const LensRight = ({
    cursorOffset,
    cursorPosition,
    fadeDurationInMs,
    isHovering,
    smallImage,
    style
}) => {

    const height = cursorOffset.y * 2;
    const maxHeight =  smallImage.height - height;
    const maxWidth = smallImage.width - (cursorOffset.x * 2);
    const width = clamp(smallImage.width - cursorPosition.x - cursorOffset.x, 0, maxWidth);
    const translateY = clamp(Math.round(cursorPosition.y - cursorOffset.y), 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: `${width}px`,
        top: '0px',
        right: '0px'
    };

    return (
        <Lens {...{
            fadeDurationInMs,
            isHovering,
            style: Object.assign({}, style, computedStyle),
            translateY
        }}/>
    );
};

export default LensRight;
