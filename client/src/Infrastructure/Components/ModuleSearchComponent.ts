import { Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { DataCollection } from '../Collections/DataCollection';
import { IGridState } from '../Interfaces/IGridState';
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

    private dataSearchSubject: Subject<DataCollection<SearchCriteria, any, any, any>> = new Subject<DataCollection<SearchCriteria, any, any, any>>();
    public dataSearchAsync = this.dataSearchSubject.asObservable();

    constructor(commonService: CommonService, private dataCollection: DataCollection<SearchCriteria, any, any, any>) {
        super(commonService);
        this.subscribe(this.select.asObservable(), id => this.dataCollection.findById(id));
    }

    public onGridChange(state: IGridState): void {
        this.dataCollection.search(state)
            .then(() => this.dataSearchSubject.next(this.dataCollection));
    }
}
