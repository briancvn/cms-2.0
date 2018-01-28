import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IGridState } from '../../../../Interfaces/IGridState';
import { ISearchResult } from '../../../../Interfaces/ISearchResult';
import { BaseSearchService } from '../../../../Services/BaseSearchService';
import { HttpClientService } from '../../../../Services/HttpClientService';
import { User } from '../Models/User';

@Injectable()
export class UserService extends BaseSearchService {
    constructor(http: HttpClientService, private router: Router) {
        super(http, 'User');
    }

    search<User>(state: IGridState): Promise<ISearchResult<User>> {
        const href = 'https://api.github.com/search/issues';
        const requestUrl = `${href}?q=repo:angular/material2&sort=${state.Sort.Field}&order=${state.Sort.Dir}&page=${state.PageIndex}`;
        return this.http.get<ISearchResult<User>>(requestUrl).toPromise();
    }
}
