import { forwardRef, MutableRefObject } from 'react';

import { clamp } from 'src/lib/clamp';
import { Lens } from 'src/lens/negative-space/Lens';
import type { LensProps } from 'src/types';

export const LensTop = forwardRef<HTMLImageElement, LensProps>((props: LensProps, ref): JSX.Element | null => {
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
    const maxHeight = typedRef.current.offsetHeight - clearLensHeight;
    const height = clamp(position.y - cursorOffset.y, 0, maxHeight);
    const computedStyle = {
        height: `${height}px`,
        width: '100%',
        top: '0px',
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

LensTop.displayName = 'LensTop';
