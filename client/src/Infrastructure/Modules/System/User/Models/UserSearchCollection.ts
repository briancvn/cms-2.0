import { ArrayDataType } from '../../../../Decorators/ArrayDataType';
import { SearchCollection } from '../../../../Models/SearchCollection';
import { UserSearchResult } from './UserSearchResult';

export class UserSearchCollection extends SearchCollection<UserSearchResult> {
    @ArrayDataType(UserSearchResult) Results: UserSearchResult[];
}
