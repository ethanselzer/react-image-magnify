import {
    CSSProperties, Dispatch, MutableRefObject, SetStateAction,
} from 'react';
import type {
    ContainerDimensions, ImageProps,
} from 'src/types';

// eslint-disable-next-line prefer-regex-literals
const fluidCheckRegexp = new RegExp(/(%|vh|vw|vmin|vmax|fit-content|max-content|min-content|auto|stretch|available)$/, 'gi');

export function noop(): void {
    // noop
}

export function isFluidDimension(value: string | number | undefined): boolean {
    let result = typeof value !== 'number';

    result = result && value !== undefined && fluidCheckRegexp.test(value as string);

    fluidCheckRegexp.lastIndex = 0;

    return result;
}

export function isFluid(smallImage: ImageProps): boolean {
    const result = isFluidDimension(smallImage.height) && isFluidDimension(smallImage.width);

    return (smallImage.height === undefined || smallImage.width === undefined) || result;
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
    smallImageHeight?: number | string,
    smallImageWidth?: number | string,
): ImageProps {
    const smallImage = {
        ...smallImageProp,
        height: smallImageHeight || smallImageProp.height || '100%',
        width: smallImageWidth || smallImageProp.width || '100%',
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
    if (img) {
        const {
            naturalHeight, naturalWidth, offsetHeight, offsetWidth,
        } = img;
        const newSmallImage = resolveSmallImage(
            smallImageProp,
            isFluidDimension(smallImageProp.height) ? smallImageProp.height : offsetHeight || naturalHeight,
            isFluidDimension(smallImageProp.width) ? smallImageProp.width : offsetWidth || naturalWidth,
        );

        setSmallImage(newSmallImage);
    }
}
