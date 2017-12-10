import { User } from '../Models/User';
import { DataType } from '../Reflection';

export class Authenticate {
    public Token: string;
    public Expires: Date;
    @DataType(User) public User: User;
}
