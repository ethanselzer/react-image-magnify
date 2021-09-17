import { forwardRef, MutableRefObject } from 'react';

import { clamp } from 'src/lib/clamp';
import { Lens } from 'src/lens/negative-space/Lens';
import type { LensProps } from 'src/types';

export const LensLeft = forwardRef<HTMLImageElement, LensProps>((props, ref): JSX.Element | null => {
    const {
        cursorOffset,
        position,
        fadeDurationInMs,
        isActive,
        isPositionOutside,
        style: parentSpecifiedStyle,
        ...rest
    } = props;
    const typedRef = (ref as MutableRefObject<HTMLImageElement>);

    if (!typedRef?.current) {
        return null;
    }

    const clearLensHeight = cursorOffset.y * 2;
    const clearLensWidth = cursorOffset.x * 2;
    const maxHeight = typedRef.current.offsetHeight - clearLensHeight;
    const maxWidth = typedRef.current.offsetWidth - clearLensWidth;
    const height = clearLensHeight;
    const width = clamp(position.x - cursorOffset.x, 0, maxWidth);
    const top = clamp(position.y - cursorOffset.y, 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        left: '0px',
    };

    return (
        <Lens
            fadeDurationInMs={fadeDurationInMs}
            isActive={isActive}
            isPositionOutside={isPositionOutside}
            style={{
                ...parentSpecifiedStyle,
                ...computedStyle,
            }}
            {...rest}
        />
    );
});

LensLeft.displayName = 'LensLeft';
