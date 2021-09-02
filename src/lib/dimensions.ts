type EnlargedImageContainerDimensionPorps = {
    containerDimension: string | number,
    smallImageDimension: number,
    isInPlaceMode?: boolean,
};

export function isPercentageFormat(val: string | number): boolean {
    return (
        typeof val === 'string'
        && /^\d+%$/.test(val)
    );
}

export function convertPercentageToDecimal(percentage: string | number): number {
    return (typeof percentage === 'string' ? parseInt(percentage, 10) : percentage) / 100;
}

export function getEnlargedImageContainerDimension(params: EnlargedImageContainerDimensionPorps): number {
    const { containerDimension, smallImageDimension, isInPlaceMode } = params;

    if (isInPlaceMode) {
        return smallImageDimension;
    }

    if (isPercentageFormat(containerDimension)) {
        return smallImageDimension * convertPercentageToDecimal(containerDimension);
    }

    return containerDimension as number;
}
