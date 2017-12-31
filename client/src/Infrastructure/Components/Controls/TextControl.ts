import { Component, ElementRef, forwardRef, Input, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

import { BaseControl } from './BaseControl';

@Component({
    selector: 'text-control',
    template: `
        <mat-form-field>
            <input matInput
                    spellcheck="false"
                    #innerElement
                    #innerNgModel="ngModel"
                    placeholder="{{ 'Field.' + placeholder | translate }}"
                    [type]="type"
                    [disabled]="disabled"
                    [(ngModel)]="value"
                    (keypress)="onKeypress($event)"
                    (blur)="onBlur($event)"
                    (focus)="onFocus($event)" />
            <ng-content></ng-content>
            <mat-error *ngIf="innerNgModel.invalid">
                {{ 'Validation.' + getErrorMessage() | translate: EResource.Message }}
            </mat-error>
        </mat-form-field>`,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextControl), multi: true }
    ]
})
export class TextControl extends BaseControl<string> {
    @Input() type = 'text';

    constructor(@Optional() ngForm: NgForm, element: ElementRef) {
        super(ngForm, element);
    }
}
