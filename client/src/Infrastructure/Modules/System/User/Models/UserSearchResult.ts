import { ERoleGroup } from '../../../../Enums/ERoleGroup';
import { BaseModel } from '../../../../Models/BaseModel';

export class UserSearchResult extends BaseModel {
    public Email: string;
    public Phone: string;
    public Birthday: Date;
    public Pin: number;
    public RoleGroups: ERoleGroup[] = [];
}
