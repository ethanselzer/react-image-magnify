import React, { PropTypes } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import ReactHoverObserver from 'react-hover-observer';
import LensTop from './LensTop';
import LensLeft from './LensLeft';
import LensRight from './LensRight';
import LensBottom from './LensBottom';
import EnlargedImage from './EnlargedImage';

const ReactImageMagnify = ({
    className,
    fadeDurationInMs,
    hoverDelayInMs,
    hoverOffDelayInMs,
    largeImage,
    smallImage,
    style
}) => {

    const cursorOffset = {
        x: Math.round(((smallImage.width / largeImage.width) * smallImage.width) / 2),
        y: Math.round(((smallImage.height / largeImage.height) * smallImage.height) / 2)
    };

    return (
        <ReactCursorPosition { ...{
            className,
            style: Object.assign({
                width: `${smallImage.width}px`,
                height: `${smallImage.height}px`,
                cursor: 'crosshair',
                position: 'relative'
            }, style)
        }}>
            <ReactHoverObserver { ...{
                hoverDelayInMs,
                hoverOffDelayInMs,
                onMouseEnter: ({ setIsHovering }) => setIsHovering(),
                onMouseLeave: ({ unsetIsHovering }) => unsetIsHovering(),
                onMouseOver: ({ e, unsetIsHovering }) => {
                    if (e.target.getAttribute('data-hover') === 'false') {
                        unsetIsHovering();
                    }
                }
            }}>
                <img { ...{
                    src: smallImage.src,
                    alt: smallImage.alt,
                    style: {
                        width: `${smallImage.width}px`,
                        height: `${smallImage.height}px`
                    }
                }} />
                <LensTop { ...{
                    fadeDurationInMs,
                    smallImage,
                    cursorOffset
                }} />
                <LensLeft { ...{
                    fadeDurationInMs,
                    smallImage,
                    cursorOffset
                }} />
                <LensRight { ...{
                    fadeDurationInMs,
                    smallImage,
                    cursorOffset
                }} />
                <LensBottom { ...{
                    fadeDurationInMs,
                    smallImage,
                    cursorOffset
                }} />
                <EnlargedImage { ...{
                    fadeDurationInMs,
                    largeImage,
                    smallImage,
                    cursorOffset
                }}/>
            </ReactHoverObserver>
        </ReactCursorPosition>
    );
}

const Image = PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
});

ReactImageMagnify.propTypes = {
    fadeDurationInMs: PropTypes.number,
    className: PropTypes.string,
    hoverDelayInMs: PropTypes.number,
    hoverOffDelayInMs: PropTypes.number,
    largeImage: Image,
    smallImage: Image,
    style: PropTypes.object
};

ReactImageMagnify.defaultProps = {
    fadeDurationInMs: 300,
    hoverDelayInMs: 250,
    hoverOffDelayInMs: 150
};

export default ReactImageMagnify;
