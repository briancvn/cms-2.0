import { ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";
import * as _ from 'underscore';

import { BaseControl } from './BaseControl';
import { CommonService } from '../../Services/CommonService';
import { EReferenceDataKind } from '../../Enums/EReferenceDataKind';

export class BaseListControl<T> extends BaseControl<T> {
    @Input() list: any[] = [];
    @Input() protected referenceData: EReferenceDataKind;
    @Input() protected textField = "Text";
    @Input() protected valueField = "Code";

    listView: Observable<any[]>;

    constructor(ngForm: NgForm, element: ElementRef, private commonService: CommonService) {
        super(ngForm, element);
    }

    protected onInit(): void {
        super.onInit();
        this.listView = this.referenceData
            ? this.commonService.referenceDataService.observe(this.referenceData)
            : Observable.of(this.list);
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
