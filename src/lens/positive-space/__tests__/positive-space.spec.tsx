import { shallow, ShallowWrapper } from 'enzyme';
import { CSSProperties } from 'react';
import { PositiveSpaceLens } from 'src/lens/positive-space';
import { LensProps } from 'src/types';

describe('Positive Space Lens', () => {
    const defaultProps = {
        cursorOffset: { x: 1, y: 2 },
        fadeDurationInMs: 100,
        isActive: true,
        isPositionOutside: false,
        position: { x: 3, y: 4 },
        style: {},
    };

    function getComponent(props?: Partial<LensProps>): ShallowWrapper<LensProps> {
        const compositProps: LensProps = {
            ...defaultProps,
            ...props,
        };

        return shallow(
            <PositiveSpaceLens
                {...compositProps}
                ref={{ current: { offsetHeight: 8, offsetWidth: 6 } as HTMLImageElement }}
            />,
        );
    }

    it('defaults style to an empty object', () => {
        const component = getComponent({ style: undefined });

        expect(component.prop('style')).toBeDefined();
    });

    describe('Computed Functional Style', () => {
        it('computes correct height', () => {
            const component = getComponent();

            expect(component.prop('style')?.height).toEqual('4px');
        });

        it('computes correct width', () => {
            const component = getComponent();

            expect(component.prop('style')?.width).toEqual('2px');
        });

        it('prioritizes user specified style over default style', () => {
            const component = getComponent({
                style: {
                    transition: 'foo',
                    backgroundImage: 'bar',
                },
            });

            expect(component.prop('style')?.transition).toEqual('foo');
            expect(component.prop('style')?.backgroundImage).toEqual('bar');
        });

        it('prioritizes computed style over user specified style', () => {
            const component = getComponent({
                style: {
                    position: 'relative',
                    top: 'bar',
                    left: 'baz',
                    width: 'qux',
                    height: 'grault',
                    opacity: 'foobar',
                } as CSSProperties,
            });

            expect(component.prop('style')).toEqual(expect.objectContaining({
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '2px',
                height: '4px',
                opacity: 1,
            }));
        });

        describe('top', () => {
            it('computes min correctly', () => {
                const component = getComponent({
                    position: {
                        x: 1,
                        y: 1,
                    },
                });

                expect(component.prop('style')?.top).toEqual('0px');
            });

            it('computes midrange correctly', () => {
                const component = getComponent();

                expect(component.prop('style')?.top).toEqual('2px');
            });

            it('computes max correctly', () => {
                const component = getComponent({
                    position: {
                        x: 1,
                        y: 7,
                    },
                });

                expect(component.prop('style')?.top).toEqual('4px');
            });
        });

        describe('left', () => {
            it('computes min correctly', () => {
                const component = getComponent({
                    cursorOffset: {
                        x: 2,
                        y: 2,
                    },
                    position: {
                        x: 1,
                        y: 1,
                    },
                });

                expect(component.prop('style')?.left).toEqual('0px');
            });

            it('computes mindrange correctly', () => {
                const component = getComponent();

                expect(component.prop('style')?.left).toEqual('2px');
            });

            it('computes max correctly', () => {
                const component = getComponent({
                    cursorOffset: {
                        x: 2,
                        y: 2,
                    },
                    position: {
                        x: 5,
                        y: 1,
                    },
                });

                expect(component.prop('style')?.left).toEqual('2px');
            });
        });

        describe('opacity', () => {
            it('sets opacity to 1 when active and not outside bounds', () => {
                const component = getComponent();

                expect(component.prop('style')?.opacity).toEqual(1);
            });

            it('sets opacity to 0 when not active and not outside bounds', () => {
                const component = getComponent({ isActive: false });

                expect(component.prop('style')?.opacity).toEqual(0);
            });

            it('sets opacity to 0 when  active and outside bounds', () => {
                const component = getComponent({ isPositionOutside: true });

                expect(component.prop('style')?.opacity).toEqual(0);
            });
        });
    });
});
