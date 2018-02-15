import { Collection } from './Collection';
import { BaseCriteria } from './BaseCriteria';
import { ISearchResult } from '../Interfaces/ISearchResult';
import { BaseSearchService } from '../Services/BaseSearchService';
import { CommonConstants } from '../Constants/CommonConstants';

export abstract class DataCollection<TCriteria extends BaseCriteria, TResult> extends Collection<TResult> {
    total: number;
    totalPage: number;

    constructor(public criteria: TCriteria, protected searchService: BaseSearchService) {
        super();
    }

    search = (): void => {
        this.searchService.search<TResult>(this.criteria)
            .then(reply => {
                this.total = reply.total_count;
                this.totalPage = Math.ceil(this.total / CommonConstants.PAGE_SIZE);
                this.push(...reply.items);
            });
    }

    next = (): void => {
        this.criteria.PageIndex++;
        this.search();
    }

    previous = (): void => {
        this.criteria.PageIndex--;
        this.search();
    }

    first = (): void => {
        this.criteria.PageIndex = 0;
        this.search();
    }

    last = (): void => {
        this.criteria.PageIndex = this.totalPage;
        this.search();
    }

    hasPrevious = (): boolean => {
        return this.criteria.PageIndex > 0;
    }

    hasNext = (): boolean => {
        return this.total > this.length;
    }
}
