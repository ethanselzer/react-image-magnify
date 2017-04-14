import React, { PropTypes } from 'react';
import ReactTouchPosition from 'react-touch-position';
import requiredIf from 'react-required-if';

import EnlargedImage from './EnlargedImage';
import ImageShape from './ImageShape';

class ReactImageMagnifyTouch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            smallImageWidth: 0,
            smallImageHeight: 0
        }

        this.onSmallImageLoad = this.onSmallImageLoad.bind(this);
        this.setSmallImageDimensionState = this.setSmallImageDimensionState.bind(this);
    }

    static propTypes = {
        className: PropTypes.string,
        enlargedImageContainerClassName: PropTypes.string,
        enlargedImageContainerStyle: PropTypes.object,
        enlargedImageClassName: PropTypes.string,
        enlargedImageStyle: PropTypes.object,
        fadeDurationInMs: PropTypes.number,
        isActivatedOnTouch: PropTypes.bool,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        largeImage: ImageShape,
        pressDuration: PropTypes.number,
        pressMoveThreshold: PropTypes.number,
        smallImage: PropTypes.shape({
            alt: PropTypes.string,
            isFluidWidth: PropTypes.bool,
            src: PropTypes.string.isRequired,
            srcSet: PropTypes.string,
            sizes: PropTypes.string,
            width: requiredIf(PropTypes.number, props => !props.isFluidWidth),
            height: requiredIf(PropTypes.number, props => !props.isFluidWidth)
        }),
        style: PropTypes.object,
        enlargedImagePosition: PropTypes.oneOf(['beside', 'over'])
    };

    static defaultProps = {
        fadeDurationInMs: 500,
        enlargedImagePosition: 'over'
    };

    onSmallImageLoad() {
        if (!this.props.smallImage.isFluidWidth) {
            return;
        }

        this.setSmallImageDimensionState();
    }

    setSmallImageDimensionState() {
        const {
            offsetWidth: smallImageWidth,
            offsetHeight: smallImageHeight
        } = this.smallImageEl;

        this.setState({
            smallImageWidth,
            smallImageHeight
        });
    }

    componentDidMount() {
        if (this.props.smallImage.isFluidWidth) {
            this.setSmallImageDimensionState();
            window.addEventListener('resize', this.setSmallImageDimensionState);
        }
    }

    componentWillUnmount() {
        if (this.props.smallImage.isFluidWidth) {
            window.removeEventListener('resize', this.setSmallImageDimensionState);
        }
    }

    render() {
        const {
            className,
            enlargedImageContainerClassName,
            enlargedImageContainerStyle,
            enlargedImageClassName,
            enlargedImageStyle,
            fadeDurationInMs,
            isActivatedOnTouch,
            imageClassName,
            imageStyle,
            largeImage,
            pressDuration,
            pressMoveThreshold,
            smallImage: {
                isFluidWidth: isSmallImageFluidWidth
            },
            style,
            enlargedImagePosition
        } = this.props;

        const fluidWidthSmallImage = Object.assign(
            {},
            this.props.smallImage,
            {
                width: this.state.smallImageWidth,
                height: this.state.smallImageHeight
            }
        );
        const fixedWidthSmallImage = this.props.smallImage;
        const smallImage = isSmallImageFluidWidth
            ? fluidWidthSmallImage
            : fixedWidthSmallImage

        const cursorOffset = {
            x: Math.round(((smallImage.width / largeImage.width) * smallImage.width) / 2),
            y: Math.round(((smallImage.height / largeImage.height) * smallImage.height) / 2)
        };

        const fluidWidthContainerStyle = {
            width: 'auto',
            height: 'auto',
            fontSize: '0px',
            position: 'relative'
        }
        const fixedWidthContainerStyle = {
            width: `${smallImage.width}px`,
            height: `${smallImage.height}px`,
            position: 'relative'
        };
        const priorityContainerStyle = isSmallImageFluidWidth
            ? fluidWidthContainerStyle
            : fixedWidthContainerStyle;
        const compositContainerStyle = Object.assign(
            {},
            style,
            priorityContainerStyle
        );

        const fluidWidthSmallImageStyle = {
            width: '100%',
            height: 'auto',
            display: 'block',
            pointerEvents: 'none'
        };
        const fixedWidthSmallImageStyle = {
            width: `${smallImage.width}px`,
            height: `${smallImage.height}px`,
            pointerEvents: 'none'
        };
        const prioritySmallImageStyle = isSmallImageFluidWidth
            ? fluidWidthSmallImageStyle
            : fixedWidthSmallImageStyle;
        const compositSmallImageStyle = Object.assign(
            {},
            imageStyle,
            prioritySmallImageStyle
        );

        return (
            <ReactTouchPosition { ...{
                className,
                isActivatedOnTouch,
                mapChildProps: ({ isActive, isPositionOutside, touchPosition }) => ({
                    isHovering: isActive,
                    isTouchOutside: isPositionOutside,
                    cursorPosition: touchPosition
                }),
                pressDuration,
                pressMoveThreshold,
                style: compositContainerStyle
            }}>
                <img { ...{
                    src: smallImage.src,
                    alt: smallImage.alt,
                    className: imageClassName,
                    onLoad: this.onSmallImageLoad,
                    ref: (el) => this.smallImageEl = el,
                    style: compositSmallImageStyle,
                    srcSet: smallImage.srcSet,
                    sizes: smallImage.sizes
                }} />
                <EnlargedImage { ...{
                    containerClassName: enlargedImageContainerClassName,
                    containerStyle: enlargedImageContainerStyle,
                    cursorOffset,
                    fadeDurationInMs,
                    imageClassName: enlargedImageClassName,
                    imageStyle: Object.assign({},
                        enlargedImageStyle,
                        { pointerEvents: 'none' }
                    ),
                    isRenderOnDemand: false,
                    largeImage,
                    smallImage,
                    imagePosition: enlargedImagePosition
                }} />
            </ReactTouchPosition>
        );
    }
}

export default ReactImageMagnifyTouch;
