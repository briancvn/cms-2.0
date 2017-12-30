import {
    AfterViewChecked,
    AfterViewInit,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgForm, NgModel } from '@angular/forms';
import * as _ from 'underscore';

import { ErrorMessageConstants } from '../../Constants/ErrorMessageConstants';
import { StringUtils } from '../../Utils/StringUtils';

const noop = () => {};

export abstract class BaseControl<TValue> implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy, ControlValueAccessor {
    @HostBinding('class') class = 'form-control';

    @ViewChild('innerElement') protected innerElement: ElementRef;
    @ViewChild('innerNgModel') protected innerNgModel: NgModel;

    @Output() private focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() private keypress: EventEmitter<void> = new EventEmitter<void>();

    @Input() placeholder: string;
    @Input() tab: number;
    @Input() disabled: boolean;
    @Input() readOnly: boolean;

    focused: boolean;

    private _value: TValue;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChangeCallback(v);
        }
    }

    constructor(public form: NgForm, protected element: ElementRef) {
        this.form.addControl = this.addControl.bind(this, this.form.addControl.bind(this.form));
    }

    focusControl(): boolean {
        if (!this.disabled && !this.readOnly) {
            this.element.nativeElement.focus();
            return true;
        }
        return false;
    }

    ngOnInit(): void {
        this.onInit();
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngAfterViewChecked(): void {
        this.afterViewChecked();
    }

    ngOnDestroy(): void {
        this.onDestroy();
    }

    writeValue(v: any): void {
        this.value = v;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onBlur(event: FocusEvent): void {
        this.focused = false;
    }

    onFocus(event: FocusEvent): void {
        this.focused = true;
        this.focus.next();
    }

    onKeypress(event: KeyboardEvent): void {
        this.keypress.next();
    }

    protected getErrorMessage(): string {
        let message;
        if (!_.isEmpty(this.innerNgModel.errors)) {
            let key = Object.keys(this.innerNgModel.errors).find(key => this.innerNgModel.errors[key]);
            message = StringUtils.formatString(ErrorMessageConstants.DEFAULT_MESSAGE[key], this.placeholder)
                || StringUtils.formatString(ErrorMessageConstants.MESSAGE_UNDEFINED, this.placeholder, key);
        }
        return message;
    }

    protected onInit(): void {
        // Virtual method
    }

    protected afterViewInit(): void {
        // Virtual method
    }

    protected afterViewChecked(): void {
        // Virtual method
    }

    protected onDestroy(): void {
        // Virtual method
    }

    private addControl(addControl: Function, ngModel: NgModel): void {
        if (ngModel.name === this.element.nativeElement.getAttribute('name')) {
            this.innerNgModel.control.setValidators(ngModel.validator);
            this.innerNgModel.control.setAsyncValidators(ngModel.asyncValidator);
            this.innerNgModel.control.setErrors(ngModel.errors);
        }
        addControl(ngModel);
    }
}
