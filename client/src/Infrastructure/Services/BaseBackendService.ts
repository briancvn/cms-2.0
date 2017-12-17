import { Type } from '@angular/core';

import { IHttpParam } from '../Interfaces/IHttpParam';
import { Authenticate } from '../Models';
import { BaseService } from './BaseService';
import { HttpClientService } from './HttpClientService';

export abstract class BaseBackendService extends BaseService {
    constructor(protected http: HttpClientService, private apiUrl: string, private authenticateService = true) {
        super();
    }

    public get<T>(method: string, deserializedType: Type<any> = null, spinnerId: string = null, authenticate = true): Promise<T> {
        return this.http.httpGet<T>(this.getHttpParam(method, null, deserializedType, spinnerId, authenticate));
    }

    public post<T>(method: string, body: any, deserializedType: Type<any> = null, spinnerId: string = null, authenticate = true): Promise<T> {
        return this.http.httpPost<T>(this.getHttpParam(method, body, deserializedType, spinnerId, authenticate));
    }

    private getHttpParam(method: string, body: any, deserializedType: Type<any> = null, spinnerId: string, authenticate = true): IHttpParam {
        return {
            Url: `${this.apiUrl}/${method}`,
            Body: body,
            DeserializedType: deserializedType,
            SpinnerId: spinnerId,
            Authenticate: this.authenticateService && authenticate
        };
    }
}
