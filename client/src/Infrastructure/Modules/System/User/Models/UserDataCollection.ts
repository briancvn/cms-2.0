import { Injectable } from '@angular/core';

import { DataCollection } from '../../../../Collections/DataCollection';
import { UserService } from '../Services/UserService';
import { User } from './User';
import { UserCriteria } from './UserCriteria';

@Injectable()
export class UserDataCollection extends DataCollection<UserCriteria, User> {
    constructor(criteria: UserCriteria, searchService: UserService) {
        super(criteria, searchService);
    }
}
