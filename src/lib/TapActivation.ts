import { TAP_GESTURE_TIMER_NAME } from 'src/constants';
import { TouchEnvironmentActivation, TouchEnvironmentActivationOptions } from 'src/lib/TouchEnvironmentActivation';
import type { Point, TouchEvent } from 'src/types';

export type TapActivationOptions = TouchEnvironmentActivationOptions & {
    tapDurationInMs: number;
    tapMoveThreshold: number;
};

export class TapActivation extends TouchEnvironmentActivation {
    hasTapGestureEnded: boolean;

    tapDurationInMs: number;

    tapMoveThreshold: number;

    constructor(options: TapActivationOptions) {
        super({ onIsActiveChanged: options.onIsActiveChanged });

        this.hasTapGestureEnded = false;
        this.tapDurationInMs = options.tapDurationInMs;
        this.tapMoveThreshold = options.tapMoveThreshold;
    }

    touchStarted(event: TouchEvent): void {
        this.hasTapGestureEnded = false;
        this.initMoveThreshold(event.position);
        this.setTapEventTimer();
    }

    touchMoved(event: TouchEvent): void {
        if (this.isActive) {
            return;
        }

        this.setMoveThresholdCriteria(event.position);
    }

    touchEnded(): void {
        this.hasTapGestureEnded = true;
    }

    get hasPassedMoveThreshold(): boolean {
        return Math.abs(this.currentElTop - this.initialElTop) > this.tapMoveThreshold;
    }

    get isTapGestureActive(): boolean {
        return !this.hasPassedMoveThreshold && this.hasTapGestureEnded;
    }

    setTapEventTimer(): void {
        this.timers.push({
            name: TAP_GESTURE_TIMER_NAME,
            id: setTimeout(() => {
                if (this.isTapGestureActive) {
                    this.toggleActivation();
                }
            }, this.tapDurationInMs),
        });
    }

    setMoveThresholdCriteria(position: Point): void {
        this.currentElTop = position.y;
    }

    initMoveThreshold(position: Point): void {
        const top = position.y;

        this.initialElTop = top;
        this.currentElTop = top;
    }
}
