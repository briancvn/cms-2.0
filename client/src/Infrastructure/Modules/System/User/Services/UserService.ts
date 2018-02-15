import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ISearchResult } from '../../../../Interfaces/ISearchResult';
import { BaseSearchService } from '../../../../Services/BaseSearchService';
import { HttpClientService } from '../../../../Services/HttpClientService';
import { User } from '../Models/User';
import { UserCriteria } from '../Models/UserCriteria';

@Injectable()
export class UserService extends BaseSearchService {
    constructor(http: HttpClientService, private router: Router) {
        super(http, 'User');
    }

    search<User>(criteria: UserCriteria): Promise<ISearchResult<User>> {
        const href = 'https://api.github.com/search/issues';
        const requestUrl = `${href}?q=repo:angular/material2&sort=${criteria.Sort.Field}&order=${criteria.Sort.Dir}&page=${criteria.PageIndex}`;
        return this.http.get<ISearchResult<User>>(requestUrl).toPromise();
    }
}
