export function isPercentageFormat(val: string | number): boolean {
    return (
        typeof val === 'string'
        && /^\d+%$/.test(val)
    );
}

export function convertPercentageToDecimal(percentage: string | number, denominator: string | number = 100): number {
    const denom = typeof denominator === 'string' ? parseInt(denominator, 10) : denominator;

    return (typeof percentage === 'string' ? parseInt(percentage, 10) : percentage) / denom;
}

export function getEnlargedImageContainerDimension(
    containerDimension: string | number,
    smallImageDimension: string | number,
    scale: number | undefined,
    isInPlaceMode: boolean | undefined,
): string | number {
    if (isInPlaceMode) {
        return smallImageDimension;
    }

    if (scale) {
        if (scale <= 0 && process?.env?.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(`[ReactImageMagnify]
                Warning! "scale" cannot be 0 or less (found ${scale}). Defaulting to 0.5.
            `);

            // eslint-disable-next-line no-param-reassign
            scale = 0.5;
        }

        return (isPercentageFormat(smallImageDimension)
            ? convertPercentageToDecimal(smallImageDimension)
            : smallImageDimension as number)
            * scale;
    }

    if (isPercentageFormat(containerDimension)) {
        return isPercentageFormat(smallImageDimension)
            ? convertPercentageToDecimal(smallImageDimension, containerDimension)
            : smallImageDimension as number * convertPercentageToDecimal(containerDimension);
    }

    return containerDimension as number;
}
