import { Injectable, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { compact, isEmpty } from 'lodash';
import { Subject } from 'rxjs/Rx';
import * as _ from 'underscore';

import { CommonConstants } from '../Constants/CommonConstants';

@Injectable()
export class FormCollection extends Array<NgForm> {
    public onErrorChanged: Subject<void> = new Subject<void>();
    private forceDirty = false;

    constructor(@Optional() ...forms: NgForm[]) {
        super();
        this.add(...forms);
        this.registerFormErrorChanged(this);
    }

    registerFormErrorChanged = (forms: NgForm[]): void => {
        forms.forEach(form => form[CommonConstants.FormErrorChanged] && form[CommonConstants.FormErrorChanged].asObservable().subscribe(status => {
            this.onErrorChanged.next(status);
        }));
    }

    getByName = (name: string): NgForm => {
        return this.find(form => form.name === name);
    }

    add = (...forms: NgForm[]): void => {
        forms = compact(forms);
        this.registerFormErrorChanged(forms);
        this.push(...forms);
    }

    remove = (removeForm: NgForm): void => {
        this.splice(_.findIndex(this, form => form.name === removeForm.name), 1);
    }

    reset = (): void => {
        this.splice(0, this.length);
        this.forceDirty = false;
    }

    dirty = (): void => {
        this.forceDirty = true;
    }

    isEmpty = (): boolean => {
        return this.length === 0;
    }

    isValid = (): boolean => {
        return this.every(form => form.valid);
    }

    isDirty = (): boolean => {
        return this.forceDirty || this.some(form => form.dirty);
    }

    isInvalid = (): boolean => {
        return this.some(form => form.invalid);
    }

    isTouched = () : boolean => {
        return this.some(form => form.touched);
    }

    hasError = () : boolean => {
        return this.some(form => {
            let controls = Object.keys(form.controls);
            return controls.some(ctrlName => form.controls[ctrlName].touched && !isEmpty(form.controls[ctrlName].errors));
        });
    }
}
