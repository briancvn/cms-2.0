import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs/Rx';
import * as _ from 'underscore';

import { EResource } from '../Enums/EResource';
import { IResourceDictionary } from '../Interfaces/IResourceDictionary';
import { IResourceRequest } from '../Interfaces/IResourceRequest';
import { ResourceRequest } from '../Models/ResourceRequest';
import { ResourceResult } from '../Models/ResourceResult';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';
import { ResourceCache } from './ResourceCache';
import { TranslateService } from './TranslateService';

@Injectable()
export class ResourceService extends BaseBackendService {
    private loadedSubject: AsyncSubject<void>;
    public loaded: Observable<void>;
    public requestRegistrations: IResourceRequest[] = [];

    constructor(http: HttpClientService, private translateService: TranslateService) {
        super(http, 'Resource', false);
        this.initLoadingNotification();
    }

    public observe(resource: EResource): Observable<Iterable<{}>> {
        this.addRegistration(resource);
        return ResourceCache.observe(this.translateService.language, resource).take(1);
    }

    public internalLoad(): Promise<any> {
        return this.loadResource(this.requestRegistrations);
    }

    public register(resources: EResource[] = []): void {
        resources.forEach(k => this.addRegistration(k));
    }

    private addRegistration(resource: EResource): void {
        if (this.requestRegistrations.findIndex(r => r.resource === resource) < 0) {
            this.requestRegistrations.push({ resource: resource });
        }
    }

    public clear(): void {
        this.requestRegistrations = [];
        this.initLoadingNotification();
    }

    public notifyLoaded(): void {
        this.loadedSubject.next(null);
        this.loadedSubject.complete();
    }

    private loadResource(sources: IResourceRequest[]): Promise<IResourceDictionary> {
        return new Promise<any>((resolve, reject) => {
            var resources = sources.map(s => s.resource);

            var cachedRefData = ResourceCache.getResource(this.translateService.language, resources);
            var downloadedResource: IResourceDictionary = {};
            var resourcesRequestToServer = resources.filter(k => !cachedRefData[EResource[k]]);
            if (_.isEmpty(resourcesRequestToServer)) {
                this.checkAndProcessResponse(sources, cachedRefData, downloadedResource, resolve);
                return;
            }

            var request = new ResourceRequest(this.translateService.language);
            request.Resources = sources.filter(source => _.includes(resourcesRequestToServer, source.resource)).map(source => EResource[source.resource]);

            this.getResources(request)
                .then(result => {
                    Object.keys(result.Resources).forEach(resource => {
                        downloadedResource[EResource[resource]] = result.Resources[resource];
                    });
                    this.checkAndProcessResponse(sources, cachedRefData, downloadedResource, resolve);
                }, reject);
        });
    }

    private checkAndProcessResponse(sources: IResourceRequest[],
        cachedRefData: IResourceDictionary,
        downloadedResource: IResourceDictionary,
        resolve: Function
    ): void {
        sources.forEach(source => {
            var downloadedValues = downloadedResource[source.resource];
            if (downloadedValues) {
                ResourceCache.addResources(this.translateService.language, source.resource, downloadedValues);
                cachedRefData[source.resource] = downloadedValues;
            }
        });
        resolve(cachedRefData);
    }

    private initLoadingNotification(): void {
        this.loadedSubject = new AsyncSubject<void>();
        this.loaded = this.loadedSubject.asObservable().take(1);
    }

    private getResources(request: ResourceRequest): Promise<ResourceResult> {
        return this.post<ResourceResult>({ Method: 'GetResources', Body: request });
    }
}
