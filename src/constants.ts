import type { MagnifiedImagePosition, InputType, Interactions } from 'src/types';

export const INPUT_TYPE: InputType = {
    mouse: 'mouse',
    touch: 'touch',
};

export const MAGNIFIED_IMAGE_POSITION: MagnifiedImagePosition = {
    over: 'over',
    beside: 'beside',
};

export const PRESS_EVENT_TIMER_NAME = 'pressEvent';
export const TAP_GESTURE_TIMER_NAME = 'tap';
export const MOUSE_EMULATION_GUARD_TIMER_NAME = 'mouseEmulation';
export const SET_ACTIVATION_TIMER_NAME = 'setHovering';
export const UNSET_ACTIVATION_TIMER_NAME = 'unsetHovering';

export const INTERACTIONS: Interactions = {
    touch: 'touch',
    tap: 'tap',
    press: 'press',
    click: 'click',
    hover: 'hover',
    doubleTap: 'double_tap',
};

export const DEFAULT_MAGNIFY_CONTAINER_HEIGHT = '100%';
export const DEFAULT_MAGNIFY_CONTAINER_WIDTH = '100%';
