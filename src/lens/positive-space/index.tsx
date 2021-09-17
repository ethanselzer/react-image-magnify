import { clamp } from 'src/lib/clamp';
import { dataUri } from 'src/lens/positive-space/assets/textured-lens-data-uri';
import type { LensProps } from 'src/types';
import { forwardRef, MutableRefObject } from 'react';

export const PositiveSpaceLens = forwardRef<HTMLImageElement, LensProps>((props, ref): JSX.Element | null => {
    const {
        isActive,
        isPositionOutside,
        fadeDurationInMs,
        cursorOffset: {
            x: cursorOffsetX,
            y: cursorOffsetY,
        },
        position: {
            x: positionX,
            y: positionY,
        },
        style: userSpecifiedStyle,
        ...rest
    } = props;
    const typedRef = (ref as MutableRefObject<HTMLImageElement>);

    if (!typedRef?.current) {
        return null;
    }

    const defaultStyle = {
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
        backgroundImage: `url(${dataUri})`,
    };

    const width = cursorOffsetX * 2;
    const height = cursorOffsetY * 2;
    const isVisible = isActive && !isPositionOutside;
    const top = positionY - cursorOffsetY;
    const left = positionX - cursorOffsetX;
    const maxTop = typedRef.current.offsetHeight - height;
    const maxLeft = typedRef.current.offsetWidth - width;
    const minOffset = 0;

    const priorityStyle = {
        position: 'absolute',
        top: `${clamp(top, minOffset, maxTop)}px`,
        left: `${clamp(left, minOffset, maxLeft)}px`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: isVisible ? 1 : 0,
    } as LensProps['style'];

    return (
        <div
            style={{
                ...defaultStyle,
                ...userSpecifiedStyle,
                ...priorityStyle,
            }}
            {...rest}
        />
    );
});

PositiveSpaceLens.displayName = 'PositiveSpaceLens';
