import { EResource } from '../Enums/EResource';

export class ResourceRequest {
    public Resources: string[] = [];
    constructor(public Language: string) {}
}
