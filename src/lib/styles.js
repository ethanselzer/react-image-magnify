import objectAssign from 'object-assign';
import isEqual from 'fast-deep-equal';
import { ENLARGED_IMAGE_POSITION } from '../constants';

export function getContainerStyle(smallImage, userSpecifiedStyle) {
    const {
        isFluidWidth: isSmallImageFluidWidth,
        width,
        height
    } = smallImage;

    const fluidWidthContainerStyle = {
        width: 'auto',
        height: 'auto',
        fontSize: '0px',
        position: 'relative'
    }

    const fixedWidthContainerStyle = {
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
    };

    const priorityContainerStyle = isSmallImageFluidWidth
        ? fluidWidthContainerStyle
        : fixedWidthContainerStyle;

    const compositContainerStyle = objectAssign(
        { cursor: 'crosshair' },
        userSpecifiedStyle,
        priorityContainerStyle
    );

    return compositContainerStyle;
}

export function getSmallImageStyle(smallImage, style) {
    const {
        isFluidWidth: isSmallImageFluidWidth,
        width,
        height
    } = smallImage;

    const fluidWidthSmallImageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
        pointerEvents: 'none'
    };

    const fixedWidthSmallImageStyle = {
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none'
    };

    const prioritySmallImageStyle = isSmallImageFluidWidth
        ? fluidWidthSmallImageStyle
        : fixedWidthSmallImageStyle;

    const compositSmallImageStyle = objectAssign(
        {},
        style,
        prioritySmallImageStyle
    );

    return compositSmallImageStyle;
}

function getDefaultEnlargedImageContainerStyle(placement) {
    const baseContainerStyle = {
        position: 'absolute',
        top: '0px',
        overflow: 'hidden'
    };

    const { over: OVER } = ENLARGED_IMAGE_POSITION;
    const isInPlaceMode = placement === OVER;

    if (isInPlaceMode) {
        return objectAssign(baseContainerStyle, {
            left: '0px'
        });
    }

    return objectAssign(baseContainerStyle, {
        left: '100%',
        marginLeft: '10px',
        border: '1px solid #d6d6d6',
    });
}

function getComputedEnlargedImageContainerStyle(params) {
    const {
        containerDimensions,
        fadeDurationInMs,
        isTransitionActive
    } = params;

    const computedContainerStyle = {
        width: containerDimensions.width,
        height: containerDimensions.height,
        opacity: isTransitionActive ? 1 : 0,
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
        pointerEvents: 'none'
    };

    return computedContainerStyle;
}

const enlargedImageContainerStyleCache = {};

export function getEnlargedImageContainerStyle(params) {
    const cache = enlargedImageContainerStyleCache;
    const {
        params: memoizedParams = {},
        compositStyle: memoizedStyle
    } = cache;

    if (isEqual(memoizedParams, params)) {
        return memoizedStyle;
    }

    const {
        containerDimensions,
        containerStyle: userSpecifiedContainerStyle,
        fadeDurationInMs,
        isTransitionActive,
        placement
    } = params;

    const defaultStyle = getDefaultEnlargedImageContainerStyle(placement);
    const computedContainerStyle = getComputedEnlargedImageContainerStyle({
        containerDimensions,
        fadeDurationInMs,
        isTransitionActive
    });

    cache.compositStyle = objectAssign(
        {},
        defaultStyle,
        userSpecifiedContainerStyle,
        computedContainerStyle
    );
    cache.params = params;

    return cache.compositStyle;
}

export function getEnlargedImageStyle(params) {
    const {
        imageCoordinates,
        imageStyle: userSpecifiedStyle,
        largeImage
    } = params;

    const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

    const computedImageStyle = {
        width: largeImage.width,
        height: largeImage.height,
        transform: translate,
        WebkitTransform: translate,
        msTransform: translate,
        pointerEvents: 'none'
    };

    const compositeImageStyle = objectAssign({}, userSpecifiedStyle, computedImageStyle);

    return compositeImageStyle;
}
