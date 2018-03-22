import { Observable } from 'rxjs/Rx';

import { IGridState } from '../Interfaces/IGridState';
import { ISearchResult } from '../Interfaces/ISearchResult';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';
import { SearchCriteria } from '../Models/SearchCriteria';
import { SearchResult } from '../Models/SearchResult';

export abstract class BaseSearchService<TCriteria, TResult> extends BaseBackendService {
    constructor(http: HttpClientService, apiUrl: string) {
        super(http, apiUrl);
    }

    search<User>(criteria: TCriteria): Promise<SearchResult<TResult>> {
        return this.post<SearchResult<TResult>>({
            Method: 'Search',
            Body: criteria
        });
    }

    findById(id: string): Promise<TResult> {
        return this.get<TResult>({ Url: `FindById?id=${id}` });
    }
}
