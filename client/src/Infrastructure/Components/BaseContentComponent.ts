import { AfterViewInit, OnInit } from '@angular/core';

import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

export class BaseContentComponent extends BaseComponent implements OnInit, AfterViewInit {
    constructor(commonService: CommonService) {
        super(commonService);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.loadResource();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.loadReferenceData();
    }

    private loadReferenceData(): Promise<any> {
        return Promise.all([this.commonService.referenceDataService.internalLoad()])
            .then(r => this.commonService.referenceDataService.notifyLoaded());
    }

    private loadResource(): Promise<any> {
        return Promise.all([this.commonService.resourceService.internalLoad()])
            .then(r => this.commonService.resourceService.notifyLoaded());
    }
}
