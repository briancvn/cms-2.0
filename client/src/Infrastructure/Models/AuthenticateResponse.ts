import { User } from '../Models/User';

export class AuthenticateResponse {
    public token: string;
    public expires: Date;
    public user: User;
}
