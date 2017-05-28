import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Reactposition from 'react-cursor-position';
import ReactHoverObserver from 'react-hover-observer';

import LensTop from './LensTop';
import LensLeft from './LensLeft';
import LensRight from './LensRight';
import LensBottom from './LensBottom';
import EnlargedImage from './EnlargedImage';
import ImageShape from './ImageShape';

class ReactImageMagnify extends React.Component {

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
        hoverDelayInMs: PropTypes.number,
        hoverOffDelayInMs: PropTypes.number,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        largeImage: ImageShape,
        lensStyle: PropTypes.object,
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
        enlargedImagePosition: 'beside',
        fadeDurationInMs: 300,
        hoverDelayInMs: 250,
        hoverOffDelayInMs: 150
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
            hoverDelayInMs,
            hoverOffDelayInMs,
            smallImage: {
                isFluidWidth: isSmallImageFluidWidth
            },
            imageClassName,
            imageStyle,
            largeImage,
            lensStyle,
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
        
        let defaultLensStyle = {
            backgroundColor: 'rgba(0,0,0,.4)'
        };       
        if (enlargedImagePosition === 'over') {
            defaultLensStyle = {};
        }
        const compositLensStyle = Object.assign({}, defaultLensStyle, lensStyle);

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
            {
                cursor: 'crosshair',
            },
            style,
            priorityContainerStyle
        );

        const fluidWidthSmallImageStyle = {
            width: '100%',
            height: 'auto',
            display: 'block'
        };
        const fixedWidthSmallImageStyle = {
            width: `${smallImage.width}px`,
            height: `${smallImage.height}px`
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
            <Reactposition { ...{
                className,
                style: compositContainerStyle,
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
                        sizes: smallImage.sizes,
                        alt: smallImage.alt,
                        className: imageClassName,
                        style: compositSmallImageStyle,
                        ref: (el) => this.smallImageEl = el,
                        onLoad: this.onSmallImageLoad
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
                        containerClassName: enlargedImageContainerClassName,
                        containerStyle: enlargedImageContainerStyle,
                        cursorOffset,
                        fadeDurationInMs,
                        imageClassName: enlargedImageClassName,
                        imageStyle: enlargedImageStyle,
                        largeImage,
                        smallImage,
                        imagePosition: enlargedImagePosition
                    }}/>
                </ReactHoverObserver>
            </Reactposition>
        );
    }
}

export default ReactImageMagnify;
