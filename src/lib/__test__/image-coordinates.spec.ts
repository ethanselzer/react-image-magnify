import {
    getLensModeMagnifiedImageCoordinates,
    getInPlaceMagnifiedImageCoordinates,
} from 'src/lib/imageCoordinates';

describe('Image Coordinates Library', () => {
    describe('getLensModeMagnifiedImageCoordinates', () => {
        it('returns image coordinates relative to its container', () => {
            const magnifiedImageContainerDimensions = {
                width: 4,
                height: 4,
            };
            const smallImage = {
                width: 4,
                height: 4,
            };
            const largeImage = {
                width: 8,
                height: 8,
            };
            const position = {
                x: 2,
                y: 2,
            };
            const lensCursorOffset = { x: 1, y: 1 };

            const actual = getLensModeMagnifiedImageCoordinates({
                smallImage,
                largeImage,
                position,
                cursorOffset: lensCursorOffset,
                containerDimensions: magnifiedImageContainerDimensions,
            });

            expect(actual).toEqual({ x: -2, y: -2 });
        });

        it('clamps position according to lens', () => {
            const magnifiedImageContainerDimensions = {
                width: 4,
                height: 4,
            };
            const smallImage = {
                width: 4,
                height: 4,
            };
            const largeImage = {
                width: 8,
                height: 8,
            };
            const position = {
                x: 1,
                y: 3,
            };
            const lensCursorOffset = { x: 1, y: 1 };

            const actual = getLensModeMagnifiedImageCoordinates({
                smallImage,
                largeImage,
                position,
                cursorOffset: lensCursorOffset,
                containerDimensions: magnifiedImageContainerDimensions,
            });

            expect(actual).toEqual({ x: -0, y: -4 });
        });
    });

    describe('getInPlaceMagnifiedImageCoordinates', () => {
        it('returns image coordinates relative to its container', () => {
            const containerDimensions = {
                width: 4,
                height: 4,
            };
            const largeImage = {
                width: 8,
                height: 8,
            };
            const position = {
                x: 2,
                y: 2,
            };

            const actual = getInPlaceMagnifiedImageCoordinates({ containerDimensions, largeImage, position });

            expect(actual).toEqual({ x: -2, y: -2 });
        });

        it('clamps coordinates to the container when position is outside', () => {
            const containerDimensions = {
                width: 4,
                height: 4,
            };
            const largeImage = {
                width: 8,
                height: 8,
            };
            const position = {
                x: 5,
                y: -1,
            };

            const actual = getInPlaceMagnifiedImageCoordinates({ containerDimensions, largeImage, position });

            expect(actual).toEqual({ x: -4, y: 0 });
        });
    });
});
