import React from 'react';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';

var Lens = function Lens(props) {
    var fadeDurationInMs = props.fadeDurationInMs,
        isActive = props.isActive,
        isPositionOutside = props.isPositionOutside,
        parentSpecifiedStyle = props.style;


    var defaultStyle = {
        width: 'auto',
        height: 'auto',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
        display: 'block'
    };

    var computedStyle = {
        position: 'absolute',
        opacity: isActive && !isPositionOutside ? 1 : 0,
        transition: 'opacity ' + fadeDurationInMs + 'ms ease-in'
    };

    var compositStyle = objectAssign({}, defaultStyle, parentSpecifiedStyle, computedStyle);

    return React.createElement('div', { style: compositStyle });
};

Lens.propTypes = {
    style: PropTypes.object,
    fadeDurationInMs: PropTypes.number,
    isActive: PropTypes.bool,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    userStyle: PropTypes.object
};

Lens.defaultProps = {
    isActive: false,
    fadeDurationInMs: 0,
    translateX: 0,
    translateY: 0
};

export default Lens;