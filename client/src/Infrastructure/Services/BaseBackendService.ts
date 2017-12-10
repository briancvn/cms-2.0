import { Type } from '@angular/core';

import { HttpClientService } from './HttpClientService';

export abstract class BaseBackendService {
    constructor(protected http: HttpClientService, private apiUrl: string) {}

    public get<T>(method: string, deserializedType: Type<any> = null): Promise<T> {
        return this.http.getJson<T>(`api/${this.apiUrl}/${method}`, deserializedType);
    }

    public post<T>(method: string, body: any, deserializedType: Type<any> = null): Promise<T> {
        return this.http.postJson<T>(`api/${this.apiUrl}/${method}`, body, deserializedType);
    }
}
