import React from 'react';
import clamp from 'lodash.clamp';
import Lens from './ImageZoomLens';

export default ({
    cursorOffset,
    cursorPosition,
    isHovering,
    smallImage
}) => {

    const maxHeight = smallImage.height - (cursorOffset.y * 2);
    const height = clamp(smallImage.height - cursorPosition.y - cursorOffset.y, 0, maxHeight);

    return (
        <Lens {...{
            isHovering,
            style: {
                height: `${height}px`,
                width: '100%',
                backgroundColor: 'rgba(0,0,0,.4)',
                bottom: '0px'
            }
        }}/>
    );
}
