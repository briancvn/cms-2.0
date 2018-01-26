import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BaseBackendService } from '../../../../Services/BaseBackendService';
import { HttpClientService } from '../../../../Services/HttpClientService';
import { ISearchResult } from '../../../../Interfaces/ISearchResult';
import { User } from '../Models/User';

@Injectable()
export class UserService extends BaseBackendService {
    constructor(http: HttpClientService, private router: Router) {
        super(http, 'User');
    }

    getRepoIssues(sort: string, order: string, page: number): Observable<ISearchResult<User>> {
        const href = 'https://api.github.com/search/issues';
        const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<ISearchResult<User>>(requestUrl);
    }
}
