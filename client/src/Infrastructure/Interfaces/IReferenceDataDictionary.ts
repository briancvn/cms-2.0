import { ReferenceDataValue } from '../Models/ReferenceDataValue';

export interface IReferenceDataDictionary {
    [kind: string]: ReferenceDataValue[];
}
