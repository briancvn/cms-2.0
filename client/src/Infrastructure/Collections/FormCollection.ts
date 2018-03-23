import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { compact, isEmpty } from 'lodash';
import * as _ from 'underscore';

import { Collection } from './Collection';

@Injectable()
export class FormCollection extends Collection<NgForm> {
    private forceDirty = false;

    get isEmpty(): boolean {
        return this.length === 0;
    }

    get isValid(): boolean {
        return this.every(form => form.valid);
    }

    get isDirty(): boolean {
        return this.forceDirty || this.some(form => form.dirty);
    }

    get isInvalid(): boolean {
        return this.some(form => form.invalid);
    }

    get isTouched(): boolean {
        return this.some(form => form.touched);
    }

    get hasError(): boolean {
        return this.some(form => {
            return Object.keys(form.controls).some(ctrlName => form.controls[ctrlName].touched && !isEmpty(form.controls[ctrlName].errors));
        });
    }

    add(...forms: NgForm[]): void {
        forms = compact(forms);
        this.push(...forms);
    }

    remove(removeForm: NgForm): void {
        this.splice(_.findIndex(this, form => form.name === removeForm.name), 1);
    }

    reset(): void {
        super.reset();
        this.forceDirty = false;
    }

    markAsDirty(): void {
        this.forEach(form => form.control.markAsDirty());
        this.forceDirty = true;
    }
}
