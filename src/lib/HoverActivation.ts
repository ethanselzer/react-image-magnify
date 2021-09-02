import { SET_ACTIVATION_TIMER_NAME, UNSET_ACTIVATION_TIMER_NAME } from 'src/constants';
import { MouseActivationOptions, MouseEnvironmentActivation } from 'src/lib/MouseEnvironmentActivation';

export type HoverActivationOptions = MouseActivationOptions & {
    hoverDelayInMs: number;
    hoverOffDelayInMs: number;
};

export class HoverActivation extends MouseEnvironmentActivation {
    hoverDelayInMs: number;

    hoverOffDelayInMs: number;

    constructor(options: HoverActivationOptions) {
        super({ onIsActiveChanged: options.onIsActiveChanged });

        this.hoverDelayInMs = options.hoverDelayInMs;
        this.hoverOffDelayInMs = options.hoverOffDelayInMs;
    }

    mouseEntered(): void {
        this.clearTimers();
        this.schedulActivation(this.hoverDelayInMs);
    }

    mouseLeft(): void {
        this.clearTimers();
        this.scheduleDeactivation(this.hoverOffDelayInMs);
    }

    schedulActivation(schedule: number): void {
        const scheduleId = setTimeout(() => {
            this.activate();
        }, schedule);

        this.timers.push({
            id: scheduleId,
            name: SET_ACTIVATION_TIMER_NAME,
        });
    }

    scheduleDeactivation(schedule: number): void {
        const scheduleId = setTimeout(() => {
            this.deactivate();
        }, schedule);

        this.timers.push({
            id: scheduleId,
            name: UNSET_ACTIVATION_TIMER_NAME,
        });
    }
}
