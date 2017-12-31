import { AsyncSubject } from 'rxjs/Rx';

export interface IResourceSubject {
    [resource: string]: AsyncSubject<Iterable<object>>;
}
