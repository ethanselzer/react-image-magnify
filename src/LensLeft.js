import React from 'react';
import clamp from 'clamp';
import Lens from './Lens';

const LensLeft = ({
    cursorOffset,
    position,
    fadeDurationInMs,
    isHovering,
    smallImage,
    style
}) => {

    const height = cursorOffset.y * 2;
    const maxHeight =  smallImage.height - height;
    const maxWidth = smallImage.width - (cursorOffset.x * 2);
    const width = clamp(position.x - cursorOffset.x, 0, maxWidth);
    const translateY = clamp(position.y - cursorOffset.y, 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: `${width}px`,
        top: '0px',
        left: '0px'
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

export default LensLeft;
