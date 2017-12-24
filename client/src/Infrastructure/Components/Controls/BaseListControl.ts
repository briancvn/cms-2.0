import { ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'underscore';

import { BaseControl } from './BaseControl';

export class BaseListControl<T> extends BaseControl<T> {
    @Input() list: any[] = [];
    @Input() protected vertical: boolean;
    @Input() protected textField: string;
    @Input() protected valueField: string;

    constructor(ngForm: NgForm, element: ElementRef) {
        super(ngForm, element);
    }

    protected getOptionValue(item: any): any {
        return _.isObject(item) ? item[this.valueField] : item;
    }

    protected getDisplayText(item?: any): string {
        if (!_.isObject(item)) {
            item = this.list.find(i => i[this.valueField] === item);
        }

        if (!item) {
            return '';
        }

        return item[this.textField];
    }
}
