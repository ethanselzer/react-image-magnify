import type {
    CSSProperties,
    DetailedHTMLProps,
    HTMLProps,
    ImgHTMLAttributes,
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

export interface Lens extends HTMLProps<HTMLDivElement> {
    cursorOffset: Point;
    fadeDurationInMs?: number;
    isActive?: boolean;
    isPositionOutside?: boolean;
    position: Point;
    smallImage: StaticImageProps;
}

export interface HintPropTypes extends HTMLProps<HTMLDivElement> {
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

export interface MagnifyContainerProps extends Omit<HTMLProps<HTMLDivElement>, 'height' | 'width'>, MagnifyContainerDimensions {

}
