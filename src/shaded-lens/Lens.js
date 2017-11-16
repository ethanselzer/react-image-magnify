import React from 'react';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';

const Lens = (props) => {
    const {
        fadeDurationInMs,
        isActive,
        isPositionOutside,
        style,
        translateX,
        translateY
    } = props;
    const translate = `translate(${translateX}px, ${translateY}px)`;
    const computedStyle = {
        position: 'absolute',
        transform: translate,
        WebkitTransform: translate,
        msTransform: translate,
        opacity: (isActive && !isPositionOutside) ? 1 : 0,
        transition: `opacity ${fadeDurationInMs}ms ease-in`
    };
    const defaultStyle = {
        width: 'auto',
        height: 'auto',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
        display: 'block'
    };

    return <div style={ objectAssign({}, defaultStyle, style, computedStyle) }/>;
}

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
