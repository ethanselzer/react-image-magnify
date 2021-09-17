import { forwardRef, MutableRefObject } from 'react';

import { clamp } from 'src/lib/clamp';
import { Lens } from 'src/lens/negative-space/Lens';
import type { LensProps } from 'src/types';

export const LensBottom = forwardRef<HTMLImageElement, LensProps>((props: LensProps, ref): JSX.Element | null => {
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
    const computedHeight = typedRef.current.offsetHeight - position.y - cursorOffset.y;
    const maxHeight = typedRef.current.offsetHeight - clearLensHeight;
    const height = clamp(computedHeight, 0, maxHeight);
    const clearLensBottom = position.y + cursorOffset.y;
    const top = Math.max(clearLensBottom, clearLensHeight);
    const computedStyle = {
        height: `${height}px`,
        width: '100%',
        top: `${top}px`,
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

LensBottom.displayName = 'LensBottom';
