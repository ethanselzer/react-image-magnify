import {
    ComponentProps, forwardRef, MutableRefObject, useCallback, useEffect, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import type { Placement } from '@popperjs/core';

import { MagnifyContainer } from 'src/MaginfyContainer';
import { useLazyRef } from 'src/hooks/useLazyRef';
import { styleToCssText } from 'src/utils';
import { DEFAULT_PORTAL_ID, MagnifiedImagePosition } from 'src/constants';
import type { PortalProps } from 'src/types';

export interface PropTypes extends ComponentProps<typeof MagnifyContainer> {
    portalProps?: PortalProps;
}

export const MagnifyContainerPortal = forwardRef<HTMLImageElement, PropTypes>((props: PropTypes, ref): JSX.Element => {
    const {
        portalProps = {},
        ...rest
    } = props;

    const {
        className,
        id,
        style,
        placement = MagnifiedImagePosition.LEFT,
        strategy,
        onFirstUpdate,
        dataTestId,
        modifiers = [],
        horizontalOffset = 0,
        verticalOffset = 0,
    } = portalProps;
    const [popperElement, setPopperElement] = useState(null);
    const popper = usePopper((ref as MutableRefObject<HTMLImageElement>).current, popperElement, {
        placement: (placement as Placement),
        strategy,
        onFirstUpdate,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [verticalOffset, horizontalOffset],
                },
            },
            ...modifiers,
        ],
    });
    const randId = useLazyRef<number>(() => (Math.floor(Math.random() * 9999)));
    const portalRef = useLazyRef<HTMLDivElement>(() => document.createElement('div'));
    const popperRef = useCallback((node) => {
        if (node !== null) {
            setPopperElement(node);
        }
    }, []);
    const el = portalRef.current;

    el.id = id || `${DEFAULT_PORTAL_ID}-${randId.current}`;

    if (className) {
        el.className = className;
    }

    if (style) {
        el.style.cssText = styleToCssText(style);
    }

    if (dataTestId) {
        el.setAttribute('data-test-id', dataTestId);
    }

    useEffect(() => {
        document.body.appendChild(el);

        return (): void => {
            document.body.removeChild(el);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createPortal(
        <div
            ref={popperRef}
            style={popper.styles.popper}
            {...popper.attributes.popper}
        >
            <MagnifyContainer isPortalRendered {...rest} />
        </div>,
        el,
    );
});
