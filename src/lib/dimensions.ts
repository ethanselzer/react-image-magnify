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
    isInPlaceMode?: boolean,
): string | number {
    if (isInPlaceMode) {
        return smallImageDimension;
    }

    if (isPercentageFormat(containerDimension)) {
        return isPercentageFormat(smallImageDimension)
            ? convertPercentageToDecimal(smallImageDimension, containerDimension)
            : smallImageDimension as number * convertPercentageToDecimal(containerDimension);
    }

    return containerDimension as number;
}
