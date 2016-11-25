import React, { PropTypes } from 'react';
import ReactTouchPosition from './ReactTouchPosition';
import EnlargedImage from './EnlargedImage';

const ReactImageMagnifyTouch = ({
    className,
    enlargedImageContainerStyle,
    enlargedImageStyle,
    fadeDurationInMs,
    isActivatedOnTouch,
    imageStyle,
    largeImage,
    pressDuration,
    pressMoveThreshold,
    smallImage,
    style
}) => {

    const cursorOffset = {
        x: Math.round(((smallImage.width / largeImage.width) * smallImage.width) / 2),
        y: Math.round(((smallImage.height / largeImage.height) * smallImage.height) / 2)
    };

    return (
        <ReactTouchPosition { ...{
            className,
            isActivatedOnTouch,
            mapPropNames: ({ isActive, isTouchOutside, touchPosition }) => ({
                isHovering: isActive,
                isTouchOutside,
                cursorPosition: touchPosition
            }),
            pressDuration,
            pressMoveThreshold,
            style: Object.assign({
                width: `${smallImage.width}px`,
                height: `${smallImage.height}px`,
                position: 'relative'
            }, style)
        }}>
            <img { ...{
                src: smallImage.src,
                alt: smallImage.alt,
                style: Object.assign({
                    width: `${smallImage.width}px`,
                    height: `${smallImage.height}px`,
                    pointerEvents: 'none'
                }, imageStyle)
            }} />
            <EnlargedImage { ...{
                containerStyle: enlargedImageContainerStyle,
                cursorOffset,
                fadeDurationInMs,
                imageStyle: Object.assign({},
                    enlargedImageStyle,
                    { pointerEvents: 'none' }
                ),
                isRenderOnDemand: false,
                largeImage,
                smallImage,
            }}/>
        </ReactTouchPosition>
    );
}

export const ImageShape = PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
});

ReactImageMagnifyTouch.propTypes = {
    className: PropTypes.string,
    enlargedImageContainerStyle: PropTypes.object,
    enlargedImageStyle: PropTypes.object,
    fadeDurationInMs: PropTypes.number,
    isActivatedOnTouch: PropTypes.bool,
    imageStyle: PropTypes.object,
    largeImage: ImageShape,
    pressDuration: PropTypes.number,
    pressMoveThreshold: PropTypes.number,
    smallImage: ImageShape,
    style: PropTypes.object
};

ReactImageMagnifyTouch.defaultProps = {
    fadeDurationInMs: 500
};

export default ReactImageMagnifyTouch;
