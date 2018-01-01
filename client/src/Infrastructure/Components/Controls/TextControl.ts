import { Component, ElementRef, forwardRef, Input, Optional, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
                    placeholder="{{ getPlaceholder() | translate }}"
                    [type]="type"
                    [disabled]="disabled"
                    [(ngModel)]="value"
                    (keypress)="onKeypress($event)"
                    (blur)="onBlur($event)"
                    (focus)="onFocus($event)" />
            <ng-content></ng-content>
            <mat-error *ngIf="innerNgModel.invalid">
                {{ getErrorMessage() | translate: EResource.Message }}
            </mat-error>
        </mat-form-field>`,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextControl), multi: true }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextControl extends BaseControl<string> {
    @Input() type = 'text';

    constructor(@Optional() ngForm: NgForm, element: ElementRef, cdr: ChangeDetectorRef) {
        super(ngForm, element, cdr);
    }
}
