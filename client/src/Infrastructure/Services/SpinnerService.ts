import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { SpinnerComponent } from '../Components/SpinnerComponent';

@Injectable()
export class SpinnerService {
    private spinner: {[id: string]: SpinnerComponent} = {};

    register(component: SpinnerComponent): void {
        this.spinner[component.id] = component;
    }

    show(id: string): void {
        if (!_.isEmpty(id)) {
            this.spinner[id].visible = true;
        }
    }

    hide(id: string): void {
        if (!_.isEmpty(id)) {
            this.spinner[id].visible = false;
        }
    }
}
