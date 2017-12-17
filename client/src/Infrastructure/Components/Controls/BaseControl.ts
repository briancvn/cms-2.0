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
    @Input() required;

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

    constructor(public form: NgForm, protected element: ElementRef) {}

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
}
