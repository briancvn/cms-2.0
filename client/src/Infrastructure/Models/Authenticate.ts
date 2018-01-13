import { DataType } from '../Decorators';
import { ERoleGroup } from '../Enums/ERoleGroup';
import { Profile } from '../Models/Profile';

export class Authenticate {
    public Token: string;
    public Expires: Date;
    public RoleGroups: ERoleGroup[] = [];
    @DataType(Profile) public Profile: Profile;
}
