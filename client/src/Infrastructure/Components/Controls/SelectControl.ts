import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

import { BaseListControl } from './BaseListControl';
import { CommonService } from '../../Services/CommonService';

@Component({
    selector: 'select-control',
    template: `
        <mat-form-field>
            <mat-select #innerElement
                        #innerNgModel="ngModel"
                        placeholder="{{ placeholderKey | translate }}"
                        [disabled]="disabled"
                        [(ngModel)]="value"
                        (keypress)="onKeypress($event)"
                        (blur)="onBlur($event)"
                        (focus)="onFocus($event)">
                <mat-option *ngFor="let item of listView | async" [value]="getOptionValue(item)">
                    {{ getDisplayText(item) | translate: getDisplayTextResource() }}
                </mat-option>
            </mat-select>
            <mat-error *ngIf="innerNgModel.invalid">
                {{ errorMessage | translate: EResource.Message | stringFormat: controlName }}
            </mat-error>
        </mat-form-field>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectControl),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectControl extends BaseListControl<string> {
    constructor(@Optional() ngForm: NgForm, element: ElementRef, cdr: ChangeDetectorRef, commonService: CommonService) {
        super(ngForm, element, cdr, commonService);
    }
}
