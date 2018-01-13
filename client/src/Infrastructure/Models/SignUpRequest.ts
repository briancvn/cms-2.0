import { Profile } from './Profile';

export class SignUpRequest {
    public Username: string;
    public Email: string;
    public Phone: string;
    public Password: string;
    public ConfirmPassword: string;

    public Profile: Profile = new Profile();
}
