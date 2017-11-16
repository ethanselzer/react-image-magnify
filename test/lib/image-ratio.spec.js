import { expect } from 'chai';
import {
    getSmallToLargeImageRatio,
    getLargeToSmallImageRatio,
    getContainerToImageRatio
} from '../../src/lib/imageRatio';

describe('Image Ratio Library', () => {
    describe('getSmallToLargeImageRatio', () => {
        it('expresses the number of times the small image fits in the large image', () => {
            const smallImage = {
                width: 2,
                height: 3
            };
            const largeImage = {
                width: 6,
                height: 9
            };
            const expected = {
                x: 3,
                y: 3
            };

            const actual = getSmallToLargeImageRatio(smallImage, largeImage);

            expect(actual).to.deep.equal(expected);
        });

        it('supports images that are not proportional to one another', () => {
            const smallImage = {
                width: 2,
                height: 3
            };
            const largeImage = {
                width: 6,
                height: 6
            };
            const expected = {
                x: 3,
                y: 2
            };

            const actual = getSmallToLargeImageRatio(smallImage, largeImage);

            expect(actual).to.deep.equal(expected);
        });
    });

    describe('getLargeToSmallImageRatio', () => {
        it('expresses the number of times the large image fits into the small image', () => {
            const smallImage = {
                width: 2,
                height: 4
            };
            const largeImage = {
                width: 4,
                height: 8
            };
            const expected = {
                x: 0.5,
                y: 0.5
            };

            const actual = getLargeToSmallImageRatio(smallImage, largeImage);

            expect(actual).to.deep.equal(expected);
        });

        it('supports input images that are not proportional to one another', () => {
            const smallImage = {
                width: 2,
                height: 3
            };
            const largeImage = {
                width: 6,
                height: 6
            };
            const expected = {
                x: 0.3333333333333333,
                y: 0.5
            };

            const actual = getLargeToSmallImageRatio(smallImage, largeImage);

            expect(actual).to.deep.equal(expected);
        });
    });

    describe('getContainerToImageRatio', () => {
        it(
            `expresses how many times the dimensions of a container
            element fit into (the dimensions of an image element, minus
            the dimensions of the container element).`
            , () => {
                const containerElement = {
                    width: 2,
                    height: 3
                };
                const largeImage = {
                    width: 6,
                    height: 9
                };
                const expected = {
                    x: 2,
                    y: 2
                };

                const actual = getContainerToImageRatio(containerElement, largeImage);

                expect(actual).to.deep.equal(expected);
            }
        );

        it('supports images dimensions that are not proportional to their container dimensions', () => {
            const containerElement = {
                width: 2,
                height: 3
            };
            const largeImage = {
                width: 6,
                height: 6
            };
            const expected = {
                x: 2,
                y: 1
            };

            const actual = getContainerToImageRatio(containerElement, largeImage);

            expect(actual).to.deep.equal(expected);
        });
    });
});
