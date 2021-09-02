import { TouchEnvironmentActivation } from 'src/lib/TouchEnvironmentActivation';
import type { TouchEvent } from 'src/types';

export class TouchActivation extends TouchEnvironmentActivation {
    touchStarted(event: TouchEvent): void {
        event.e.preventDefault();
        this.activate();
    }
}
