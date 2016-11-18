import React, { PropTypes } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import ReactTouchPosition from './ReactTouchPosition';
import LensTop from './LensTop';
import LensLeft from './LensLeft';
import LensRight from './LensRight';
import LensBottom from './LensBottom';
import EnlargedImage from './EnlargedImage';

const ReactImageMagnify = ({
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

ReactImageMagnify.propTypes = {
    className: PropTypes.string,
    enlargedImageContainerStyle: PropTypes.object,
    enlargedImageStyle: PropTypes.object,
    isActivatedOnTouch: PropTypes.bool,
    imageStyle: PropTypes.object,
    largeImage: ImageShape,
    pressDuration: PropTypes.number,
    pressMoveThreshold: PropTypes.number,
    smallImage: ImageShape,
    style: PropTypes.object
};

ReactImageMagnify.defaultProps = {
    isActivatedOnTouch: false,
    pressDuration: 100,
    pressMoveThreshold: 5
};

export default ReactImageMagnify;
