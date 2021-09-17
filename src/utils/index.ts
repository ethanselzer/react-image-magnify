import {
    CSSProperties, Dispatch, MutableRefObject, SetStateAction,
} from 'react';
import type {
    ContainerDimensions, ImageProps,
} from 'src/types';

const fluidCheckRegexp = new RegExp(/(%|vh|vw|vmin|vmax|fit-content|max-content|min-content|auto|stretch|available)$/gi);

export function noop(): void {
    // noop
}

export function isIntristic(smallImage: ImageProps): boolean {
    return typeof smallImage.height !== 'number'
        && typeof smallImage.width !== 'number';
}

export function isFluid(smallImage: ImageProps): boolean {
    return (
        smallImage.height === undefined || smallImage.width === undefined
    ) || (
        isIntristic(smallImage)
        && (
            smallImage.height !== undefined
            && fluidCheckRegexp.test(smallImage.height as string)
        )
        && (
            smallImage.width !== undefined
            && fluidCheckRegexp.test(smallImage.width as string)
        )
    );
}

export function styleToCssText(style: CSSProperties): string {
    return Object.entries(style).map(([k, v]) => `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${v}`).join(';');
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function imageToStrictDimensions(
    imageProps: ImageProps,
    ref?: MutableRefObject<HTMLImageElement | null> | null,
): ContainerDimensions {
    if (typeof imageProps.height === 'number' && typeof imageProps.width === 'number') {
        return {
            height: imageProps.height,
            width: imageProps.width,
        };
    }

    if (!ref?.current) {
        return {
            height: 0,
            width: 0,
        };
    }

    return {
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
    };
}

export function resolveSmallImage(
    smallImageProp: ImageProps,
    smallImageHeight?: number,
    smallImageWidth?: number,
): ImageProps {
    const smallImage = {
        ...smallImageProp,
        height: smallImageHeight || smallImageProp.height || 0,
        width: smallImageWidth || smallImageProp.width || 0,
    };

    if (!smallImage.onLoad) {
        smallImage.onLoad = noop;
    }

    return smallImage;
}

export function setSmallImageDimensionState(
    img: HTMLImageElement | null,
    setSmallImage: Dispatch<SetStateAction<ImageProps>>,
    smallImageProp: ImageProps,
): void {
    if (img && isIntristic(smallImageProp)) {
        const {
            naturalHeight, naturalWidth, offsetHeight, offsetWidth,
        } = img;
        const newSmallImage = resolveSmallImage(
            smallImageProp,
            offsetHeight || naturalHeight,
            offsetWidth || naturalWidth,
        );

        setSmallImage(newSmallImage);
    }
}
