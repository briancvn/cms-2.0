import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs/Rx';
import * as _ from 'underscore';

import { EReferenceDataKind } from '../Enums/EReferenceDataKind';
import { IReferenceDataDictionary } from '../Interfaces/IReferenceDataDictionary';
import { IReferenceDataRequest } from '../Interfaces/IReferenceDataRequest';
import { ReferenceDataCollectionRequest } from '../Models/ReferenceDataCollectionRequest';
import { ReferenceDataCollectionResult } from '../Models/ReferenceDataCollectionResult';
import { ReferenceDataValue } from '../Models/ReferenceDataValue';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';
import { ReferenceDataCache } from './ReferenceDataCache';

@Injectable()
export class ReferenceDataService extends BaseBackendService {
    private loadedSubject: AsyncSubject<void>;
    public loaded: Observable<void>;
    public requestRegistrations: IReferenceDataRequest[] = [];

    constructor(http: HttpClientService) {
        super(http, 'ReferenceData', false);
        this.initLoadingNotification();
    }

    private initLoadingNotification(): void {
        this.loadedSubject = new AsyncSubject<void>();
        this.loaded = this.loadedSubject.asObservable().take(1);
    }

    public observe(kind: EReferenceDataKind, filter?: {(values: ReferenceDataValue[]): ReferenceDataValue[]}) : Observable<ReferenceDataValue[]> {
        this.addRegistration(kind);
        return ReferenceDataCache.observe(kind, filter).take(1);
    }

    public observeAndMap<TMap>(kind: EReferenceDataKind,
        filter: {(values: ReferenceDataValue[]): ReferenceDataValue[]},
        map: {(values: ReferenceDataValue[]): TMap[]}
    ): Observable<TMap[]> {
        this.addRegistration(kind);
        return ReferenceDataCache.observe(kind, filter).map(map).take(1);
    }

    public internalLoad(): Promise<any> {
        return this.loadReferenceData(this.requestRegistrations);
    }

    GetReferenceDataList(request: ReferenceDataCollectionRequest): Promise<ReferenceDataCollectionResult> {
        return this.post<ReferenceDataCollectionResult>({ Method: 'GetReferenceDataList', Body: request });
    }

    public register(kinds: EReferenceDataKind[] = []): void {
        kinds.forEach(k => this.addRegistration(k));
    }

    private addRegistration(kind: EReferenceDataKind): void {
        if (this.requestRegistrations.findIndex(r => r.kind === kind) < 0) {
            this.requestRegistrations.push({ kind: kind });
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

    private loadReferenceData(sources: IReferenceDataRequest[]): Promise<IReferenceDataDictionary> {

        return new Promise<any>((resolve, reject) => {
            var kinds = sources.map(s => s.kind);

            var cachedRefData = ReferenceDataCache.getReferenceData(kinds);
            var downloadedRefData: IReferenceDataDictionary = {};
            var kindsRequestToServer = kinds.filter(k => !cachedRefData[EReferenceDataKind[k]]);
            if (_.isEmpty(kindsRequestToServer)) {
                this.checkAndProcessResponse(sources, cachedRefData, downloadedRefData, resolve);
                return;
            }

            var reuqest = new ReferenceDataCollectionRequest();
            reuqest.Kinds = sources.filter(source => _.includes(kindsRequestToServer, source.kind)).map(source => source.kind);

            this.GetReferenceDataList(reuqest)
                .then(refData => {
                    refData.Results.forEach(ref => {
                        downloadedRefData[EReferenceDataKind[ref.Kind]] = ref.ReferenceDataValues;
                    });
                    this.checkAndProcessResponse(sources, cachedRefData, downloadedRefData, resolve);
                }, reject);
        });
    }

    private checkAndProcessResponse(sources: IReferenceDataRequest[],
        cachedRefData: IReferenceDataDictionary,
        downloadedRefData: IReferenceDataDictionary,
        resolve: Function
    ): void {
        sources.forEach(source => {
            var downloadedValues = downloadedRefData[source.kind];
            if (downloadedValues) {
                ReferenceDataCache.addReferenceValues(source.kind, downloadedValues);
                cachedRefData[source.kind] = downloadedValues;
            }
        });
        resolve(cachedRefData);
    }
}
