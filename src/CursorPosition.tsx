import {
    HTMLProps,
    KeyboardEvent,
    MouseEvent as ReactMouseEvent,
    TouchEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import useResizeObserver from '@react-hook/resize-observer';

import {
    INTERACTIONS,
    MOUSE_EMULATION_GUARD_TIMER_NAME,
} from 'src/constants';
import { noop } from 'src/utils';
import { TouchActivation } from 'src/lib/TouchActivation';
import { HoverActivation } from 'src/lib/HoverActivation';
import { ClickActivation } from 'src/lib/ClickActivation';
import { TapActivation } from 'src/lib/TapActivation';
import { PressActivation } from 'src/lib/PressActivation';
import { RelativeCursorPositionObserver } from 'src/lib/RelativeCursorPositionObserver';
import { TouchEnvironmentActivation } from 'src/lib/TouchEnvironmentActivation';
import { MouseEnvironmentActivation } from 'src/lib/MouseEnvironmentActivation';
import type {
    ActivationChangeEvent,
    ContainerDimensions,
    DetectedInputType,
    Interactions,
    OnIsActiveChangedHandler,
    Point,
    PositionChangeEvent,
    TimerHandle,
} from 'src/types';

export type ChildProps = {
    isActive: boolean;
    isPositionOutside: boolean;
    elementDimensions: ContainerDimensions;
    position: Point;
};

// TODO remove RelativeCursorPositionObserver - it's not useful and just makes the package larger
export interface PropTypes extends HTMLProps<HTMLDivElement> {
    activationInteractionMouse: Interactions['click'] | Interactions['hover'];
    activationInteractionTouch: Interactions['press'] | Interactions['tap'] | Interactions['touch'];
    children: (props: ChildProps) => JSX.Element;
    hoverDelayInMs?: number;
    hoverOffDelayInMs?: number;
    isEnabled?: boolean;
    onActivationChanged?: (event: ActivationChangeEvent) => void;
    onDetectedEnvironmentChanged?: (detectedInputType: DetectedInputType) => void;
    onOutsideClick: (e: MouseEvent) => void;
    onPositionChanged?: (event: PositionChangeEvent) => void;
    pressDurationInMs?: number;
    pressMoveThreshold?: number;
    shouldStopTouchMovePropagation?: boolean;
    tabIndex?: number;
    tapDurationInMs?: number;
    tapMoveThreshold?: number;
    useCapture?: boolean;
}

// TODO move to utils
const getTouchActivationStrategy = (
    interaction: string,
    onIsActiveChanged: OnIsActiveChangedHandler,
    pressDurationInMs: number,
    pressMoveThreshold: number,
    tapDurationInMs: number,
    tapMoveThreshold: number,
): TouchEnvironmentActivation => {
    const {
        touch,
        tap,
        press,
    } = INTERACTIONS;

    switch (interaction) {
        case press:
            return new PressActivation({
                onIsActiveChanged,
                pressDurationInMs,
                pressMoveThreshold,
            });
        case tap:
            return new TapActivation({
                onIsActiveChanged,
                tapDurationInMs,
                tapMoveThreshold,
            });
        case touch:
            return new TouchActivation({
                onIsActiveChanged,
            });
        default:
            throw new Error('Must implement a touch activation strategy');
    }
};

const getMouseActivationStrategy = (
    interaction: string,
    onIsActiveChanged: OnIsActiveChangedHandler,
    hoverDelayInMs: number,
    hoverOffDelayInMs: number,
): MouseEnvironmentActivation => {
    const {
        hover,
        click,
    } = INTERACTIONS;

    switch (interaction) {
        case hover:
            return new HoverActivation({
                onIsActiveChanged,
                hoverDelayInMs,
                hoverOffDelayInMs,
            });
        case click:
            return new ClickActivation({
                onIsActiveChanged,
            });
        default:
            throw new Error('Must implement a mouse activation strategy');
    }
};

const getElementDimensions = (rect: DOMRectReadOnly): ContainerDimensions => {
    const {
        width,
        height,
    } = rect;

    return {
        width,
        height,
    };
};

const getIsPositionOutside = (pos: Point, elementDimensions: ContainerDimensions): boolean => {
    const { x, y } = pos;
    const {
        width,
        height,
    } = elementDimensions;

    return (
        x < 0
        || y < 0
        || x > width
        || y > height
    );
};

const getTouchEvent = (e: TouchEvent): Touch => e.touches[0] as Touch;

export const CursorPosition = (props: PropTypes): JSX.Element => {
    const {
        activationInteractionMouse,
        activationInteractionTouch,
        children,
        hoverDelayInMs = 250,
        hoverOffDelayInMs = 150,
        isEnabled = true,
        onActivationChanged = noop,
        onDetectedEnvironmentChanged = noop,
        onOutsideClick,
        onPositionChanged: onPositionChangedProp = noop,
        pressDurationInMs = 500,
        pressMoveThreshold = 5,
        shouldStopTouchMovePropagation = false,
        style,
        tabIndex = -1,
        tapDurationInMs = 180,
        tapMoveThreshold = 5,
        useCapture,
        ...rest
    } = props;

    ///
    /// Refs
    ///

    const observer = useRef(new RelativeCursorPositionObserver());
    const divRef = useRef<HTMLDivElement>(null);
    const timersRef = useRef<TimerHandle[]>([]);

    ///
    /// State
    ///

    const [elementDimensions, setElementDimensions] = useState<ContainerDimensions>({
        width: 0,
        height: 0,
    });
    const [
        shouldGuardAgainstMouseEmulationByDevices,
        setShouldGuardAgainstMouseEmulationByDevices,
    ] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPositionOutside, setIsPositionOutside] = useState<boolean>(true);
    const [position, setPosition] = useState<Point>({
        x: 0,
        y: 0,
    });

    ///
    /// Hooks
    ///
    useResizeObserver(divRef, (entry) => setElementDimensions(getElementDimensions(entry.contentRect)));

    // TODO remove / replace
    const handleIsActiveChanged = (event: ActivationChangeEvent): void => {
        setIsActive(event.isActive);
    };

    const [touchActivation, setTouchActivation] = useState<TouchEnvironmentActivation>(
        getTouchActivationStrategy(
            activationInteractionTouch,
            handleIsActiveChanged,
            pressDurationInMs,
            pressMoveThreshold,
            tapDurationInMs,
            tapMoveThreshold,
        ),
    );
    const [mouseActivation, setMouseActivation] = useState<MouseEnvironmentActivation>(
        getMouseActivationStrategy(
            activationInteractionMouse,
            handleIsActiveChanged,
            hoverDelayInMs,
            hoverOffDelayInMs,
        ),
    );

    ///
    /// Functions
    ///

    const unsetShouldGuardAgainstMouseEmulationByDevices = (): void => {
        timersRef.current.push({
            name: MOUSE_EMULATION_GUARD_TIMER_NAME,
            id: setTimeout(() => {
                setShouldGuardAgainstMouseEmulationByDevices(false);
            }, 0),
        });
    };

    const setPositionState = (newPosition: Point): void => {
        setIsPositionOutside(getIsPositionOutside(newPosition, elementDimensions));
        setPosition(newPosition);
    };

    const onMouseDetected = (): void => {
        onDetectedEnvironmentChanged({
            isTouchDetected: false,
            isMouseDetected: true,
        });
    };

    const handleTouchStart = (e: TouchEvent): void => {
        onDetectedEnvironmentChanged({
            isTouchDetected: true,
            isMouseDetected: false,
        });
        setShouldGuardAgainstMouseEmulationByDevices(true);

        const newPosition = observer.current.getCursorPosition(getTouchEvent(e));

        setPositionState(newPosition);

        touchActivation.touchStarted({ e, position: newPosition });
    };

    const handleMouseEnter = (e: ReactMouseEvent): void => {
        if (shouldGuardAgainstMouseEmulationByDevices) {
            return;
        }

        onMouseDetected();
        setPositionState(observer.current.getCursorPosition(e));
        mouseActivation.mouseEntered();
    };

    const handleTouchEnd = (): void => {
        touchActivation.touchEnded();
        unsetShouldGuardAgainstMouseEmulationByDevices();
        // TODO destroy?
    };

    const handleTouchCancel = (): void => {
        touchActivation.touchCanceled();
        unsetShouldGuardAgainstMouseEmulationByDevices();
        // TODO destroy?
    };

    const handleMouseLeave = (): void => {
        mouseActivation.mouseLeft();
        setIsPositionOutside(true);
        // TODO destroy?
    };

    const handleTouchMove = (e: TouchEvent): void => {
        const newPosition = observer.current.getCursorPosition(getTouchEvent(e));

        touchActivation.touchMoved({ e, position: newPosition });

        if (isActive) {
            setPositionState(newPosition);
            e.preventDefault();

            if (shouldStopTouchMovePropagation) {
                e.stopPropagation();
            }
        }
    };

    const handleMouseMove = (e: ReactMouseEvent): void => {
        const newPosition = observer.current.getCursorPosition(e);

        setPositionState(newPosition);
    };

    const handleClick = (e: ReactMouseEvent): void => {
        setPositionState(observer.current.getCursorPosition(e));
        mouseActivation.mouseClicked();
        onMouseDetected();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsActive(true);
    };

    const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsActive(false);
    };

    const onDocumentMouseClick = (e: MouseEvent): void => {
        const el = e.target;
        const isDescendantOfRoot = divRef.current && el instanceof Node && divRef.current.contains(el);

        if (!isDescendantOfRoot) {
            onOutsideClick(e);
        }
    };

    const removeEventListeners = (): void => {
        document.removeEventListener('click', onDocumentMouseClick);
    };

    ///
    /// Effects
    ///

    useEffect(() => {
        removeEventListeners();

        if (isEnabled) {
            document.addEventListener('click', onDocumentMouseClick, { capture: useCapture });
        }

        return (): void => removeEventListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);

    useEffect(() => {
        if (divRef.current) {
            observer.current.subject = divRef.current;

            // setElementDimensions(getElementDimensions(divRef.current));
        }
    }, [divRef]);

    useEffect(() => {
        onPositionChangedProp({
            isPositionOutside,
            position,
        });

        onActivationChanged({ isActive });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    useEffect(() => {
        onPositionChangedProp({
            isPositionOutside,
            position,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPositionOutside, position]);

    useEffect(() => {
        setTouchActivation(getTouchActivationStrategy(
            activationInteractionTouch,
            handleIsActiveChanged,
            pressDurationInMs,
            pressMoveThreshold,
            tapDurationInMs,
            tapMoveThreshold,
        ));
        setMouseActivation(getMouseActivationStrategy(
            activationInteractionMouse,
            handleIsActiveChanged,
            hoverDelayInMs,
            hoverOffDelayInMs,
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        activationInteractionMouse,
        activationInteractionTouch,
    ]);

    return (
        <div
            ref={divRef}
            role="button"
            style={{
                ...style,
                WebkitUserSelect: 'none',
            }}
            tabIndex={tabIndex}
            onClick={isEnabled ? handleClick : undefined}
            onKeyDown={isEnabled ? handleKeyDown : undefined}
            onKeyUp={isEnabled ? handleKeyUp : undefined}
            onMouseEnter={isEnabled ? handleMouseEnter : undefined}
            onMouseLeave={isEnabled ? handleMouseLeave : undefined}
            onMouseMove={isEnabled ? handleMouseMove : undefined}
            onTouchCancel={isEnabled ? handleTouchCancel : undefined}
            onTouchEnd={isEnabled ? handleTouchEnd : undefined}
            onTouchMove={isEnabled ? handleTouchMove : undefined}
            onTouchStart={isEnabled ? handleTouchStart : undefined}
            {...rest}
        >
            {children({
                isActive,
                isPositionOutside,
                elementDimensions,
                position,
            })}
        </div>
    );
};
