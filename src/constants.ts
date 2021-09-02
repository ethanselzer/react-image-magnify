import type { EnlargedImagePosition, InputType, Interactions } from 'src/types';

export const INPUT_TYPE: InputType = {
    mouse: 'mouse',
    touch: 'touch',
};

export const ENLARGED_IMAGE_POSITION: EnlargedImagePosition = {
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
    hint: 'hint',
    hover: 'hover',
    doubleTap: 'double_tap',
};
