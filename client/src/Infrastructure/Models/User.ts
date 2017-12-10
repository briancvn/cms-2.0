import * as _ from 'underscore';
export class User {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Username: string;
    public Language: string;
    public Role: string;

    public get DisplayName(): string {
       return _.compact([this.FirstName, this.LastName]).join(' ');
    }
}
