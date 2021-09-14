import {
    HTMLProps, useEffect, useRef,
} from 'react';

export interface PropTypes extends HTMLProps<HTMLDivElement> {
    disabled?: boolean;
    onOutsideClick: (e: MouseEvent) => void;
    useCapture?: boolean;
}

export const OutsideClickHandler = (props: PropTypes): JSX.Element => {
    const {
        children,
        disabled,
        onOutsideClick,
        style,
        useCapture,
        ...rest
    } = props;

    const childNodeRef = useRef<HTMLDivElement>(null);

    const onMouseClick = (e: MouseEvent): void => {
        const el = e.target;
        const isDescendantOfRoot = childNodeRef.current && el instanceof Node && childNodeRef.current.contains(el);

        if (!isDescendantOfRoot) {
            onOutsideClick(e);
        }
    };

    const removeEventListeners = (): void => {
        document.removeEventListener('click', onMouseClick);
    };

    useEffect(() => {
        removeEventListeners();

        if (!disabled) {
            document.addEventListener('click', onMouseClick, { capture: useCapture });
        }

        return (): void => removeEventListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);

    return (
        <div
            ref={childNodeRef}
            style={{
                height: 'fit-content',
                width: 'fit-content',
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};
