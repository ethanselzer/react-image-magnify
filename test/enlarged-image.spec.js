import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import EnlargedImage from '../src/EnlargedImage';
import * as utils from '../src/utils';

describe('Enlarged Image', () => {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = getShallowWrapper();

        shallowWrapper.setState({
            isActive: true,
            isTransitionActive: true
        });
    });

    it('has display name EnlargedImage', () => {
        expect(EnlargedImage.displayName).to.equal('EnlargedImage');
    });

    it('has correct initial state', () => {
        const shallowWrapper = getShallowWrapper();
        expect(shallowWrapper.state()).to.deep.equal({
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false
        });
    });

    it('has correct default props', () => {
        expect(EnlargedImage.defaultProps).to.deep.equal({
            fadeDurationInMs: 0,
            isLazyLoaded: true
        });
    });

    it('renders lazily by default', () => {
        const wrapper = getShallowWrapper();
        expect(wrapper.find('div')).to.have.length(0);
    });

    it('renders nonlazily if isLazyLoaded is set to false', () => {
        const wrapper = getShallowWrapper({ isLazyLoaded: false });
        expect(wrapper.find('div')).to.have.length(1);
    });

    it('cleans up timers on teardown', () => {
        const instance = shallowWrapper.instance();
        instance.timers = [1, 2];
        sinon.spy(global, 'clearTimeout');

        shallowWrapper.unmount();

        expect(global.clearTimeout.calledTwice).to.be.true;
        expect(global.clearTimeout.getCall(0).args[0]).to.equal(1);
        expect(global.clearTimeout.getCall(1).args[0]).to.equal(2);
        global.clearTimeout.restore();
    });

    describe('Props API', () => {

        it('applies containerClassName to container CSS class', () => {
            shallowWrapper.setProps({ containerClassName: 'foo' });

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.hasClass('foo')).to.be.true;
        });

        it('applies containerStyle to container CSS style', () => {
            const borderValue = '2px dashed #000';
            shallowWrapper.setProps({
                containerStyle:{ border: borderValue }
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.css('border')).to.equal(borderValue);
        });

        it('applies fadeDurationInMs to container CSS opacity transition', () => {
            shallowWrapper.setProps({ fadeDurationInMs: 100 });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.css('transition')).to.equal('opacity 100ms ease-in');
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

        it('applies CSS to container element based on isInPlaceMode prop', () => {
            shallowWrapper.setProps({ isInPlaceMode: true });
            expect(shallowWrapper.render().css('left')).to.equal('0px');

            shallowWrapper.setProps({ isInPlaceMode: false });
            expect(shallowWrapper.render().css('left')).to.equal('100%');
            expect(shallowWrapper.render().css('margin-left')).to.equal('10px');
            expect(shallowWrapper.render().css('border')).to.equal('1px solid #d6d6d6');
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

        describe('Load Event', () => {
            it('supports a listener function', () => {
                const onLoad = sinon.spy();
                shallowWrapper.setProps({
                    largeImage: Object.assign(
                        {},
                        props.largeImage,
                        { onLoad }
                    )
                });

                shallowWrapper.find('img').simulate('load');

                expect(onLoad.called).to.be.true;
            });

            it('provides the browser event object to listener function', () => {
                const onLoad = sinon.spy();
                shallowWrapper.setProps({
                    largeImage: Object.assign(
                        {},
                        props.largeImage,
                        { onLoad }
                    )
                });
                const eventObject = {};

                shallowWrapper.find('img').simulate('load', eventObject);

                const listenerArguments = onLoad.getCall(0).args;
                expect(listenerArguments.length).to.equal(1);
                expect(listenerArguments[0]).to.equal(eventObject);
            });

            it('defaults the listener to noop', () => {
                sinon.spy(utils, 'noop');
                const shallowWrapper = getShallowWrapper();
                shallowWrapper.setState({
                    isActive: true,
                    isTransitionActive: true
                });

                shallowWrapper.find('img').simulate('load');

                expect(utils.noop.called).to.be.true;

                utils.noop.restore();
            });
        });

        describe('Error Event', () => {
            it('supports a listener function', () => {
                const onError = sinon.spy();
                shallowWrapper.setProps({
                    largeImage: Object.assign(
                        {},
                        props.largeImage,
                        { onError }
                    )
                });

                shallowWrapper.find('img').simulate('error');

                expect(onError.called).to.be.true;
            });

            it('provides the browser event object to listener function', () => {
                const onError = sinon.spy();
                shallowWrapper.setProps({
                    largeImage: Object.assign(
                        {},
                        props.largeImage,
                        { onError }
                    )
                });
                const eventObject = {};

                shallowWrapper.find('img').simulate('error', eventObject);

                const listenerArguments = onError.getCall(0).args;
                expect(listenerArguments.length).to.equal(1);
                expect(listenerArguments[0]).to.equal(eventObject);
            });

            it('defaults the listener to noop', () => {
                sinon.spy(utils, 'noop');
                const shallowWrapper = getShallowWrapper();
                shallowWrapper.setState({
                    isActive: true,
                    isTransitionActive: true
                });


                shallowWrapper.find('img').simulate('error');

                expect(utils.noop.called).to.be.true;

                utils.noop.restore();
            });
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

            expect(renderedWrapper.css('opacity')).to.equal('0');
        });

        it('applies a value of 1 to CSS opacity property when transition is active', () => {
            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: true,
                isTransitionLeaving: false,
                isTransitionDone: false
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.css('opacity')).to.equal('1');
        });

        it('applies a value of 0 to CSS opacity property when transition is leaving', () => {
            shallowWrapper.setState({
                isTransitionEntering: false,
                isTransitionActive: false,
                isTransitionLeaving: true,
                isTransitionDone: false
            });
            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.css('opacity')).to.equal('0');
        });

        it('applies correct style for placement to the right side of the small image (default)', () => {
            const expected = 'overflow:hidden;position:absolute;top:0px;left:100%;margin-left:10px;border:1px solid #d6d6d6;width:3px;height:4px;opacity:1;transition:opacity 0ms ease-in;pointer-events:none';

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.attr('style')).to.equal(expected);
        });

        it('applies correct style for placement over the small image ', () => {
            const expected = 'overflow:hidden;position:absolute;top:0px;left:0px;width:3px;height:4px;opacity:1;transition:opacity 0ms ease-in;pointer-events:none';
            shallowWrapper.setProps({ isInPlaceMode: true });

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.attr('style')).to.equal(expected);
        });

        it('applies correct style for portal rendering', () => {
            const expected = 'overflow:hidden;width:3px;height:4px;opacity:1;transition:opacity 0ms ease-in;pointer-events:none';
            shallowWrapper.setProps({isPortalRendered: true});

            const renderedWrapper = shallowWrapper.render();

            expect(renderedWrapper.attr('style')).to.equal(expected);
        });

    });

    describe('Image Element', () => {

        it('computes cursor position and applies the result to CSS transfrom translate', () => {
            shallowWrapper.setProps({
                position: {
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
                position: {
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
                isActive: true,
                position: {
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
                containerDimensions: {
                    width: 4,
                    height: 4
                },
                cursorOffset: {
                    x: 0,
                    y: 0
                },
                isPositionOutside: true,
                position: {
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
                position: {
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
                position: {
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

    const props = {
        containerDimensions: {
            width: 3,
            height: 4
        },
        cursorOffset: {
            x: 0,
            y: 0
        },
        position: {
            x: 0,
            y: 0
        },
        fadeDurationInMs: 0,
        isActive: false,
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
    };

    function getShallowWrapper(optionalProps) {
        return shallow(
            <EnlargedImage {...props} {...optionalProps} />
        );
    }
});
