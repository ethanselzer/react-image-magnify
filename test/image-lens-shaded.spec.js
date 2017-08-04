import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ImageLensShaded from '../src/ImageLensShaded';

describe('Image Lens Shaded', () => {
    const smallImage = {
        alt: 'baz',
        isFluidWidth: false,
        src: 'qux',
        srcSet: 'quux',
        sizes: 'grault',
        width: 3,
        height: 4
    };

    const props = {
        cursorOffset: { x: 0, y: 0 },
        fadeDurationInMs: 100,
        isActive: true,
        isPositionOutside: false,
        position: { x: 1, y: 2 },
        smallImage,
        style: {}
    };

    const defaultBackgroundStyle = { backgroundColor: 'rgba(0,0,0,.4)' };

    let mountedWrapper = mount(<ImageLensShaded {...props} />);

    beforeEach(() => {
        mountedWrapper = mount(<ImageLensShaded {...props} />);
    });

    it('applies props to lens elements', () => {
        const expected = Object.assign(
            {},
            props,
            { style: defaultBackgroundStyle }
        );

        expect(mountedWrapper.find('LensTop').props()).to.deep.equal(expected);
        expect(mountedWrapper.find('LensLeft').props()).to.deep.equal(expected);
        expect(mountedWrapper.find('LensRight').props()).to.deep.equal(expected);
        expect(mountedWrapper.find('LensBottom').props()).to.deep.equal(expected);
    });

    it('applies default sytle to lens elements', () => {
        const expected = defaultBackgroundStyle;

        expect(mountedWrapper.find('LensTop').props().style).to.deep.equal(expected);
        expect(mountedWrapper.find('LensLeft').props().style).to.deep.equal(expected);
        expect(mountedWrapper.find('LensRight').props().style).to.deep.equal(expected);
        expect(mountedWrapper.find('LensBottom').props().style).to.deep.equal(expected);
    });
});