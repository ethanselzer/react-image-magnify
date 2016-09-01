import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import ImageZoomLens from '../src/ImageZoomLens';

describe('Image Zoom Lens', () => {
    it('applies default inline style', () => {
        const expected = 'position:absolute;transform:translate(0px, 0px);-webkit-transform:translate(0px, 0px);-ms-transform:translate(0px, 0px);opacity:0;transition:opacity 0ms ease-in;width:auto;height:auto;top:auto;right:auto;bottom:auto;left:auto;display:block;background-color:transparent;cursor:auto;';

        const c = render(<ImageZoomLens />);

        expect(c.find('div').attr('style')).to.equal(expected);
    });

    it('applies supplied inline style', () => {
        const expected = 'width:1px;height:2px;top:3px;right:4px;bottom:5px;left:6px;display:inline-block;background-color:#fff;cursor:pointer;'

        const c = render(
            <ImageZoomLens {...{
                style: {
                    width: '1px',
                    height: '2px',
                    top: '3px',
                    right: '4px',
                    bottom: '5px',
                    left: '6px',
                    display: 'inline-block',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                }
            }}/>
        );

        expect(c.find('div').attr('style').endsWith(expected)).to.be.true;
    });

    it('applies translateX and translateY props to CSS transform translate function', () => {
        const c = render(
            <ImageZoomLens {...{
                translateX: 1,
                translateY: 2
            }}/>
        );

        expect(c.find('div').css('transform')).to.equal('translate(1px, 2px)');
    });

    it('applies vendor prefixes to inline CSS transform property', () => {
        const c = render(
            <ImageZoomLens {...{
                translateX: 1,
                translateY: 2
            }}/>
        );

        expect(c.find('div').css('transform')).to.equal('translate(1px, 2px)');
        expect(c.find('div').css('-ms-transform')).to.equal('translate(1px, 2px)');
        expect(c.find('div').css('-webkit-transform')).to.equal('translate(1px, 2px)');
    });

    it('applies a value of 0 to CSS opacity property when isHovering is unset', () => {
        const c = render(<ImageZoomLens />);

        expect(c.find('div').css('opacity')).to.equal('0');
    });

    it('applies a value of 1 to CSS opacity property when isHovering is set', () => {
        const c = render(<ImageZoomLens isHovering />);

        expect(c.find('div').css('opacity')).to.equal('1');
    });

    it('applies default CSS opacity transition of 0 milliseconds', () => {
        const c = render(<ImageZoomLens />);

        expect(c.find('div').css('transition')).to.equal('opacity 0ms ease-in');
    });

    it('applies supplied CSS opacity transition', () => {
        const c = render(<ImageZoomLens fadeDurationInMs={ 100 } />);

        expect(c.find('div').css('transition')).to.equal('opacity 100ms ease-in');
    });
});
