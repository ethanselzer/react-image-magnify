import React, { PropTypes } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import ReactHoverObserver from 'react-hover-observer';
import LensTop from './ImageZoomLensTop';
import LensLeft from './ImageZoomLensLeft';
import LensRight from './ImageZoomLensRight';
import LensBottom from './ImageZoomLensBottom';
import Magnifier from './ImageZoomMagnifier';

const ImageZoom = ({
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
                    alt: smallImage.alt
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
                <Magnifier { ...{
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

ImageZoom.propTypes = {
    fadeDurationInMs: PropTypes.number,
    className: PropTypes.string,
    hoverDelayInMs: PropTypes.number,
    hoverOffDelayInMs: PropTypes.number,
    largeImage: Image,
    smallImage: Image,
    style: PropTypes.object
};

ImageZoom.defaultProps = {
    fadeDurationInMs: 300,
    hoverDelayInMs: 250,
    hoverOffDelayInMs: 150
};

export default ImageZoom;
