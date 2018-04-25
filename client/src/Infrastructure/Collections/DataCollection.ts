import * as _ from 'underscore';

import { IGridState } from '../Interfaces/IGridState';
import { SearchCriteria } from '../Models/SearchCriteria';
import { BaseSearchService } from '../Services/BaseSearchService';
import { Collection } from './Collection';
import { SearchCollection } from '../Models/SearchCollection';

export class DataCollection<TCriteria extends SearchCriteria,
    TSearchCollection extends SearchCollection<any>,
    TResult,
    TDetail> extends Collection<TResult> {
    public total: number;
    public model: TDetail;

    constructor(public criteria: TCriteria, protected searchService: BaseSearchService<TCriteria, TSearchCollection, TDetail>) {
        super();
    }

    setCriteria(state: IGridState): void {
        _.extend(this.criteria, state);
    }

    search(state?: IGridState): Promise<void> {
        this.setCriteria(state);
        return this.searchService.search(this.criteria)
            .then(reply => {
                this.total = reply.Total;
                this.reset(reply.Results);
            });
    }

    findById(id: string): void {
        this.searchService.findById(id)
            .then(model => {
                this.model = model;
            });
    }
}
