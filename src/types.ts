import type {
    ComponentType,
    CSSProperties,
    DetailedHTMLProps,
    ForwardRefExoticComponent,
    HTMLProps,
    ImgHTMLAttributes,
    MemoExoticComponent,
    TouchEvent as ReactTouchEvent,
} from 'react';

export type Interactions = {
    touch: 'touch';
    tap: 'tap';
    doubleTap: 'double_tap';
    press: 'press';
    click: 'click';
    hover: 'hover';
}

export type OnIsActiveChangedHandler = (event: ActivationChangeEvent) => void;

export type TimerHandle = {
    name: string;
    id: number | NodeJS.Timeout;
};

export type DetectedInputType = {
    isMouseDetected: boolean;
    isTouchDetected: boolean;
};

export type ActivationChangeEvent = {
    isActive: boolean;
};

export type PositionChangeEvent = {
    isPositionOutside: boolean;
    position: Point;
};

export type TouchEvent = {
    e: ReactTouchEvent;
    position: Point;
};

export type MagnifiedImagePosition = {
    over: 'over';
    beside: 'beside';
};

export type InputType = {
    mouse: 'mouse';
    touch: 'touch';
};

export type Point = {
    x: number;
    y: number;
};

export type ContainerDimensions = {
    height: number;
    width: number;
};

export type MagnifyContainerDimensions = {
    height: number | string;
    width: number | string;
};

export type BaseImageProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement >, 'height' | 'width'>;

export type FluidImageProps = BaseImageProps & {
    height?: string;
    width?: string;
}

export type StaticImageProps = BaseImageProps & {
    height: number;
    width: number;
}

export type MagnifiedImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    height: number;
    width: number;
};

export type ImageProps = FluidImageProps | StaticImageProps;

export interface LensProps extends HTMLProps<HTMLDivElement> {
    cursorOffset: Point;
    fadeDurationInMs?: number;
    isActive?: boolean;
    isPositionOutside?: boolean;
    position: Point;
    smallImage: StaticImageProps;
}

export interface HintProps extends HTMLProps<HTMLDivElement> {
    isMouseDetected?: boolean;
    isTouchDetected?: boolean;
    hintTextMouse: string;
    hintTextTouch: string;
}

export type PortalProps = {
    className?: string;
    id: string;
    style?: CSSProperties;
    enableForTouch?: boolean;
};

export interface MagnifyContainerProps extends Omit<HTMLProps<HTMLDivElement>, 'height' | 'width'>, MagnifyContainerDimensions {}

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
    hintComponent?: ComponentType<HintProps>
    | ForwardRefExoticComponent<HintProps>
    | MemoExoticComponent<ComponentType<HintProps>
    | ForwardRefExoticComponent<HintProps>>;
    hintProps?: HintProps;
    hoverDelayInMs?: number;
    hoverOffDelayInMs?: number;
    imageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    imageProps: ImageProps;
    lensComponent?: ComponentType<LensProps>;
    lensProps?: LensProps;
    magnifyContainerProps?: MagnifyContainerProps;
    magnifiedImageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    magnifiedImagePosition?: MagnifiedImagePosition['beside'] | MagnifiedImagePosition['over'];
    magnifiedImageProps: MagnifiedImageProps;
    pressDuration?: number;
    pressMoveThreshold?: number;
    portalProps?: PortalProps;
    shouldHideHintAfterFirstActivation?: boolean;
    shouldUsePositiveSpaceLens?: boolean;
}
