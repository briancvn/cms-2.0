import { ReferenceData } from './ReferenceData';

export class ResourceResult {
    public Resources: {[resource: string]: Iterable<object>} = {};
}
