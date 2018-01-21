import { AfterViewInit, ChangeDetectorRef, ElementRef, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

import { EReferenceDataKind } from '../../Enums/EReferenceDataKind';
import { EResource } from '../../Enums/EResource';
import { ReferenceDataService } from '../../Services/ReferenceDataService';
import { ResourceService } from '../../Services/ResourceService';
import { BaseControl } from './BaseControl';

export class BaseListControl<T> extends BaseControl<T> implements OnInit, AfterViewInit {
    @Input() list: any[] = [];
    @Input() protected referenceData: EReferenceDataKind;
    @Input() protected textField = "Text";
    @Input() protected valueField = "Code";

    listView: Observable<any[]>;

    constructor(ngForm: NgForm,
        element: ElementRef,
        cdr: ChangeDetectorRef,
        private referenceDataService: ReferenceDataService,
        private resourceService: ResourceService
    ) {
        super(ngForm, element, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.listView = this.referenceData
            ? this.referenceDataService.observe(this.referenceData)
            : Observable.of(this.list);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (EReferenceDataKind[this.referenceData]) {
            this.resourceService.internalLoad();
        }
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
}
