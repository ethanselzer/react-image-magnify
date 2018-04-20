import React from 'react';
import objectAssign from 'object-assign';

import LensTop from './LensTop';
import LensLeft from './LensLeft';
import LensRight from './LensRight';
import LensBottom from './LensBottom';

import LensPropTypes from '../../prop-types/Lens';

export default function NegativeSpaceLens(inputProps) {
    const { style: userSpecifiedStyle } = inputProps;

    const compositLensStyle = objectAssign(
        { backgroundColor: 'rgba(0,0,0,.4)' },
        userSpecifiedStyle
    );

    const props = objectAssign(
        {},
        inputProps,
        { style: compositLensStyle }
    );

    return (
        <div>
            <LensTop { ...props} />
            <LensLeft { ...props} />
            <LensRight { ...props} />
            <LensBottom { ...props} />
        </div>
    );
}

NegativeSpaceLens.propTypes = LensPropTypes;
