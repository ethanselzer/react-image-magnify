import { HTMLProps, useState } from 'react';

export interface PropTypes extends HTMLProps<unknown> {
    isActive?: boolean;
    shouldHideAfterFirstActivation?: boolean;
}

export function DisplayUntilActive(props: PropTypes): JSX.Element {
    const {
        children,
        isActive,
        shouldHideAfterFirstActivation = true,
    } = props;
    const [hasShown, setHasShown] = useState<boolean>(false);

    const shouldShow = !isActive && (!hasShown || !shouldHideAfterFirstActivation);

    if (isActive && !hasShown) {
        setHasShown(true);
    }

    return (
        <>
            {shouldShow && children}
        </>
    );
}
