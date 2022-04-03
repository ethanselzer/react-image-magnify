/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Activation, ActivationOptions } from 'src/lib/Activation';
import type { TouchEvent } from 'src/types';

export type { ActivationOptions as TouchEnvironmentActivationOptions };

export class TouchEnvironmentActivation extends Activation {
    initialElTop: number;

    currentElTop: number;

    constructor(options: ActivationOptions) {
        super(options);

        this.initialElTop = 0;
        this.currentElTop = 0;
    }

    touchStarted(event: TouchEvent): void {
        throw new Error('NotYetImplemented');
    }

    touchMoved(event: TouchEvent): void {
        throw new Error('NotYetImplemented');
    }

    touchEnded(): void {
        this.deactivate();
    }

    touchCanceled(): void {
        this.deactivate();
    }
}
