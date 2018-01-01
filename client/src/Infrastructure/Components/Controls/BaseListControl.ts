import { ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";
import * as _ from 'underscore';

import { BaseControl } from './BaseControl';
import { CommonService } from '../../Services/CommonService';
import { EReferenceDataKind } from '../../Enums/EReferenceDataKind';
import { EResource } from '../../Enums/EResource';

export class BaseListControl<T> extends BaseControl<T> {
    @Input() list: any[] = [];
    @Input() protected referenceData: EReferenceDataKind;
    @Input() protected textField = "Text";
    @Input() protected valueField = "Code";

    listView: Observable<any[]>;

    constructor(ngForm: NgForm, element: ElementRef, cdr: ChangeDetectorRef, private commonService: CommonService) {
        super(ngForm, element, cdr);
    }

    getOptionValue(item: any): any {
        return _.isObject(item) ? item[this.valueField] : item;
    }

    getDisplayText(item?: any): string { 
        if (!_.isObject(item)) {
            item = this.list.find(i => i[this.valueField] === item);
        }

        if (!item) {
            return '';
        }

        return EReferenceDataKind[this.referenceData]
            ? `${EReferenceDataKind[this.referenceData]}.${item[this.textField]}`
            : item[this.textField];
    }

    getDisplayTextResource(): EResource { 
        return EReferenceDataKind[this.referenceData] ? EResource.ReferenceData : EResource.Common;
    }

    protected onInit(): void {
        super.onInit();
        this.listView = this.referenceData
            ? this.commonService.referenceDataService.observe(this.referenceData)
            : Observable.of(this.list);
    }

    protected afterViewInit(): void {
        super.afterViewInit();
        if (EReferenceDataKind[this.referenceData]) {
            this.commonService.resourceService.internalLoad();
        }
    }
}
