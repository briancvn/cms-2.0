import { Profile } from '../Models/Profile';
import { DataType } from '../Decorators';

export class Authenticate {
    public Token: string;
    public Expires: Date;
    public RoleGroups: string;
    @DataType(Profile) public Profile: Profile;
}
