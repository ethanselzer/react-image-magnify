import type { OnIsActiveChangedHandler, TimerHandle } from 'src/types';

export type ActivationOptions = {
    onIsActiveChanged: OnIsActiveChangedHandler;
};

export class Activation {
    isActive: boolean;

    onIsActiveChanged: OnIsActiveChangedHandler;

    timers: TimerHandle[];

    constructor(options: ActivationOptions) {
        this.onIsActiveChanged = options.onIsActiveChanged;
        this.isActive = false;
        this.timers = [];
    }

    activate(): void {
        this.isActive = true;
        this.onIsActiveChanged({ isActive: true });
    }

    deactivate(): void {
        this.isActive = false;
        this.onIsActiveChanged({ isActive: false });
        this.clearTimers();
    }

    toggleActivation(): void {
        if (this.isActive) {
            this.deactivate();
        } else {
            this.activate();
        }
    }

    clearTimers(): void {
        const { timers } = this;

        while (timers.length) {
            const timer = timers.pop();

            if (timer?.id) {
                // @ts-expect-error
                clearTimeout(timer.id);
            }
        }
    }

    clearTimer(timerName: string): void {
        this.timers.forEach((timer) => {
            if (timer.name === timerName) {
                // @ts-expect-error
                clearTimeout(timer.id);
            }
        });
    }
}
