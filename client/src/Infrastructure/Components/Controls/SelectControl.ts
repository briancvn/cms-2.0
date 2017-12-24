import { Component, ElementRef, forwardRef, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

import { BaseListControl } from './BaseListControl';

@Component({
    selector: 'select-control',
    template: `
        <mat-form-field>
            <mat-select #innerElement
                        #innerNgModel="ngModel"
                        [placeholder]="placeholder"
                        [disabled]="disabled"
                        [(ngModel)]="value"
                        (keypress)="onKeypress($event)"
                        (blur)="onBlur($event)"
                        (focus)="onFocus($event)">
                <mat-option *ngFor="let item of list" [value]="getOptionValue(item)">
                    {{ getDisplayText(item) }}
                </mat-option>
            </mat-select>
        </mat-form-field>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectControl),
        multi: true
    }]
})
export class SelectControl extends BaseListControl<string> {
    constructor(@Optional() ngForm: NgForm, element: ElementRef) {
        super(ngForm, element);
    }
}
