import { clamp } from 'src/lib/clamp';
import { Lens } from 'src/lens/negative-space/Lens';
import type { LensProps } from 'src/types';

export const LensTop = (props: LensProps): JSX.Element => {
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
    const maxHeight = smallImage.height - clearLensHeight;
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
};
