import { User } from '../Models/User';

export class Authenticate {
    public Token: string;
    public Expires: Date;
    public User: User;
}
