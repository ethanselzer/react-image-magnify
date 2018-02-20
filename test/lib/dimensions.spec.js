import { expect } from 'chai';
import {
    convertPercentageToDecimal,
    getDefaultEnlargedImageContainerDimensions,
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
    });

    describe('getDefaultEnlargedImageContainerDimensions', () => {
        it('returns correct default enlarged image container dimensions', () => {
            const smallImage = {
                width: 1,
                height: 2
            };
            const actual = getDefaultEnlargedImageContainerDimensions(smallImage);

            expect(actual).to.deep.equal(smallImage);
        });
    });
});
