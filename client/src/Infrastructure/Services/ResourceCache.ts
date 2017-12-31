import { AsyncSubject, Observable } from 'rxjs/Rx';
import * as _ from 'underscore';

import { EResource } from '../Enums/EResource';
import { IResourceDictionary } from '../Interfaces/IResourceDictionary';
import { ILanguageResourceSubject } from '../Interfaces/ILanguageResourceSubject';

export class ResourceCache {
    public static allSubjects: ILanguageResourceSubject = {};

    private static ensureSubjectFor(language: string, resource: string): AsyncSubject<Iterable<object>> {
        if (!ResourceCache.allSubjects[language]) {
            ResourceCache.allSubjects[language] = {};
        }
        if (!ResourceCache.allSubjects[language][resource]) {
            ResourceCache.allSubjects[language][resource] = new AsyncSubject<Iterable<object>>();
        }
        return ResourceCache.allSubjects[language][resource];
    }

    public static observe(language: string, resource: EResource): Observable<Iterable<object>> {
        var subject = ResourceCache.ensureSubjectFor(language, EResource[resource]);
        return subject.asObservable().map(_.clone);
    }

    public static next(language: string, resource: EResource, tranlate: Iterable<{}>): void {
        var subject = ResourceCache.ensureSubjectFor(language, EResource[resource]);
        subject.next(tranlate);
        subject.complete();
    }

    public static getResource(language: string, resources: EResource[]): IResourceDictionary {
        var result = resources.reduce((obj, resource) => {
            var cloneValues = this.getResources(language, resource);
            if (cloneValues) {
                // when take array from parent window, the check "cloneValues instance of Array" will return false (strange),
                // so we need to call Array.from here
                obj[EResource[resource]] = Array.from(cloneValues);
            }

            return obj;
        }, <IResourceDictionary>{});

        return result;
    }

    public static addResources(language: string, resource: EResource, values: Iterable<object>): void {
        if (!language || !EResource[resource] || !values) {
            return;
        }
        ResourceCache.next(language, resource, values);
    }

    public static getResources(language: string, resource: EResource): Iterable<object> {
        var foundSubject = this.allSubjects[language][EResource[resource]];
        return foundSubject && foundSubject['value'];
    }
}