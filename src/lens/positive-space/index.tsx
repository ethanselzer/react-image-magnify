import { clamp } from 'src/lib/clamp';
import { dataUri } from 'src/lens/positive-space/assets/textured-lens-data-uri';
import type { LensProps } from 'src/types';

export function PositiveSpaceLens(props: LensProps): JSX.Element {
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
        smallImage: {
            height: imageHeight,
            width: imageWidth,
        },
        style: userSpecifiedStyle,
        ...rest
    } = props;

    const defaultStyle = {
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
        backgroundImage: `url(${dataUri})`,
    };

    const width = cursorOffsetX * 2;
    const height = cursorOffsetY * 2;
    const isVisible = isActive && !isPositionOutside;
    const top = positionY - cursorOffsetY;
    const left = positionX - cursorOffsetX;
    const maxTop = imageHeight - height;
    const maxLeft = imageWidth - width;
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
}
