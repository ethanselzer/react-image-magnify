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
    enlargedImageContainerStyle,
    enlargedImageClassName,
    enlargedImageStyle,
    fadeDurationInMs,
    hoverDelayInMs,
    hoverOffDelayInMs,
    imageClassName,
    imageStyle,
    largeImage,
    lensStyle,
    smallImage,
    style
}) => {

    const cursorOffset = {
        x: Math.round(((smallImage.width / largeImage.width) * smallImage.width) / 2),
        y: Math.round(((smallImage.height / largeImage.height) * smallImage.height) / 2)
    };
    const defaultLensStyle = { backgroundColor: 'rgba(0,0,0,.4)' };
    const compositLensStyle = Object.assign({}, defaultLensStyle, lensStyle);

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
                    srcSet: smallImage.srcSet,
                    alt: smallImage.alt,
                    className: imageClassName,
                    style: Object.assign({
                        width: `${smallImage.width}px`,
                        height: `${smallImage.height}px`
                    }, imageStyle)
                }} />
                <LensTop { ...{
                    cursorOffset,
                    fadeDurationInMs,
                    smallImage,
                    style: compositLensStyle
                }} />
                <LensLeft { ...{
                    cursorOffset,
                    fadeDurationInMs,
                    smallImage,
                    style: compositLensStyle
                }} />
                <LensRight { ...{
                    cursorOffset,
                    fadeDurationInMs,
                    smallImage,
                    style: compositLensStyle
                }} />
                <LensBottom { ...{
                    cursorOffset,
                    fadeDurationInMs,
                    smallImage,
                    style: compositLensStyle,
                }} />
                <EnlargedImage { ...{
                    containerStyle: enlargedImageContainerStyle,
                    cursorOffset,
                    fadeDurationInMs,
                    imageClassName: enlargedImageClassName,
                    imageStyle: enlargedImageStyle,
                    largeImage,
                    smallImage,
                }}/>
            </ReactHoverObserver>
        </ReactCursorPosition>
    );
}

export const ImageShape = PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
});

ReactImageMagnify.propTypes = {
    className: PropTypes.string,
    enlargedImageContainerStyle: PropTypes.object,
    enlargedImageClassName: PropTypes.string,
    enlargedImageStyle: PropTypes.object,
    fadeDurationInMs: PropTypes.number,
    hoverDelayInMs: PropTypes.number,
    hoverOffDelayInMs: PropTypes.number,
    imageClassName: PropTypes.string,
    imageStyle: PropTypes.object,
    largeImage: ImageShape,
    lensStyle: PropTypes.object,
    smallImage: ImageShape,
    style: PropTypes.object
};

ReactImageMagnify.defaultProps = {
    fadeDurationInMs: 300,
    hoverDelayInMs: 250,
    hoverOffDelayInMs: 150
};

export default ReactImageMagnify;
