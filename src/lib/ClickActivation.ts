import { MouseEnvironmentActivation } from 'src/lib/MouseEnvironmentActivation';

export class ClickActivation extends MouseEnvironmentActivation {
    mouseClicked(): void {
        this.toggleActivation();
    }
}
