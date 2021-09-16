import { clamp } from 'src/lib/clamp';
import { Lens } from 'src/lens/negative-space/Lens';
import type { LensProps } from 'src/types';

export const LensLeft = (props: LensProps): JSX.Element => {
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
    const clearLensWidth = cursorOffset.x * 2;
    const maxHeight = smallImage.height - clearLensHeight;
    const maxWidth = smallImage.width - clearLensWidth;
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
};
