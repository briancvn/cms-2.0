import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BaseSearchService } from '../../../../Services/BaseSearchService';
import { HttpClientService } from '../../../../Services/HttpClientService';
import { User } from '../Models/User';
import { UserCriteria } from '../Models/UserCriteria';
import { UserSearchCollection } from '../Models/UserSearchCollection';

@Injectable()
export class UserService extends BaseSearchService<UserCriteria, UserSearchCollection, User> {
    constructor(http: HttpClientService, private router: Router) {
        super(http, 'User');
    }

    search<User>(criteria: UserCriteria): Promise<UserSearchCollection> {
        return this.post({ Method: 'Search', Body: criteria, DeserializedType: UserSearchCollection });
    }

    findById(id: string): Promise<User> {
        return this.get({ Method: 'FindById', Params: { id: id }, DeserializedType: User });
    }
}
