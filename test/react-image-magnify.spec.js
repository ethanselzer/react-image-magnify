import React, { PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import ReactImageMagnify, { ImageShape } from '../src/ReactImageMagnify';

describe('React Image Magnify', () => {
    let shallowWrapper;
    const smallImage = {
        alt: 'baz',
        src: 'qux',
        srcSet: 'quux',
        width: 3,
        height: 4
    };

    const largeImage = {
        alt: 'foo',
        src: 'bar',
        srcSet: 'corge',
        width: 12,
        height: 16
    };

    beforeEach(() => {
        shallowWrapper = shallow(
            <ReactImageMagnify {...{
                fadeDurationInMs: 0,
                hoverDelayInMs: 0,
                hoverOffDelayInMs: 0,
                largeImage,
                smallImage
            }}/>
        );
    });

    it('has correct prop types', () => {
        expect(ReactImageMagnify.propTypes).to.deep.equal({
            className: PropTypes.string,
            enlargedImageContainerClassName: PropTypes.string,
            enlargedImageContainerStyle: PropTypes.object,
            enlargedImageClassName: PropTypes.string,
            enlargedImageStyle: PropTypes.object,
            fadeDurationInMs: PropTypes.number,
            hoverDelayInMs: PropTypes.number,
            hoverOffDelayInMs: PropTypes.number,
            imageClassName: PropTypes.string,
            imageStyle: PropTypes.object,
            largeImage: ImageShape,
            lensStyle: PropTypes.object,
            smallImage: ImageShape,
            style: PropTypes.object,
            enlargedImagePosition: PropTypes.string
        });
    });

    it('has correct default props', () => {
        expect(ReactImageMagnify.defaultProps).to.deep.equal({
            fadeDurationInMs: 300,
            hoverDelayInMs: 250,
            hoverOffDelayInMs: 150,
            enlargedImagePosition: 'beside'
        });
    });

    describe('Props API', () => {

        it('applies className to root component', () => {
            shallowWrapper.setProps({ className: 'foo' });

            expect(shallowWrapper.find('ReactCursorPosition').props().className).to.equal('foo');
        });

        it('applies style to root component', () => {
            shallowWrapper.setProps({ style: { color: 'red' } });

            expect(shallowWrapper.find('ReactCursorPosition').props().style.color).to.equal('red');
        });

        it('applies hoverDelayInMs to ReactHoverObserver component', () => {
            shallowWrapper.setProps({ hoverDelayInMs: 1 });

            expect(shallowWrapper.find('ReactHoverObserver').props().hoverDelayInMs).to.equal(1);
        });

        it('applies hoverOffDelayInMs to ReactHoverObserver component', () => {
            shallowWrapper.setProps({ hoverOffDelayInMs: 2 });

            expect(shallowWrapper.find('ReactHoverObserver').props().hoverOffDelayInMs).to.equal(2);
        });

        it('applies imageClassName to small image element', () => {
            shallowWrapper.setProps({ imageClassName: 'baz' });

            expect(shallowWrapper.find('img').hasClass('baz')).to.be.true;
        });

        it('applies imageStyle to small image element', () => {
            shallowWrapper.setProps({ imageStyle: { color: 'green' } });

            expect(shallowWrapper.find('img').props().style.color).to.equal('green');
        });

        it('applies smallImage to small image element', () => {
            expect(shallowWrapper.find('img').props().alt).to.equal(smallImage.alt);
            expect(shallowWrapper.find('img').props().src).to.equal(smallImage.src);
            expect(shallowWrapper.find('img').props().srcSet).to.equal(smallImage.srcSet);
            expect(shallowWrapper.find('img').props().style.width).to.equal(smallImage.width + 'px');
            expect(shallowWrapper.find('img').props().style.height).to.equal(smallImage.height + 'px');
        });

        it('applies lensStyle to lens elements', () => {
            const style = { backgroundColor: '#efefef' };
            shallowWrapper.setProps({ lensStyle: style });

            expect(shallowWrapper.find('LensTop').props().style).to.deep.equal(style);
            expect(shallowWrapper.find('LensLeft').props().style).to.deep.equal(style);
            expect(shallowWrapper.find('LensRight').props().style).to.deep.equal(style);
            expect(shallowWrapper.find('LensBottom').props().style).to.deep.equal(style);
        });

        it('applies fadeDurationInMs to lens elements', () => {
            shallowWrapper.setProps({ fadeDurationInMs: 1 });

            expect(shallowWrapper.find('LensTop').props().fadeDurationInMs).to.deep.equal(1);
            expect(shallowWrapper.find('LensLeft').props().fadeDurationInMs).to.deep.equal(1);
            expect(shallowWrapper.find('LensRight').props().fadeDurationInMs).to.deep.equal(1);
            expect(shallowWrapper.find('LensBottom').props().fadeDurationInMs).to.deep.equal(1);
        });

        it('applies smallImage to lens elements', () => {
            shallowWrapper.setProps({ fadeDurationInMs: 1 });

            expect(shallowWrapper.find('LensTop').props().smallImage).to.equal(smallImage);
            expect(shallowWrapper.find('LensLeft').props().smallImage).to.equal(smallImage);
            expect(shallowWrapper.find('LensRight').props().smallImage).to.equal(smallImage);
            expect(shallowWrapper.find('LensBottom').props().smallImage).to.equal(smallImage);
        });

        it('applies enlargedImageContainerClassName to EnlargedImage component', () => {
            shallowWrapper.setProps({ enlargedImageContainerClassName: 'foo' });

            expect(shallowWrapper.find('EnlargedImage').props().containerClassName).to.equal('foo');
        });

        it('applies enlargedImageContainerStyle to EnlargedImage component', () => {
            const style = { color: 'red' };
            shallowWrapper.setProps({ enlargedImageContainerStyle: style });

            expect(shallowWrapper.find('EnlargedImage').props().containerStyle).to.equal(style);
        });

        it('applies enlargedImageClassName to EnlargedImage component', () => {
            shallowWrapper.setProps({ enlargedImageClassName: 'bar' });

            expect(shallowWrapper.find('EnlargedImage').props().imageClassName).to.equal('bar');
        });

        it('applies enlargedImageStyle to EnlargedImage component', () => {
            const style = { color: 'blue' };
            shallowWrapper.setProps({ enlargedImageStyle: style });

            expect(shallowWrapper.find('EnlargedImage').props().imageStyle).to.equal(style);
        });

        it('applies fadeDurationInMs to EnlargedImage component', () => {
            shallowWrapper.setProps({ fadeDurationInMs: 1 });

            expect(shallowWrapper.find('EnlargedImage').props().fadeDurationInMs).to.equal(1);
        });

        it('applies smallImage to EnlargedImage element', () => {
            expect(shallowWrapper.find('EnlargedImage').props().smallImage).to.equal(smallImage);
        });

        it('applies largeImage to EnlargedImage element', () => {
            expect(shallowWrapper.find('EnlargedImage').props().largeImage).to.equal(largeImage);
        });   

        it('applies enlargedImagePosition to EnlargedImage element', () => {
            shallowWrapper.setProps({ enlargedImagePosition: 'over' });

            expect(shallowWrapper.find('EnlargedImage').props().imagePosition).to.equal('over');
        });
    });
});