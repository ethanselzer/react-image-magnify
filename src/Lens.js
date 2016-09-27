import React, { PropTypes } from 'react';

const Lens = (props) => {
    const {
        fadeDurationInMs,
        isHovering,
        style,
        translateX,
        translateY
    } = props;
    const translate = `translate(${translateX}px, ${translateY}px)`;
    const defaultStyle = {
        position: 'absolute',
        transform: translate,
        WebkitTransform: translate,
        msTransform: translate,
        opacity: isHovering ? 1 : 0,
        transition: `opacity ${fadeDurationInMs}ms ease-in`
    };

    return <div style={ Object.assign({}, defaultStyle, style) }/>;
}

Lens.propTypes = {
    fadeDurationInMs: PropTypes.number,
    isHovering: PropTypes.bool,
    style: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string,
        top: PropTypes.string,
        right: PropTypes.string,
        bottom: PropTypes.string,
        left: PropTypes.string,
        display: PropTypes.string,
        backgroundColor: PropTypes.string,
        cursor: PropTypes.string,
    }),
    translateX: PropTypes.number,
    translateY: PropTypes.number
};

Lens.defaultProps = {
    isHovering: false,
    fadeDurationInMs: 0,
    style: {
        width: 'auto',
        height: 'auto',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
        display: 'block',
        backgroundColor: 'transparent',
        cursor: 'auto'
    },
    translateX: 0,
    translateY: 0
};

export default Lens;
