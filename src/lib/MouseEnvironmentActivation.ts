import { Activation, ActivationOptions } from 'src/lib/Activation';

export type { ActivationOptions as MouseActivationOptions };

export class MouseEnvironmentActivation extends Activation {
    mouseEntered(): void {
        throw new Error('NotYetImplemented');
    }

    mouseMoved(): void {
        throw new Error('NotYetImplemented');
    }

    mouseLeft(): void {
        throw new Error('NotYetImplemented');
    }

    mouseClicked(): void {
        throw new Error('NotYetImplemented');
    }
}
