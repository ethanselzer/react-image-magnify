import type {
    InputType,
    Interactions,
    MagnifiedImagePosition as MagnifiedImagePositionType,
} from 'src/types';

export const INPUT_TYPE: InputType = {
    mouse: 'mouse',
    touch: 'touch',
};

export const DEFAULT_PORTAL_ID = 'react-image-magnify-portal';

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

export const MagnifiedImagePosition: Record<`${Uppercase<MagnifiedImagePositionType>}`, MagnifiedImagePositionType> = {
    OVER: 'over',
    AUTO: 'auto',
    'AUTO-START': 'auto-start',
    'AUTO-END': 'auto-end',
    TOP: 'top',
    'TOP-START': 'top-start',
    'TOP-END': 'top-end',
    BOTTOM: 'bottom',
    'BOTTOM-START': 'bottom-start',
    'BOTTOM-END': 'bottom-end',
    RIGHT: 'right',
    'RIGHT-START': 'right-start',
    'RIGHT-END': 'right-end',
    LEFT: 'left',
    'LEFT-START': 'left-start',
    'LEFT-END': 'left-end',
};
