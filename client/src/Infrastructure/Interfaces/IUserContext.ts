import { User } from '../Models/User';

export interface IUserContext {
    Token: string;
    Expires: Date;
    Profile: User;
}
