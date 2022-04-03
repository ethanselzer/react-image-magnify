/* eslint-disable class-methods-use-this */
import { Activation, ActivationOptions } from 'src/lib/Activation';

export type { ActivationOptions as MouseActivationOptions };

export class MouseEnvironmentActivation extends Activation {
    mouseEntered(): void {
        // Do nothing
    }

    mouseMoved(): void {
        // Do nothing
    }

    mouseLeft(): void {
        // Do nothing
    }

    mouseClicked(): void {
        // Do nothing
    }
}
