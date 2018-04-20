import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Lens from '../../src/lens/positive-space';

describe('Positive Space Lens', () => {
    const smallImage = {
        alt: 'baz',
        isFluidWidth: false,
        src: 'qux',
        srcSet: 'quux',
        sizes: 'grault',
        width: 6,
        height: 8
    };

    const defaultProps = {
        cursorOffset: { x: 1, y: 2 },
        fadeDurationInMs: 100,
        isActive: true,
        isPositionOutside: false,
        position: { x: 3, y: 4 },
        smallImage,
        style: {}
    };

    function getComponent(props) {
        const compositProps = Object.assign(
            {},
            defaultProps,
            props
        );

        return shallow(
            <Lens {...compositProps} />
        )
    }

    let component = getComponent();

    beforeEach(() => {
        component = getComponent();
    });

    it('defaults style to an empty object', () => {
        const component = getComponent({ style: undefined });

        expect(component.prop('style')).to.exist;
    })

    describe('Computed Functional Style', () => {
        it('computes correct height', () => {
            expect(component.prop('style').height).to.equal('4px');
        });

        it('computes correct width', () => {
            expect(component.prop('style').width).to.equal('2px');
        });

        it('prioritizes user specified style over default style', () => {
            const component = getComponent({
                style: {
                    transition: 'foo',
                    backgroundImage: 'bar'
                }
            });

            expect(component.prop('style').transition).to.equal('foo');
            expect(component.prop('style').backgroundImage).to.equal('bar');
        });

        it('prioritizes computed style over user specified style', () => {
            const component = getComponent({
                style: {
                    position: 'foo',
                    top: 'bar',
                    left: 'baz',
                    width: 'qux',
                    height: 'grault',
                    opacity: 'foobar'
                }
            });

            expect(component.prop('style')).to.include({
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '2px',
                height: '4px',
                opacity: 1
            });
        });

        describe('top', () => {
            it('computes min correctly', () => {
                const component = getComponent({
                    position: {
                        x: 1,
                        y: 1
                    }
                });
                expect(component.prop('style').top).to.equal('0px')
            });

            it('computes midrange correctly', () => {
                expect(component.prop('style').top).to.equal('2px')
            });

            it('computes max correctly', () => {
                const component = getComponent({
                    position: {
                        x: 1,
                        y: 7
                    }
                });
                expect(component.prop('style').top).to.equal('4px')
            });
        });

        describe('left', () => {
            it('computes min correctly', () => {
                const component = getComponent({
                    cursorOffset: {
                        x: 2,
                        y: 2
                    },
                    position: {
                        x: 1,
                        y: 1
                    }
                });
                expect(component.prop('style').left).to.equal('0px')
            });

            it('computes mindrange correctly', () => {
                expect(component.prop('style').left).to.equal('2px');
            });

            it('computes max correctly', () => {
                const component = getComponent({
                    cursorOffset: {
                        x: 2,
                        y: 2
                    },
                    position: {
                        x: 5,
                        y: 1
                    }
                });
                expect(component.prop('style').left).to.equal('2px')
            });
        });

        describe('opacity', () => {
            it('sets opacity to 1 when active and not outside bounds', () => {
                expect(component.prop('style').opacity).to.equal(1);
            });

            it('sets opacity to 0 when not active and not outside bounds', () => {
                const component = getComponent({ isActive: false });

                expect(component.prop('style').opacity).to.equal(0);
            });

            it('sets opacity to 0 when  active and outside bounds', () => {
                const component = getComponent({ isPositionOutside: true });

                expect(component.prop('style').opacity).to.equal(0);
            });
        });
    });
});
