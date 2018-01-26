import { ERoleGroup } from '../../../../Enums/ERoleGroup';
import { BaseModel } from '../../../../Models/BaseModel';
import { Profile } from '../../../../Models/Profile';

export class User extends BaseModel {
    public Email: string;
    public Phone: string;
    public Birthday: Date;
    public Pin: number;
    public RoleGroups: ERoleGroup[] = [];
    public Profile: Profile;

    created_at: string;
    number: string;
    state: string;
    title: string;
}
