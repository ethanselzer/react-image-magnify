import { clamp } from 'src/lib/clamp';
import { Lens } from 'src/lens/negative-space/Lens';
import type { Lens as LensPropTypes } from 'src/types';

export const LensBottom = (props: LensPropTypes): JSX.Element => {
    const {
        cursorOffset,
        position,
        fadeDurationInMs,
        isActive,
        isPositionOutside,
        smallImage,
        style: parentSpecifiedStyle,
        ...rest
    } = props;

    const clearLensHeight = cursorOffset.y * 2;
    const computedHeight = smallImage.height - position.y - cursorOffset.y;
    const maxHeight = smallImage.height - clearLensHeight;
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
};
