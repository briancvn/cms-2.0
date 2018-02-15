import { DataCollection } from '../../../../Models/DataCollection';
import { UserService } from '../Services/UserService';
import { User } from './User';
import { UserCriteria } from './UserCriteria';

export class UserDataCollection extends DataCollection<UserCriteria, User> {
    constructor(criteria: UserCriteria, searchService: UserService) {
        super(criteria, searchService);
    }
}
