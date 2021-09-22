import { CSSProperties } from 'react';

import type {
    ContainerDimensions,
    MagnifiedImageProps,
    Point,
    ImageProps,
} from 'src/types';
import { isFluidDimension } from 'src/utils';

export function getContainerStyle(
    smallImage: ImageProps,
    style: CSSProperties | undefined,
    lockedByHintInteraction: boolean,
): CSSProperties {
    const {
        width,
        height,
    } = smallImage;

    return {
        cursor: lockedByHintInteraction ? 'default' : 'crosshair',
        position: 'relative',
        height: isFluidDimension(height) ? height : `${height}px`,
        width: isFluidDimension(width) ? width : `${width}px`,
        ...style,
    } as CSSProperties;
}

export function getSmallImageStyle(
    smallImage: ImageProps,
    style: CSSProperties | undefined,
): CSSProperties {
    const compositSmallImageStyle = {
        pointerEvents: 'none',
        height: '100%',
        width: '100%',
        ...style,
    };

    return compositSmallImageStyle as CSSProperties;
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
): CSSProperties {
    return {
        width: containerDimensions.width,
        height: containerDimensions.height,
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
        pointerEvents: 'none',
        ...style,
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
    return {
        width: magnifiedImage.width,
        height: magnifiedImage.height,
        pointerEvents: 'none',
        ...magnifiedImage.style,
    } as CSSProperties;
}
