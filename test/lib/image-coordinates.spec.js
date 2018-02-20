import { expect } from 'chai';
import {
    getLensModeEnlargedImageCoordinates,
    getInPlaceEnlargedImageCoordinates
} from '../../src/lib/imageCoordinates';

describe('Image Coordinates Library', () => {
    describe('getLensModeEnlargedImageCoordinates', () => {
        it('returns image coordinates relative to its container', () => {
            const enlargedImageContainerDimensions = {
                width: 4,
                height: 4
            };
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
            const lensCursorOffset = { x: 1, y: 1 };

            const actual = getLensModeEnlargedImageCoordinates({
                smallImage,
                largeImage,
                position,
                cursorOffset: lensCursorOffset,
                containerDimensions: enlargedImageContainerDimensions
            });

            expect(actual).to.deep.equal({ x: -2, y: -2 });
        });

        it('clamps position according to lens', () => {
            const enlargedImageContainerDimensions = {
                width: 4,
                height: 4
            };
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
            const lensCursorOffset = { x: 1, y: 1 };

            const actual = getLensModeEnlargedImageCoordinates({
                smallImage,
                largeImage,
                position,
                cursorOffset: lensCursorOffset,
                containerDimensions: enlargedImageContainerDimensions
            });

            expect(actual).to.deep.equal({ x: -0, y: -4 });
        });
    });

    describe('getInPlaceEnlargedImageCoordinates', () => {
        it('returns image coordinates relative to its container', () => {
            const containerDimensions = {
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

            const actual = getInPlaceEnlargedImageCoordinates({ containerDimensions, largeImage, position });

            expect(actual).to.deep.equal({ x: -2, y: -2 });
        });

        it('clamps coordinates to the container when position is outside', () => {
            const containerDimensions = {
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

            const actual = getInPlaceEnlargedImageCoordinates({ containerDimensions, largeImage, position });

            expect(actual).to.deep.equal({ x: -4, y: 0 });
        });
    });
});
