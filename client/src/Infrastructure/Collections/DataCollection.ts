import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { IGridState } from '../Interfaces/IGridState';
import { SearchCriteria } from '../Models/SearchCriteria';
import { BaseSearchService } from '../Services/BaseSearchService';
import { Collection } from './Collection';

@Injectable()
export class DataCollection<TCriteria extends SearchCriteria, TResult> extends Collection<TResult> {
    total: number;
    model: TResult;

    constructor(public criteria: TCriteria, protected searchService: BaseSearchService<TCriteria, TResult>) {
        super();
    }

    setCriteria(state: IGridState): void {
        _.extend(this.criteria, state);
    }

    search(state?: IGridState): Promise<void> {
        this.setCriteria(state);
        return this.searchService.search<TResult>(this.criteria)
            .then(reply => {
                this.total = reply.Total;
                this.reset(reply.Results);
            });
    }

    findById(id: string): void {
        this.searchService.findById(id)
            .then(model => this.model = model);
    }
}
