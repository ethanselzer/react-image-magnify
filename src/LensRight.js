import React from 'react';
import clamp from 'lodash.clamp';
import Lens from './Lens';

export default ({
    cursorOffset,
    cursorPosition,
    isHovering,
    smallImage,
}) => {

    const height = cursorOffset.y * 2;
    const maxHeight =  smallImage.height - height;
    const maxWidth = smallImage.width - (cursorOffset.x * 2);
    const width = clamp(smallImage.width - cursorPosition.x - cursorOffset.x, 0, maxWidth);
    const translateY = clamp(Math.round(cursorPosition.y - cursorOffset.y), 0, maxHeight);

    return (
        <Lens {...{
            isHovering,
            style: {
                height: `${height}px`,
                width: `${width}px`,
                backgroundColor: 'rgba(0,0,0,.4)',
                top: '0px',
                right: '0px'
            },
            translateY
        }}/>
    );
}
