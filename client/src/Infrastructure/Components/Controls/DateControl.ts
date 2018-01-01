import { Component, ElementRef, forwardRef, Input, Optional, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

import { BaseControl } from './BaseControl';

@Component({
    selector: 'date-control',
    template: `
        <mat-form-field>
            <input matInput
                    spellcheck="false"
                    #innerElement
                    #innerNgModel="ngModel"
                    placeholder="{{ getPlaceholder() | translate }}"
                    [matDatepicker]="picker"
                    [disabled]="disabled"
                    [(ngModel)]="value"
                    (keypress)="onKeypress($event)"
                    (blur)="onBlur($event)"
                    (focus)="onFocus($event)" />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="innerNgModel.invalid">
                {{ getErrorMessage() | translate: EResource.Message }}
            </mat-error>
        </mat-form-field>`,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateControl), multi: true }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateControl extends BaseControl<Date> {
    @Input() type = 'text';

    constructor(@Optional() ngForm: NgForm, element: ElementRef, cdr: ChangeDetectorRef) {
        super(ngForm, element, cdr);
    }
}
