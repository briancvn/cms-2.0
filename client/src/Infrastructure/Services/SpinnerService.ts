import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { SpinnerComponent } from '../Components/SpinnerComponent';

@Injectable()
export class SpinnerService {
    private spinners: {[id: string]: SpinnerComponent} = {};

    register(component: SpinnerComponent): void {
        this.spinners[component.id] = component;
    }

    show(id: string): void {
        if (!_.isEmpty(id)) {
            this.spinners[id].visible = true;
        }
    }

    hide(id: string): void {
        if (!_.isEmpty(id)) {
            this.spinners[id].visible = false;
        }
    }

    hideAll(): void {
        Object.keys(this.spinners).forEach(this.hide.bind(this));
    }
}
