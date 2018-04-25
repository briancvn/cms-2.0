import { SearchCollection } from '../Models/SearchCollection';
import { SearchCriteria } from '../Models/SearchCriteria';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';

export abstract class BaseSearchService<TCriteria extends SearchCriteria,
    TSearchCollection extends SearchCollection<any>,
    TDetail> extends BaseBackendService {
    abstract search(criteria: TCriteria): Promise<TSearchCollection>;
    abstract findById(id: string): Promise<TDetail>;

    constructor(http: HttpClientService, apiUrl: string) {
        super(http, apiUrl);
    }
}
