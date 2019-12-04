import React from 'react';
import objectAssign from 'object-assign';

import LensTop from './LensTop';
import LensLeft from './LensLeft';
import LensRight from './LensRight';
import LensBottom from './LensBottom';

import LensPropTypes from '../../prop-types/Lens';

export default function NegativeSpaceLens(inputProps) {
    var userSpecifiedStyle = inputProps.style;


    var compositLensStyle = objectAssign({ backgroundColor: 'rgba(0,0,0,.4)' }, userSpecifiedStyle);

    var props = objectAssign({}, inputProps, { style: compositLensStyle });

    return React.createElement(
        'div',
        null,
        React.createElement(LensTop, props),
        React.createElement(LensLeft, props),
        React.createElement(LensRight, props),
        React.createElement(LensBottom, props)
    );
}

NegativeSpaceLens.propTypes = LensPropTypes;