/**
 * @jest-environment jsdom
 */

import { mount } from 'enzyme';
import { NegativeSpaceLens } from 'src/lens/negative-space';
import { LensProps } from 'src/types';

describe('Shaded Lens', () => {
    const props: LensProps = {
        cursorOffset: { x: 0, y: 0 },
        fadeDurationInMs: 100,
        isActive: true,
        isPositionOutside: false,
        position: { x: 1, y: 2 },
        style: {},
    };

    const defaultBackgroundStyle = { backgroundColor: 'rgba(0,0,0,.4)' };

    let mountedWrapper = mount(
        <NegativeSpaceLens
            {...props}
            ref={{ current: { offsetHeight: 4, offsetWidth: 3 } as HTMLImageElement }}
        />,
    );

    beforeEach(() => {
        mountedWrapper = mount(
            <NegativeSpaceLens
                {...props}
                ref={{ current: { offsetHeight: 4, offsetWidth: 3 } as HTMLImageElement }}
            />,
        );
    });

    it('applies props to lens elements', () => {
        const expected = {
            ...props,
            style: defaultBackgroundStyle,
        };

        expect(mountedWrapper.find('LensTop').props()).toEqual(expected);
        expect(mountedWrapper.find('LensLeft').props()).toEqual(expected);
        expect(mountedWrapper.find('LensRight').props()).toEqual(expected);
        expect(mountedWrapper.find('LensBottom').props()).toEqual(expected);
    });

    it('applies default style to lens elements', () => {
        const expected = defaultBackgroundStyle;

        expect(mountedWrapper.find('LensTop').props().style).toEqual(expected);
        expect(mountedWrapper.find('LensLeft').props().style).toEqual(expected);
        expect(mountedWrapper.find('LensRight').props().style).toEqual(expected);
        expect(mountedWrapper.find('LensBottom').props().style).toEqual(expected);
    });
});
