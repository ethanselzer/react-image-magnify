import { expect } from 'chai';
import {
    convertPercentageToDecimal,
    getEnlargedImageContainerDimension,
    isPercentageFormat
} from '../../src/lib/dimensions';

describe('Dimensions Library', () => {
    describe('isPercentageFormat', () => {
        it('returns true when input is formatted as a percentage', () => {
            const actual = isPercentageFormat('100%');
            expect(actual).to.be.true;
        });

        it('returns false when input is not formatted as a percentage', () => {
            expect(isPercentageFormat('100')).to.be.false;
            expect(isPercentageFormat(100)).to.be.false;
        })
    });

    describe('convertPercentageToDecimal', () => {
        it('returns a decimal number for percentage input', () => {
            expect(convertPercentageToDecimal('75%')).to.equal(0.75);
        });
    });

    describe('getEnlargedImageContainerDimension', () => {
        it('returns correct value when container dimension is a percentage', () => {
            const actual = getEnlargedImageContainerDimension({
                containerDimension: '50%',
                smallImageDimension: 2
            });

            expect(actual).to.equal(1);
        });

        it('returns correct value when container dimension is a number', () => {
            const actual = getEnlargedImageContainerDimension({
                containerDimension: 4,
                smallImageDimension: 2
            });

            expect(actual).to.equal(4);
        });

        it('ignores containerDimension value when isInPlaceMode is set', () => {
            const actual = getEnlargedImageContainerDimension({
                containerDimension: 4,
                smallImageDimension: 2,
                isInPlaceMode: true
            });

            expect(actual).to.equal(2);
        });

        it('honors user specified dimension when isInPlaceMode is not set', () => {
            const actual = getEnlargedImageContainerDimension({
                containerDimension: 4,
                smallImageDimension: 2,
                isInPlaceMode: false
            });

            expect(actual).to.equal(4);
        });
    });
});
