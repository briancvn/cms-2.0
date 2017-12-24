import { AsyncSubject, Observable } from 'rxjs/Rx';
import * as _ from 'underscore';

import { EReferenceDataKind } from '../Enums/EReferenceDataKind';
import { IReferenceDataDictionary } from '../Interfaces/IReferenceDataDictionary';
import { IReferenceDataSubject } from '../Interfaces/IReferenceDataSubject';
import { ReferenceDataValue } from '../Models/ReferenceDataValue';

export class ReferenceDataCache {
    public static allSubjects: IReferenceDataSubject = {};

    private static ensureSubjectFor(kind: string): AsyncSubject<ReferenceDataValue[]> {
        if (!ReferenceDataCache.allSubjects[kind]) {
            ReferenceDataCache.allSubjects[kind] = new AsyncSubject<ReferenceDataValue[]>();
        }
        return ReferenceDataCache.allSubjects[kind];
    }

    public static observe(kind: EReferenceDataKind,
        filter: {(values: ReferenceDataValue[]): ReferenceDataValue[]}
    ): Observable<ReferenceDataValue[]> {
        if (!filter) {
            filter = (values) => values;
        }
        var key = EReferenceDataKind[kind];
        var subject = ReferenceDataCache.ensureSubjectFor(key);
        return subject.asObservable().map(_.clone).map(filter);
    }

    public static next(kind: EReferenceDataKind, values: ReferenceDataValue[]): void {
        // in case reference data loaded before the binding to control -> cache the result in the subject, then
        // when it observe -> it will receive the latest value
        var subject = ReferenceDataCache.ensureSubjectFor(EReferenceDataKind[kind]);
        subject.next(values);
        subject.complete();
    }

    public static getReferenceData(kinds: EReferenceDataKind[]): IReferenceDataDictionary {
        var result = kinds.reduce((obj, kind) => {
            var cloneValues = this.getReferenceValues(kind);
            if (cloneValues) {
                // when take array from parent window, the check "cloneValues instance of Array" will return false (strange),
                // so we need to call Array.from here
                obj[EReferenceDataKind[kind]] = Array.from(cloneValues);
            }

            return obj;
        }, <IReferenceDataDictionary>{});

        return result;
    }

    public static addReferenceValues(kind: EReferenceDataKind, values: ReferenceDataValue[]): void {
        if (_.isNull(kind) || _.isUndefined(kind) || !values) {
            return;
        }
        ReferenceDataCache.next(kind, values);
    }

    public static getReferenceValues(kind: EReferenceDataKind): ReferenceDataValue[] {
        var foundSubject = this.allSubjects[EReferenceDataKind[kind]];
        return foundSubject && foundSubject['value'];
    }
}

// for debugging purpose, list all loaded ref data
window['getCachedReferenceData'] = () => {
    var keys = Object.keys(ReferenceDataCache.allSubjects);
    var result = {};
    keys.forEach(k => {
        result[k] = ReferenceDataCache.allSubjects[k]['value'];
    });
    return result;
};
