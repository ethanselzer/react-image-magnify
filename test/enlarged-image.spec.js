import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EnlargedImage, { Point, ImageShape } from '../src/EnlargedImage';
import { Image } from '../src/ReactImageMagnify';

describe('Enlarged Image', () => {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <EnlargedImage {...{
                cursorOffset: {
                    x: 0,
                    y: 0
                },
                cursorPosition: {
                    x: 0,
                    y: 0
                },
                fadeDurationInMs: 0,
                isHovering: true,
                largeImage: {
                    alt: 'foo',
                    src: 'bar',
                    srcSet: 'corge',
                    width: 12,
                    height: 16
                },
                smallImage: {
                    alt: 'baz',
                    src: 'qux',
                    srcSet: 'quux',
                    width: 3,
                    height: 4
                }
            }}/>
        );

        shallowWrapper.setState({ isTransitionActive: true });
    });

    it('has display name EnlargedImage', () => {
        expect(shallowWrapper.instance().constructor.displayName).to.equal('EnlargedImage');
    });

    it('has correct initial state', () => {
        expect(shallowWrapper.instance().getInitialState()).to.deep.equal({
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false
        });
    });

    it('has correct prop types', () => {
        expect(shallowWrapper.instance().constructor.propTypes).to.deep.equal({
            containerClassName: React.PropTypes.string,
            containerStyle: React.PropTypes.object,
            cursorOffset: Point,
            cursorPosition: Point,
            fadeDurationInMs: PropTypes.number,
            imageClassName: PropTypes.string,
            imageStyle: PropTypes.object,
            isHovering: PropTypes.bool,
            isRenderOnDemand: PropTypes.bool,
            largeImage: ImageShape,
            smallImage: ImageShape,
            imagePosition: PropTypes.string
        });
    });

    it('has correct default props', () => {
        expect(shallowWrapper.instance().constructor.getDefaultProps()).to.deep.equal({
            fadeDurationInMs: 0,
            isRenderOnDemand: true
        });
    });

    describe('Props API', () => {

        it('applies containerClassName to container CSS class', () => {
            shallowWrapper.setProps({ containerClassName: 'foo' });

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').hasClass('foo')).to.be.true;
        });

        it('applies containerStyle to container CSS style', () => {
            const borderValue = '2px dashed #000';
            shallowWrapper.setProps({
                containerStyle:{ border: borderValue }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').css('border')).to.equal(borderValue);
        });

        it('applies fadeDurationInMs to container CSS opacity transition', () => {
            shallowWrapper.setProps({ fadeDurationInMs: 100 });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').css('transition')).to.equal('opacity 100ms ease-in');
        });

        it('applies imageClassName to image CSS class', () => {
            shallowWrapper.setProps({ imageClassName: 'foo' });

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').hasClass('foo')).to.be.true;
        });

        it('applies imageStyle to image CSS style', () => {
            const borderValue = '2px dashed #000';
            shallowWrapper.setProps({
                imageStyle:{ border: borderValue }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('border')).to.equal(borderValue);
        });

        it('applies imagePosition to image', () => {
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').data('hover')).to.be.false;
        });

        it('applies large image alt', () => {
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').attr('alt')).to.equal('foo');
        });

        it('applies large image src', () => {
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').attr('src')).to.equal('bar');
        });

        it('applies large image srcSet', () => {
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').attr('srcset')).to.equal('corge');
        });

        it('applies large image width', () => {
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('width')).to.equal('12px');
        });

        it('applies large image height', () => {
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('height')).to.equal('16px');
        });

    });

    describe('Container Element', () => {

        it('displays if transition is entering', () => {
            shallowWrapper.setState({
                isTransitionEntering: true,
                isTransitionActive: false,
                isTransitionLeaving: false,
                isTransitionDone: false
            });

            expect(shallowWrapper.find('div').length).to.equal(1);
        });

        it('displays if transition is active', () => {
            expect(shallowWrapper.find('div').length).to.equal(1);

            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: true,
                isTransitionLeaving: false,
                isTransitionDone: false
            });

            expect(shallowWrapper.find('div').length).to.equal(1);
        });

        it('displays if transition is leaving', () => {
            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: false,
                isTransitionLeaving: true,
                isTransitionDone: false
            });

            expect(shallowWrapper.find('div').length).to.equal(1);
        });

        it('does not display if transition is done', () => {
            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: false,
                isTransitionLeaving: false,
                isTransitionDone: true,
            });

            expect(shallowWrapper.find('div').length).to.equal(0);
        });

        it('applies a value of 0 to CSS opacity property when transition is entering', () => {
            shallowWrapper.setState({
                isTransitionEntering: true,
                isTransitionActive: false,
                isTransitionLeaving: false,
                isTransitionDone: false
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').css('opacity')).to.equal('0');
        });

        it('applies a value of 1 to CSS opacity property when transition is active', () => {
            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: true,
                isTransitionLeaving: false,
                isTransitionDone: false
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').css('opacity')).to.equal('1');
        });

        it('applies a value of 0 to CSS opacity property when transition is leaving', () => {
            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: false,
                isTransitionLeaving: true,
                isTransitionDone: false
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').css('opacity')).to.equal('0');
        });

        it('applies default style', () => {
            const expected = 'position:absolute;top:0px;overflow:hidden;';

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').attr('style').startsWith(expected)).to.be.true;
        });

        it('applies computed style', () => {
            const expected = 'width:3px;height:4px;opacity:1;transition:opacity 0ms ease-in;';

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('div').attr('style').endsWith(expected)).to.be.true;
        });

    });

    describe('Image Element', () => {

        it('computes cursor position and applies the result to CSS transfrom translate', () => {
            shallowWrapper.setProps({
                cursorPosition: {
                    x: 1,
                    y: 2
                }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('transform')).to.equal('translate(-4px, -8px)');
        });

        it('computes cursor offset and applies the result to CSS transfrom translate', () => {
            shallowWrapper.setProps({
                cursorOffset: {
                    x: 1,
                    y: 2
                },
                cursorPosition: {
                    x: 2,
                    y: 4
                }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('transform')).to.equal('translate(-4px, -8px)');
        });

        it('computes image size ratio and applies the result to CSS transfrom translate', () => {
            shallowWrapper.setProps({
                cursorOffset: {
                    x: 0,
                    y: 0
                },
                cursorPosition: {
                    x: 1,
                    y: 2
                },
                largeImage: {
                    src: 'foo',
                    width: 8,
                    height: 8
                },
                smallImage: {
                    src: 'bar',
                    width: 4,
                    height: 4
                }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('transform')).to.equal('translate(-2px, -4px)');
        });

        it('computes max coordinates and applies the result to CSS transfrom translate', () => {
            shallowWrapper.setProps({
                cursorOffset: {
                    x: 0,
                    y: 0
                },
                cursorPosition: {
                    x: 5,
                    y: 5
                },
                largeImage: {
                    src: 'foo',
                    width: 8,
                    height: 8
                },
                smallImage: {
                    src: 'bar',
                    width: 4,
                    height: 4
                }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('transform')).to.equal('translate(-4px, -4px)');
        });

        it('computes min coordinates and applies the result to CSS transfrom translate', () => {
            shallowWrapper.setProps({
                cursorOffset: {
                    x: 0,
                    y: 0
                },
                cursorPosition: {
                    x: -1,
                    y: -1
                },
                largeImage: {
                    src: 'foo',
                    width: 8,
                    height: 8
                },
                smallImage: {
                    src: 'bar',
                    width: 4,
                    height: 4
                }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('transform')).to.equal('translate(0px, 0px)');
        });

        it('applies vendor prefixes to CSS transform property', () => {
            shallowWrapper.setProps({
                cursorPosition: {
                    x: 1,
                    y: 2
                }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.find('img').css('transform')).to.equal('translate(-4px, -8px)');
            expect(renderedWrapper.find('img').css('-ms-transform')).to.equal('translate(-4px, -8px)');
            expect(renderedWrapper.find('img').css('-webkit-transform')).to.equal('translate(-4px, -8px)');
        });

    });
});