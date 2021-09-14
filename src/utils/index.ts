import { CSSProperties } from 'react';
import type { FluidImageProps, ImageProps, StaticImageProps } from 'src/types';

const fluidCheckRegexp = new RegExp(/(%|vh|vw|vmin|vmax|fit-content|max-content|min-content|auto|stretch|available)$/gi);

export function noop(): void {
    // noop
}

export function isIntristic(smallImage: ImageProps): boolean {
    return typeof (smallImage as StaticImageProps).height !== 'number'
        && typeof (smallImage as StaticImageProps).width !== 'number';
}

export function isFluid(smallImage: ImageProps): boolean {
    return (
        isIntristic(smallImage)
        && (
            (smallImage as FluidImageProps).height !== undefined
            && fluidCheckRegexp.test((smallImage as FluidImageProps).height as string)
        )
        && (
            (smallImage as FluidImageProps).width !== undefined
            && fluidCheckRegexp.test((smallImage as FluidImageProps).width as string)
        )
    );
}

export function styleToCssText(style: CSSProperties): string {
    return Object.entries(style).map(([k, v]) => `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${v}`).join(';');
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
