import React from 'react';
import objectAssign from 'object-assign';

import LensTop from './LensTop';
import LensLeft from './LensLeft';
import LensRight from './LensRight';
import LensBottom from './LensBottom';

import LensPropTypes from '../prop-types/Lens';

export default function ImageLensShaded({
    cursorOffset,
    fadeDurationInMs,
    isActive,
    isPositionOutside,
    position,
    smallImage,
    style: userSpecifiedStyle
}) {
    const compositLensStyle = objectAssign(
        { backgroundColor: 'rgba(0,0,0,.4)' },
        userSpecifiedStyle
    );

    return (
        <div>
            <LensTop { ...{
                cursorOffset,
                fadeDurationInMs,
                isActive,
                isPositionOutside,
                position,
                smallImage,
                style: compositLensStyle
            }} />
            <LensLeft { ...{
                cursorOffset,
                fadeDurationInMs,
                isActive,
                isPositionOutside,
                position,
                smallImage,
                style: compositLensStyle
            }} />
            <LensRight { ...{
                cursorOffset,
                fadeDurationInMs,
                isActive,
                isPositionOutside,
                position,
                smallImage,
                style: compositLensStyle
            }} />
            <LensBottom { ...{
                cursorOffset,
                fadeDurationInMs,
                isActive,
                isPositionOutside,
                position,
                smallImage,
                style: compositLensStyle
            }} />
        </div>
    );
}

ImageLensShaded.propTypes = LensPropTypes;
