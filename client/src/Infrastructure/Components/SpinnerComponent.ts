import { Component, Input, OnInit } from '@angular/core';

import { CommonService } from '../Services/CommonService';
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
export class SpinnerComponent extends BaseComponent implements OnInit {
    @Input() id: string;

    public visible = false;

    constructor(commonService: CommonService, private spinnerService: SpinnerService) {
        super(commonService);
    }

    public ngOnInit(): void {
        this.spinnerService.register(this);
    }
}
