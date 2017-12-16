import { Type } from '@angular/core';

import { HttpClientService } from './HttpClientService';

export abstract class BaseBackendService {
    constructor(protected http: HttpClientService, private apiUrl: string, private authenticateService = true) {}

    public get<T>(method: string, deserializedType: Type<any> = null, authenticate = true): Promise<T> {
        return this.http.httpGet<T>(`${this.apiUrl}/${method}`, deserializedType, (this.authenticateService && authenticate));
    }

    public post<T>(method: string, body: any, deserializedType: Type<any> = null, authenticate = true): Promise<T> {
        return this.http.httpPost<T>(`${this.apiUrl}/${method}`, body, deserializedType, (this.authenticateService && authenticate));
    }
}
