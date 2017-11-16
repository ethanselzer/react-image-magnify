import { expect } from 'chai';
import { getLensCursorOffset } from '../../src/lib/lens';

describe('Lens Library', () => {
    describe('getLensCursorOffset', () => {
        it('returns a point representing the offset from the cursor to the top-left of the clear lens', () => {
            const smallImage = {
                width: 4,
                height: 4
            };
            const largeImage = {
                width: 8,
                height: 8
            };
            const expected = {
                x: 1,
                y: 1
            }

            const actual = getLensCursorOffset(smallImage, largeImage);

            expect(actual).to.deep.equal(expected);
        });

        it('rounds values', () => {
            const smallImage = {
                width: 4,
                height: 6
            };
            const largeImage = {
                width: 8,
                height: 12
            };
            const expected = {
                x: 1,
                y: 2 // rounded up from 1.5
            }

            const actual = getLensCursorOffset(smallImage, largeImage);

            expect(actual).to.deep.equal(expected);
        });
    });
});
