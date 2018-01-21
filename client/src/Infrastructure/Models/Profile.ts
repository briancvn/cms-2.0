import { BaseModel } from './BaseModel';

export class Profile extends BaseModel {
    public Pin: number;
    public FirstName: string;
    public LastName: string;
    public Birthday: Date;
    public Gender: string;
    public Language: string;
}
