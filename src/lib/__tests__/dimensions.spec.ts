import {
    convertPercentageToDecimal,
    getEnlargedImageContainerDimension,
    isPercentageFormat,
} from 'src/lib/dimensions';

describe('Dimensions Library', () => {
    describe('isPercentageFormat', () => {
        it('returns true when input is formatted as a percentage', () => {
            const actual = isPercentageFormat('100%');

            expect(actual).toBe(true);
        });

        it('returns false when input is not formatted as a percentage', () => {
            expect(isPercentageFormat('100')).toBe(false);
            expect(isPercentageFormat(100)).toBe(false);
        });
    });

    describe('convertPercentageToDecimal', () => {
        it('returns a decimal number for percentage input', () => {
            expect(convertPercentageToDecimal('75%')).toEqual(0.75);
        });
    });

    describe('getEnlargedImageContainerDimension', () => {
        it('returns correct value when container dimension is a percentage', () => {
            const actual = getEnlargedImageContainerDimension('50%', 2);

            expect(actual).toEqual(1);
        });

        it('returns correct value when container dimension is a number', () => {
            const actual = getEnlargedImageContainerDimension(4, 2);

            expect(actual).toEqual(4);
        });

        it('ignores containerDimension value when isInPlaceMode is set', () => {
            const actual = getEnlargedImageContainerDimension(4, 2, true);

            expect(actual).toEqual(2);
        });

        it('honors user specified dimension when isInPlaceMode is not set', () => {
            const actual = getEnlargedImageContainerDimension(4, 2, false);

            expect(actual).toEqual(4);
        });
    });
});
