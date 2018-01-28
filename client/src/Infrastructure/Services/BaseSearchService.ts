import { Observable } from 'rxjs/Rx';

import { IGridState } from '../Interfaces/IGridState';
import { ISearchResult } from '../Interfaces/ISearchResult';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';

export abstract class BaseSearchService extends BaseBackendService {
    abstract search<T>(state: IGridState): Promise<ISearchResult<T>>;

    constructor(http: HttpClientService, apiUrl: string) {
        super(http, apiUrl);
    }
}
