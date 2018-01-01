import { Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, NgModel } from '@angular/forms';
import * as _ from 'underscore';

import { BaseControl } from './BaseControl';

@Component({
    selector: 'password-control',
    template: `
        <mat-form-field>
            <mat-icon matPrefix (click)="hide = !hide">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
            <input matInput
                    #innerElement
                    #innerNgModel="ngModel"
                    placeholder="{{ placeholderKey | translate }}"
                    [type]="hide ? 'password' : 'text'"
                    [disabled]="disabled"
                    [(ngModel)]="value"
                    (blur)="onBlur($event)"
                    (focus)="onFocus($event)"
                    maxlength="50"
                    spellcheck="false"
                    required />
            <mat-error *ngIf="innerNgModel.invalid">
                {{ errorMessage | translate: EResource.Message | stringFormat: controlName }}
            </mat-error>
        </mat-form-field>
        <div class="btn-forgot-password">
            <button *ngIf="!this.focused && showForgotPassword" class="btn-link" (click)="event.stopPropagation() && forgotPasswordClick()">
                {{ 'Forgot_Password_Text' | translate }}
            </button>
            <ng2-password-strength-bar *ngIf="!showForgotPassword" [passwordToCheck]="value"></ng2-password-strength-bar>
        </div>`,
    styleUrls: ['../../Styles/Components/Controls/Password.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PasswordControl),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordControl extends BaseControl<string> {
    @Input() ngModel: NgModel;
    @Input() forgotPassword: boolean;
    @Output() onForgotPasswordClick: EventEmitter<void> = new EventEmitter<void>();

    hide = true;

    get showForgotPassword(): boolean {
        return !_.isUndefined(this.forgotPassword);
    }

    constructor(@Optional() ngForm: NgForm, element: ElementRef, cdr: ChangeDetectorRef) {
        super(ngForm, element, cdr);
    }

    forgotPasswordClick(): void {
        this.onForgotPasswordClick.next();
    }
}
