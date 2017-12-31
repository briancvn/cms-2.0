import { IResourceSubject } from './IResourceSubject';

export interface ILanguageResourceSubject {
    [language: string]: IResourceSubject;
}
