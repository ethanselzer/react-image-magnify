import { HTMLProps } from 'react';

export interface PropTypes extends HTMLProps<HTMLDivElement> {
    fadeDurationInMs?: number,
    isActive?: boolean,
    isPositionOutside?: boolean;
}

export const Lens = (props: PropTypes): JSX.Element => {
    const {
        fadeDurationInMs = 0,
        isActive,
        isPositionOutside,
        style: parentSpecifiedStyle,
        ...rest
    } = props;

    const defaultStyle = {
        width: 'auto',
        height: 'auto',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
        display: 'block',
    };

    const computedStyle = {
        position: 'absolute',
        opacity: (isActive && !isPositionOutside) ? 1 : 0,
        transition: `opacity ${fadeDurationInMs}ms ease-in`,
    } as PropTypes['style'];

    const compositStyle = {
        ...defaultStyle,
        ...parentSpecifiedStyle,
        ...computedStyle,
    };

    return <div style={compositStyle} {...rest} />;
};
