import { Component, OnInit } from '@angular/core';

import { DataCollection } from '../Collections/DataCollection';
import { SearchCriteria } from '../Models/SearchCriteria';
import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'module-detail',
    template: `
        <div>
            TEST DETAIL
            <ng-content></ng-content>
        </div>`
})
export class ModuleDetailComponent extends BaseComponent implements OnInit {
    constructor(commonService: CommonService, public dataCollection: DataCollection<SearchCriteria, any>) {
        super(commonService);
    }
}
