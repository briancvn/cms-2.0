import { Component, Input } from '@angular/core';

import { SpinnerService } from '../Services/SpinnerService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'spinner',
    template: `
        <div *ngIf="visible" class="spinner-overlay" fxLayout="row" fxLayoutAlign="space-around center">
            <mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner>
        </div>
        <ng-content></ng-content>`,
    styleUrls: ['../Styles/Components/Spinner.scss']
})
export class SpinnerComponent extends BaseComponent {
    @Input() id: string;

    visible = false;

    constructor(private spinnerService: SpinnerService) {
        super();
    }

    protected onInit(): void {
        this.spinnerService.register(this);
    }
}
