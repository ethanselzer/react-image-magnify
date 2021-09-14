import { ComponentProps, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPortal } from 'react-dom';

import { MagnifyContainer } from 'src/MaginfyContainer';
import { useLazyRef } from 'src/hooks/useLazyRef';
import { styleToCssText } from 'src/utils';
import type { PortalProps } from 'src/types';

export interface PropTypes extends ComponentProps<typeof MagnifyContainer> {
    portalProps: PortalProps;
}

export const MagnifyContainerPortal = (props: PropTypes): JSX.Element => {
    const {
        portalProps: {
            className,
            id,
            style,
        },
        ...rest
    } = props;

    const portalRef = useLazyRef<HTMLDivElement>(() => document.createElement('div'));
    const el = portalRef.current;

    el.id = id;
    el.style.cssText = styleToCssText({
        ...style,
    });

    if (className) {
        el.className = className;
    }

    if (style) {
        el.style.cssText = styleToCssText(style);
    }

    useEffect(() => {
        document.body.appendChild(el);
        return (): void => {
            document.body.removeChild(el);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createPortal(
        <MagnifyContainer
            isPortalRendered
            {...rest}
        />,
        el,
    );
};
