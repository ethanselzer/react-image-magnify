import React from 'react';
import PropTypes from 'prop-types';

import {
    getLensModeEnlargedImageCoordinates,
    getInPlaceEnlargedImageCoordinates
} from './lib/imageCoordinates';
import { LargeImageShape } from './prop-types/Image';
import { ContainerDimensions } from './prop-types/EnlargedImage';
import { noop } from './utils';
import Point from './prop-types/Point';
import {
    getEnlargedImageContainerStyle,
    getEnlargedImageStyle
} from './lib/styles';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false,
            lockedPosition: null
        };

        this.timers = [];
    }

    static displayName = 'EnlargedImage';

    static defaultProps = {
        fadeDurationInMs: 0,
        isLazyLoaded: true
    };

    static propTypes = {
        containerClassName: PropTypes.string,
        containerStyle: PropTypes.object,
        cursorOffset: Point,
        position: Point,
        fadeDurationInMs: PropTypes.number,
        imageClassName: PropTypes.string,
        imageStyle: PropTypes.object,
        isActive: PropTypes.bool,
        isLazyLoaded: PropTypes.bool,
        largeImage: LargeImageShape,
        containerDimensions: ContainerDimensions,
        isPortalRendered: PropTypes.bool,
        isInPlaceMode: PropTypes.bool
    };

    componentWillReceiveProps(nextProps) {
        this.scheduleCssTransition(nextProps);
    }

    componentWillUnmount() {
        this.timers.forEach((timerId) => {
            clearTimeout(timerId);
        });
    }

    scheduleCssTransition(nextProps) {
        const {
            fadeDurationInMs,
            isActive,
            isPositionOutside,
            isLocked
        } = this.props;
        // eslint-disable-next-line no-console
        //console.log(isActive);
        const willIsActiveChange = isActive !== nextProps.isActive;
        const willIsPositionOutsideChange = isPositionOutside !== nextProps.isPositionOutside;

        if ((!willIsActiveChange && !willIsPositionOutsideChange) || isLocked) {
            return;
        }

        if (nextProps.isActive && !nextProps.isPositionOutside) {
            this.setState({
                isTrainsitionDone: false,
                isTransitionEntering: true
            });

            this.timers.push(setTimeout(() => {
                this.setState({
                    isTransitionEntering: false,
                    isTransitionActive: true
                });
            }, 0));
        } else {
            this.setState({
                isTransitionLeaving: true,
                isTransitionActive: false
            });

            this.timers.push(setTimeout(() => {
                this.setState({
                    isTransitionDone: true,
                    isTransitionLeaving: false
                });
            }, fadeDurationInMs));
        }
    }

    getImageCoordinates() {
        const {
            cursorOffset,
            largeImage,
            containerDimensions,
            position,
            smallImage,
            isInPlaceMode
        } = this.props;

        if (isInPlaceMode) {
            return getInPlaceEnlargedImageCoordinates({
                containerDimensions,
                largeImage,
                position
            });
        }

        return getLensModeEnlargedImageCoordinates({
            containerDimensions,
            cursorOffset,
            largeImage,
            position,
            smallImage
        });
    }

    get isVisible() {
        const {
            isTransitionEntering,
            isTransitionActive,
            isTransitionLeaving
        } = this.state;

        return (
            isTransitionEntering ||
            isTransitionActive ||
            isTransitionLeaving
        );
    }

    get containerStyle() {
        const {
            containerStyle,
            containerDimensions,
            fadeDurationInMs,
            isPortalRendered,
            isInPlaceMode
        } = this.props;

        const { isTransitionActive } = this.state;

        return getEnlargedImageContainerStyle({
            containerDimensions,
            containerStyle,
            fadeDurationInMs,
            isTransitionActive,
            isInPlaceMode,
            isPortalRendered
        });
    }

    get imageStyle() {
        const {
            imageStyle,
            largeImage,
            isLocked
        } = this.props;

        // The following block controls locking behavior for image coordinates
        let coords;
        if (isLocked && this.state.lockedPosition === null) {
            coords = this.getImageCoordinates();
            this.setState({
                lockedPosition: coords
            });
        } else if (!isLocked && this.state.lockedPosition !== null) {
            coords = this.getImageCoordinates();
            this.setState({
                lockedPosition: null
            });
        } else if (isLocked && this.state.lockedPosition !== null) {
            coords = this.state.lockedPosition;
        } else {
            coords = this.getImageCoordinates();
        }

        return getEnlargedImageStyle({
            imageCoordinates: coords,
            imageStyle,
            largeImage
        });
    }

    render() {
        const {
            containerClassName,
            imageClassName,
            isLazyLoaded,
            largeImage,
            largeImage: {
                alt = '',
                onLoad = noop,
                onError = noop
            },
        } = this.props;

        const component = (
            <div { ...{
                className: containerClassName,
                style: this.containerStyle
            }}>
                <img { ...{
                    alt,
                    className: imageClassName,
                    src: largeImage.src,
                    srcSet: largeImage.srcSet,
                    sizes: largeImage.sizes,
                    style: this.imageStyle,
                    onLoad,
                    onError
                }}/>
            </div>
        );

        if (isLazyLoaded) {
            return this.isVisible ? component : null;
        }

        return component;
    }
}
