import { AsyncSubject } from 'rxjs/Rx';
import { ReferenceDataValue } from '../Models/ReferenceDataValue';

export interface IReferenceDataSubject {
    [kind: string]: AsyncSubject<ReferenceDataValue[]>;
}
