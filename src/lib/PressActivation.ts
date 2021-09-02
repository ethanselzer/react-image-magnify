import { PRESS_EVENT_TIMER_NAME } from 'src/constants';
import { TouchEnvironmentActivation, TouchEnvironmentActivationOptions } from 'src/lib/TouchEnvironmentActivation';
import type { Point, TouchEvent } from 'src/types';

export type PressActivationOptions = TouchEnvironmentActivationOptions & {
    pressDurationInMs: number;
    pressMoveThreshold: number;
};

export class PressActivation extends TouchEnvironmentActivation {
    pressDurationInMs: number;

    pressMoveThreshold: number;

    constructor(options: PressActivationOptions) {
        super({ onIsActiveChanged: options.onIsActiveChanged });

        this.pressDurationInMs = options.pressDurationInMs;
        this.pressMoveThreshold = options.pressMoveThreshold;
    }

    touchStarted(event: TouchEvent): void {
        this.initPressEventCriteria(event.position);
        this.setPressEventTimer();
    }

    touchMoved(event: TouchEvent): void {
        if (this.isActive) {
            return;
        }

        this.setPressEventCriteria(event.position);
    }

    setPressEventTimer(): void {
        this.timers.push({
            name: PRESS_EVENT_TIMER_NAME,
            id: setTimeout(() => {
                if (Math.abs(this.currentElTop - this.initialElTop) < this.pressMoveThreshold) {
                    this.activate();
                }
            }, this.pressDurationInMs),
        });
    }

    setPressEventCriteria(position: Point): void {
        this.currentElTop = position.y;
    }

    initPressEventCriteria(position: Point): void {
        const top = position.y;

        this.initialElTop = top;
        this.currentElTop = top;
    }
}
