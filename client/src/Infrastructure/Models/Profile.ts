import * as _ from 'underscore';

export class Profile {
    public Pin: number;
    public FirstName: string;
    public LastName: string;
    public Birthday: Date;
    public Gender: string;

    public get DisplayName(): string {
       return _.compact([this.FirstName, this.LastName]).join(' ');
    }
}
