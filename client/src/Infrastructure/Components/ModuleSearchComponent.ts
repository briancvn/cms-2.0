import { Component, ContentChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { IGridState } from '../Interfaces/IGridState';
import { ISearchResult } from '../Interfaces/ISearchResult';
import { BaseSearchService } from '../Services/BaseSearchService';
import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';
import { SearchFieldComponent } from './SearchFieldComponent';

@Component({
    selector: 'module-search',
    templateUrl: './ModuleSearchComponent.html'
})
export class ModuleSearchComponent extends BaseComponent {
    @ContentChildren(SearchFieldComponent) fields: QueryList<SearchFieldComponent>;

    constructor(commonService: CommonService, private searchService: BaseSearchService) {
        super(commonService);
    }

    private dataSearchSubject: Subject<ISearchResult<any>> = new Subject<ISearchResult<any>>();
    dataSearchAsync = this.dataSearchSubject.asObservable();

    onGridChange(state: IGridState): void {
        this.searchService.search<any>(state)
            .then(results => this.dataSearchSubject.next(results));
    }

}
