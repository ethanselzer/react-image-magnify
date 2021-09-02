import isEqual from 'fast-deep-equal';
import { CSSProperties } from 'react';

import type {
    ContainerDimensions,
    FluidSmallImageShape,
    Point,
    StaticSmallImageShape,
} from 'src/types';

type PriorityEnlargedImageContainerStyleParams = {
    containerDimensions: ContainerDimensions,
    fadeDurationInMs: number,
    isTransitionActive?: boolean,
};

type EnlargedImageContainerStyleParams = {
    containerDimensions: ContainerDimensions,
    containerStyle: CSSProperties,
    fadeDurationInMs: number,
    isTransitionActive?: boolean,
    isInPlaceMode?: boolean,
    isPortalRendered?: boolean,
};

type EnlargedImageStyleParams = {
    imageCoordinates: Point,
    imageStyle: CSSProperties,
    largeImage: ContainerDimensions,
};

type EnlargedImageContainerStyleCache = {
    compositStyle: CSSProperties,
    params: EnlargedImageContainerStyleParams,
};

export function getContainerStyle(
    smallImage: FluidSmallImageShape | StaticSmallImageShape,
    userSpecifiedStyle?: CSSProperties,
): CSSProperties {
    const {
        isFluidWidth: isSmallImageFluidWidth,
        width,
        height,
    } = smallImage;

    const fluidWidthContainerStyle = {
        width: 'auto',
        height: 'auto',
        fontSize: '0px',
        position: 'relative',
    };

    const fixedWidthContainerStyle = {
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
    };

    const priorityContainerStyle = isSmallImageFluidWidth
        ? fluidWidthContainerStyle
        : fixedWidthContainerStyle;

    const compositContainerStyle = {
        cursor: 'crosshair',
        ...userSpecifiedStyle,
        ...priorityContainerStyle,
    };

    return compositContainerStyle as CSSProperties;
}

export function getSmallImageStyle(
    smallImage: FluidSmallImageShape | StaticSmallImageShape,
    style?: CSSProperties,
): CSSProperties {
    const {
        isFluidWidth: isSmallImageFluidWidth,
        width,
        height,
    } = smallImage;

    const fluidWidthSmallImageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
        pointerEvents: 'none',
    };

    const fixedWidthSmallImageStyle = {
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
    };

    const prioritySmallImageStyle = isSmallImageFluidWidth
        ? fluidWidthSmallImageStyle
        : fixedWidthSmallImageStyle;

    const compositSmallImageStyle = {
        ...style,
        ...prioritySmallImageStyle,
    };

    return compositSmallImageStyle as CSSProperties;
}

function getPrimaryEnlargedImageContainerStyle(
    isInPlaceMode: boolean | undefined,
    isPortalRendered: boolean,
): CSSProperties {
    const baseContainerStyle = {
        overflow: 'hidden',
    };

    if (isPortalRendered) {
        return baseContainerStyle;
    }

    const sharedPositionStyle = {
        position: 'absolute',
        top: '0px',
    };

    if (isInPlaceMode) {
        return {
            ...baseContainerStyle,
            ...sharedPositionStyle,
            left: '0px',
        } as CSSProperties;
    }

    return {
        ...baseContainerStyle,
        ...sharedPositionStyle,
        left: '100%',
        marginLeft: '10px',
        border: '1px solid #d6d6d6',
    } as CSSProperties;
}

function getPriorityEnlargedImageContainerStyle(params: PriorityEnlargedImageContainerStyleParams): CSSProperties {
    const {
        containerDimensions,
        fadeDurationInMs,
        isTransitionActive,
    } = params;

    return {
        width: containerDimensions.width,
        height: containerDimensions.height,
        opacity: isTransitionActive ? 1 : 0,
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
        pointerEvents: 'none',
    };
}

const enlargedImageContainerStyleCache = {} as EnlargedImageContainerStyleCache;

export function getEnlargedImageContainerStyle(params: EnlargedImageContainerStyleParams): CSSProperties {
    const cache = enlargedImageContainerStyleCache;
    const {
        params: memoizedParams = {},
        compositStyle: memoizedStyle,
    } = cache;

    if (isEqual(memoizedParams, params)) {
        return memoizedStyle;
    }

    const {
        containerDimensions,
        containerStyle: userSpecifiedStyle,
        fadeDurationInMs,
        isTransitionActive,
        isInPlaceMode,
        isPortalRendered,
    } = params;

    const primaryStyle = getPrimaryEnlargedImageContainerStyle(isInPlaceMode, !!isPortalRendered);
    const priorityStyle = getPriorityEnlargedImageContainerStyle({
        containerDimensions,
        fadeDurationInMs,
        isTransitionActive,
    });

    cache.compositStyle = {
        ...primaryStyle,
        ...userSpecifiedStyle,
        ...priorityStyle,
    };
    cache.params = params;

    return cache.compositStyle;
}

export function getEnlargedImageStyle(params: EnlargedImageStyleParams): CSSProperties {
    const {
        imageCoordinates,
        imageStyle: userSpecifiedStyle,
        largeImage,
    } = params;

    const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

    const priorityStyle = {
        width: largeImage.width,
        height: largeImage.height,
        transform: translate,
        WebkitTransform: translate,
        msTransform: translate,
        pointerEvents: 'none',
    };

    const compositeImageStyle = {
        ...userSpecifiedStyle,
        ...priorityStyle,
    };

    return compositeImageStyle as CSSProperties;
}
