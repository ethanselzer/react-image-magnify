import { ComponentProps, CSSProperties } from 'react';

import { MagnifyContainer } from 'src/MaginfyContainer';

export type PropTypes = ComponentProps<typeof MagnifyContainer>;

export const InPlaceMagnifyContainer = (props: PropTypes): JSX.Element => {
    const {
        style,
        ...rest
    } = props;
    const computedStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 100,
        ...style,
    } as CSSProperties;

    return (
        <MagnifyContainer
            inPlaceMode
            style={computedStyle}
            {...rest}
        />
    );
};
