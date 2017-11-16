import { expect } from 'chai';
import { getLensCursorOffset } from '../../src/lib/lens';
import {
    getLensModeEnlargedImageCoordinates,
    getInPlaceEnlargedImageCoordinates
} from '../../src/lib/imageCoordinates';

describe('Image Coordinates Library', () => {
    describe('getLensModeEnlargedImageCoordinates', () => {
        it('returns image coordinates relative to its container', () => {
            const smallImage = {
                width: 4,
                height: 4
            };
            const largeImage = {
                width: 8,
                height: 8
            };
            const position = {
                x: 2,
                y: 2
            };
            const lensCursorOffset = getLensCursorOffset(smallImage, largeImage);
            const expected = {
                x: -2,
                y: -2
            };

            const actual = getLensModeEnlargedImageCoordinates(smallImage, largeImage, position, lensCursorOffset);

            expect(actual).to.deep.equal(expected);
        });

        it('clamps position according to lens', () => {
            const smallImage = {
                width: 4,
                height: 4
            };
            const largeImage = {
                width: 8,
                height: 8
            };
            const position = {
                x: 1,
                y: 3
            };
            const lensCursorOffset = getLensCursorOffset(smallImage, largeImage);
            const expected = {
                x: -0,
                y: -4
            };

            const actual = getLensModeEnlargedImageCoordinates(smallImage, largeImage, position, lensCursorOffset);

            expect(actual).to.deep.equal(expected);
        });
    });

    describe('getInPlaceEnlargedImageCoordinates', () => {
        it('returns image coordinates relative to its container', () => {
            const container = {
                width: 4,
                height: 4
            };
            const largeImage = {
                width: 8,
                height: 8
            };
            const position = {
                x: 2,
                y: 2
            };
            const expected = {
                x: -2,
                y: -2
            };

            const actual = getInPlaceEnlargedImageCoordinates(container, largeImage, position);

            expect(actual).to.deep.equal(expected);
        });

        it('clamps coordinates to the container when position is outside', () => {
            const container = {
                width: 4,
                height: 4
            };
            const largeImage = {
                width: 8,
                height: 8
            };
            const position = {
                x: 5,
                y: -1
            };
            const expected = {
                x: -4,
                y: 0
            };

            const actual = getInPlaceEnlargedImageCoordinates(container, largeImage, position);

            expect(actual).to.deep.equal(expected);
        });
    });
});
