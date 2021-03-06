import { ERoleGroup } from '../../../../Enums/ERoleGroup';
import { BaseModel } from '../../../../Models/BaseModel';
import { Profile } from '../../../../Models/Profile';
import { DataType } from '../../../../Decorators/DataType';

export class User extends BaseModel {
    public Email: string;
    public Phone: string;
    public Birthday: Date;
    public Pin: number;
    public RoleGroups: ERoleGroup[] = [];
    @DataType(Profile) public Profile: Profile;
}
