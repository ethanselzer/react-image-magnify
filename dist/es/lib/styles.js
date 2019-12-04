import objectAssign from 'object-assign';
import isEqual from 'fast-deep-equal';

export function getContainerStyle(smallImage, userSpecifiedStyle) {
    var isSmallImageFluidWidth = smallImage.isFluidWidth,
        width = smallImage.width,
        height = smallImage.height;


    var fluidWidthContainerStyle = {
        width: 'auto',
        height: 'auto',
        fontSize: '0px',
        position: 'relative'
    };

    var fixedWidthContainerStyle = {
        width: width + 'px',
        height: height + 'px',
        position: 'relative'
    };

    var priorityContainerStyle = isSmallImageFluidWidth ? fluidWidthContainerStyle : fixedWidthContainerStyle;

    var compositContainerStyle = objectAssign({ cursor: 'crosshair' }, userSpecifiedStyle, priorityContainerStyle);

    return compositContainerStyle;
}

export function getSmallImageStyle(smallImage, style) {
    var isSmallImageFluidWidth = smallImage.isFluidWidth,
        width = smallImage.width,
        height = smallImage.height;


    var fluidWidthSmallImageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
        pointerEvents: 'none'
    };

    var fixedWidthSmallImageStyle = {
        width: width + 'px',
        height: height + 'px',
        pointerEvents: 'none'
    };

    var prioritySmallImageStyle = isSmallImageFluidWidth ? fluidWidthSmallImageStyle : fixedWidthSmallImageStyle;

    var compositSmallImageStyle = objectAssign({}, style, prioritySmallImageStyle);

    return compositSmallImageStyle;
}

function getPrimaryEnlargedImageContainerStyle(isInPlaceMode, isPortalRendered) {
    var baseContainerStyle = {
        overflow: 'hidden'
    };

    if (isPortalRendered) {
        return baseContainerStyle;
    }

    var sharedPositionStyle = {
        position: 'absolute',
        top: '0px'
    };

    if (isInPlaceMode) {
        return objectAssign(baseContainerStyle, sharedPositionStyle, { left: '0px' });
    }

    return objectAssign(baseContainerStyle, sharedPositionStyle, {
        left: '100%',
        marginLeft: '10px',
        border: '1px solid #d6d6d6'
    });
}

function getPriorityEnlargedImageContainerStyle(params) {
    var containerDimensions = params.containerDimensions,
        fadeDurationInMs = params.fadeDurationInMs,
        isTransitionActive = params.isTransitionActive;


    return {
        width: containerDimensions.width,
        height: containerDimensions.height,
        opacity: isTransitionActive ? 1 : 0,
        transition: 'opacity ' + fadeDurationInMs + 'ms ease-in',
        pointerEvents: 'none'
    };
}

var enlargedImageContainerStyleCache = {};

export function getEnlargedImageContainerStyle(params) {
    var cache = enlargedImageContainerStyleCache;
    var _cache$params = cache.params,
        memoizedParams = _cache$params === undefined ? {} : _cache$params,
        memoizedStyle = cache.compositStyle;


    if (isEqual(memoizedParams, params)) {
        return memoizedStyle;
    }

    var containerDimensions = params.containerDimensions,
        userSpecifiedStyle = params.containerStyle,
        fadeDurationInMs = params.fadeDurationInMs,
        isTransitionActive = params.isTransitionActive,
        isInPlaceMode = params.isInPlaceMode,
        isPortalRendered = params.isPortalRendered;


    var primaryStyle = getPrimaryEnlargedImageContainerStyle(isInPlaceMode, isPortalRendered);
    var priorityStyle = getPriorityEnlargedImageContainerStyle({
        containerDimensions: containerDimensions,
        fadeDurationInMs: fadeDurationInMs,
        isTransitionActive: isTransitionActive
    });

    cache.compositStyle = objectAssign({}, primaryStyle, userSpecifiedStyle, priorityStyle);
    cache.params = params;

    return cache.compositStyle;
}

export function getEnlargedImageStyle(params) {
    var imageCoordinates = params.imageCoordinates,
        userSpecifiedStyle = params.imageStyle,
        largeImage = params.largeImage;


    var translate = 'translate(' + imageCoordinates.x + 'px, ' + imageCoordinates.y + 'px)';

    var priorityStyle = {
        width: largeImage.width,
        height: largeImage.height,
        transform: translate,
        WebkitTransform: translate,
        msTransform: translate,
        pointerEvents: 'none'
    };

    var compositeImageStyle = objectAssign({}, userSpecifiedStyle, priorityStyle);

    return compositeImageStyle;
}