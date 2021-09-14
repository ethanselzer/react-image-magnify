import { CSSProperties } from 'react';

import type {
    ContainerDimensions,
    FluidImageProps,
    MagnifiedImageProps,
    Point,
    StaticImageProps,
} from 'src/types';
import { isFluid } from 'src/utils';

export function getContainerStyle(
    smallImage: FluidImageProps | StaticImageProps,
    style: CSSProperties | undefined,
    lockedByHintInteraction: boolean,
): CSSProperties {
    const {
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

    const priorityContainerStyle = isFluid(smallImage)
        ? fluidWidthContainerStyle
        : fixedWidthContainerStyle;

    const compositContainerStyle = {
        cursor: lockedByHintInteraction ? 'default' : 'crosshair',
        ...style,
        ...priorityContainerStyle,
    };

    return compositContainerStyle as CSSProperties;
}

export function getSmallImageStyle(
    smallImage: FluidImageProps | StaticImageProps,
    style: CSSProperties | undefined,
): CSSProperties {
    const {
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

    const prioritySmallImageStyle = isFluid(smallImage)
        ? fluidWidthSmallImageStyle
        : fixedWidthSmallImageStyle;

    const compositSmallImageStyle = {
        ...style,
        ...prioritySmallImageStyle,
    };

    return compositSmallImageStyle as CSSProperties;
}

function getPrimaryMagnifyContainerStyle(
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

export function getTransitionActiveStyle(isTransitionActive: boolean): CSSProperties {
    return {
        opacity: isTransitionActive ? 1 : 0,
    };
}

export function getMagnifyContainerStyle(
    containerDimensions: ContainerDimensions,
    style: CSSProperties | undefined,
    fadeDurationInMs: number,
    isInPlaceMode: boolean | undefined,
    isPortalRendered?: boolean,
): CSSProperties {
    const primaryStyle = getPrimaryMagnifyContainerStyle(isInPlaceMode, !!isPortalRendered);
    const priorityStyle: CSSProperties = {
        width: containerDimensions.width,
        height: containerDimensions.height,
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
        pointerEvents: 'none',
    };

    return {
        ...primaryStyle,
        ...style,
        ...priorityStyle,
    };
}

export function getMagnifiedImageTranslationStyle(imageCoordinates: Point): CSSProperties {
    const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

    return {
        transform: translate,
        WebkitTransform: translate,
        msTransform: translate,
    };
}

export function getMagnifiedImageStyle(
    magnifiedImage: MagnifiedImageProps,
): CSSProperties {
    const priorityStyle = {
        width: magnifiedImage.width,
        height: magnifiedImage.height,
        pointerEvents: 'none',
    };

    const compositeImageStyle = {
        ...magnifiedImage.style,
        ...priorityStyle,
    };

    return compositeImageStyle as CSSProperties;
}
