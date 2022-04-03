import type {
    ComponentType,
    CSSProperties,
    DetailedHTMLProps,
    ForwardRefExoticComponent,
    HTMLProps,
    ImgHTMLAttributes,
    TouchEvent as ReactTouchEvent,
} from 'react';
import type {
    Modifier,
    Options,
    Placement,
} from '@popperjs/core';

export type Interactions = {
    touch: 'touch';
    tap: 'tap';
    doubleTap: 'double_tap';
    press: 'press';
    click: 'click';
    hover: 'hover';
}

export type MagnifiedImagePosition = Placement | 'over';

export type ActivationChangeEvent = {
    isActive: boolean;
};

export type OnIsActiveChangedHandler = (event: ActivationChangeEvent) => void;

export type TimerHandle = {
    name: string;
    id: number | NodeJS.Timeout;
};

export type DetectedInputType = {
    isMouseDetected: boolean;
    isTouchDetected: boolean;
};

export type Point = {
    x: number;
    y: number;
};

export type PositionChangeEvent = {
    isPositionOutside: boolean;
    position: Point;
};

export type TouchEvent = {
    e: ReactTouchEvent;
    position: Point;
};

export type InputType = {
    mouse: 'mouse';
    touch: 'touch';
};

export type ContainerDimensions = {
    height: number;
    width: number;
};

export type MagnifiedImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    height: number;
    width: number;
};

export type ImageProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'height' | 'width'> & {
    height?: string | number;
    width?: string | number;
}

export interface LensProps extends HTMLProps<HTMLDivElement> {
    cursorOffset: Point;
    fadeDurationInMs?: number;
    isActive?: boolean;
    isPositionOutside?: boolean;
    position: Point;
}

export interface HintProps {
    isMouseDetected?: boolean;
    isTouchDetected?: boolean;
    hintTextMouse: string;
    hintTextTouch: string;
    style?: CSSProperties | null;
}

export type PortalProps = Omit<Partial<Options>, 'modifiers' | 'placement'> & {
    className?: string;
    id?: string;
    style?: CSSProperties;
    placement?: MagnifiedImagePosition;
    dataTestId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modifiers?: Modifier<any, any>[];
    horizontalOffset?: number;
    verticalOffset?: number;
};

export interface MagnifyContainerProps extends Omit<HTMLProps<HTMLDivElement>, 'height' | 'width'> {
    scale?: number;
    height?: number;
    width?: number;
}

export type ChildProps = {
    isActive: boolean;
    isPositionOutside: boolean;
    elementDimensions: ContainerDimensions;
    position: Point;
};

export interface CursorPositionProps extends HTMLProps<HTMLDivElement> {
    activationInteractionMouse: Interactions['click'] | Interactions['hover'];
    activationInteractionTouch: Interactions['press'] | Interactions['tap'] | Interactions['touch'];
    children: (props: ChildProps) => JSX.Element;
    hoverDelayInMs?: number;
    hoverOffDelayInMs?: number;
    isEnabled?: boolean;
    onActivationChanged?: (event: ActivationChangeEvent) => void;
    onDetectedEnvironmentChanged?: (detectedInputType: DetectedInputType) => void;
    onPositionChanged?: (event: PositionChangeEvent) => void;
    pressDurationInMs?: number;
    pressMoveThreshold?: number;
    shouldStopTouchMovePropagation?: boolean;
    tabIndex?: number;
    tapDurationInMs?: number;
    tapMoveThreshold?: number;
}

export interface ReactImageMagnifyProps extends Omit<
CursorPositionProps,
'activationInteractionMouse' | 'activationInteractionTouch' | 'children'
> {
    activationInteractionHint?: Interactions['click'] | Interactions['hover'];
    activationInteractionMouse?: Interactions['click'] | Interactions['hover'];
    activationInteractionTouch?: Interactions['press'] | Interactions['tap'] | Interactions['touch'];
    fadeDurationInMs?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hintComponent?: ComponentType<HintProps & any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hintProps?: HintProps & any;
    hoverDelayInMs?: number;
    hoverOffDelayInMs?: number;
    imageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    imageProps: ImageProps;
    lensComponent?: ForwardRefExoticComponent<LensProps>;
    lensProps?: LensProps;
    magnifyContainerProps?: MagnifyContainerProps;
    magnifiedImageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    magnifiedImageProps: MagnifiedImageProps;
    pressDuration?: number;
    pressMoveThreshold?: number;
    portalProps?: PortalProps;
    shouldHideHintAfterFirstActivation?: boolean;
    shouldUsePositiveSpaceLens?: boolean;
}
