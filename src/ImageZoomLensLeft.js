import React from 'react';
import clamp from 'lodash.clamp';
import Lens from './ImageZoomLens';

export default ({
    cursorOffset,
    cursorPosition,
    isHovering,
    smallImage,
}) => {

    const height = cursorOffset.y * 2;
    const maxHeight =  smallImage.height - height;
    const maxWidth = smallImage.width - (cursorOffset.x * 2);
    const width = clamp(cursorPosition.x - cursorOffset.x, 0, maxWidth);
    const translateY = clamp(cursorPosition.y - cursorOffset.y, 0, maxHeight);

    return (
        <Lens {...{
            isHovering,
            style: {
                height: `${height}px`,
                width: `${width}px`,
                backgroundColor: 'rgba(0,0,0,.4)',
                top: '0px',
                left: '0px'
            },
            translateY
        }}/>
    );
}
