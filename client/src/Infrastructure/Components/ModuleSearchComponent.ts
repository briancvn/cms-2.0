import { Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { IGridState } from '../Interfaces/IGridState';
import { DataCollection } from '../Models/DataCollection';
import { SearchCriteria } from '../Models/SearchCriteria';
import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';
import { GridColumnComponent } from './GridColumnComponent';

@Component({
    selector: 'module-search',
    templateUrl: './ModuleSearchComponent.html'
})
export class ModuleSearchComponent extends BaseComponent {
    @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;
    @Output() select: EventEmitter<string> = new EventEmitter<string>();

    constructor(commonService: CommonService, private dataCollection: DataCollection<SearchCriteria, any>) {
        super(commonService);
        this.subscribe(this.select.asObservable(), id => this.dataCollection.findById(id));
    }

    private dataSearchSubject: Subject<DataCollection<SearchCriteria, any>> = new Subject<DataCollection<SearchCriteria, any>>();
    dataSearchAsync = this.dataSearchSubject.asObservable();

    onGridChange(state: IGridState): void {
        this.dataCollection.search(state)
            .then(() => this.dataSearchSubject.next(this.dataCollection));
    }
}
