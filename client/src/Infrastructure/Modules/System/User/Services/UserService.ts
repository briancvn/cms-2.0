import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BaseSearchService } from '../../../../Services/BaseSearchService';
import { HttpClientService } from '../../../../Services/HttpClientService';
import { User } from '../Models/User';
import { UserCriteria } from '../Models/UserCriteria';

@Injectable()
export class UserService extends BaseSearchService<UserCriteria, User> {
    constructor(http: HttpClientService, private router: Router) {
        super(http, 'User');
    }
}
