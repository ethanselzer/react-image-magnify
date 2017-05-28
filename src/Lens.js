import React from 'react';
import PropTypes from 'prop-types';

const Lens = (props) => {
    const {
        fadeDurationInMs,
        isHovering,
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
        opacity: isHovering ? 1 : 0,
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

    return <div style={ Object.assign({}, defaultStyle, style, computedStyle) }/>;
}

Lens.propTypes = {
    style: PropTypes.object,
    fadeDurationInMs: PropTypes.number,
    isHovering: PropTypes.bool,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    userStyle: PropTypes.object
};

Lens.defaultProps = {
    isHovering: false,
    fadeDurationInMs: 0,
    translateX: 0,
    translateY: 0
};

export default Lens;
