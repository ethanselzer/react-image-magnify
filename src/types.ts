import type {
    DetailedHTMLProps,
    HTMLProps,
    ImgHTMLAttributes,
    TouchEvent as ReactTouchEvent,
} from 'react';

export type Interactions = {
    touch: 'touch',
    tap: 'tap',
    doubleTap: 'double_tap',
    press: 'press',
    click: 'click',
    hint: 'hint',
    hover: 'hover',
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

export type EnlargedImagePosition = {
    over: 'over',
    beside: 'beside',
};

export type InputType = {
    mouse: 'mouse',
    touch: 'touch',
};

export type Point = {
    x: number,
    y: number,
};

export type ContainerDimensions = {
    height: number;
    width: number;
};

export type EnlargedImageContainerDimensions = {
    height: number | string;
    width: number | string;
};

export interface FluidSmallImageShape extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'height' | 'width'> {
    height: undefined;
    isFluidWidth: true,
    width: undefined;
}

export interface StaticSmallImageShape extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'height' | 'width'> {
    height: number;
    isFluidWidth: false,
    width: number;
}

export type LargeImageShape = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    height: number;
    width: number;
};

export type SmallImageShape = FluidSmallImageShape | StaticSmallImageShape;

export interface Lens extends HTMLProps<HTMLDivElement> {
    cursorOffset: Point,
    fadeDurationInMs?: number,
    isActive?: boolean
    isPositionOutside?: boolean,
    position: Point,
    smallImage: StaticSmallImageShape,
}

export interface HintPropTypes extends HTMLProps<HTMLDivElement> {
    isMouseDetected?: boolean;
    isTouchDetected?: boolean;
    hintTextMouse: string;
    hintTextTouch: string;
}
