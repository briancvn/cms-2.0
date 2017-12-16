import { TokenInterceptor } from './TokenInterceptor';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { environment } from '../../Environments/Environment';
import { CommonConstants } from '../Constants';
import { Response } from '../Models';
import { JsonDeserializer } from './JsonDeserializer';

interface IRequestOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

interface IRequest {
    Url: string;
    Body?: any;
    Options?: IRequestOptions;
}

@Injectable()
export class HttpClientService extends HttpClient {
    public beforeRequest = new Subject<any>();
    public afterRequest = new Subject<Response>();

    constructor(handler: HttpHandler, private jsonDeserializer: JsonDeserializer, private tokenInterceptor: TokenInterceptor) {
        super(handler);
    }

    public httpGet<T>(url: string, deserializedType?: Type<any>, authenticate = true): Promise<T> {
        return this.hanldeRequest(authenticate, url)
            .then(request => this.get<T>(request.Url, request.Options).toPromise())
            .then(this.hanldeResponse.bind(this, deserializedType));
    }

    public httpPost<T>(url: string, body: any, deserializedType?: Type<any>, authenticate = true): Promise<T> {
        return this.hanldeRequest(authenticate, url, body)
            .then(request => this.post<T>(request.Url, request.Body, request.Options).toPromise())
            .then(this.hanldeResponse.bind(this, deserializedType));
    }

    private hanldeRequest(authenticate: boolean, url: string, body?: any): Promise<IRequest> {
        return new Promise<IRequest>(resolve => {
            this.beforeRequest.asObservable().take(1).last().toPromise()
                .then(() => {
                    resolve({
                        Url: `${CommonConstants.API_PREFIX}${url}`,
                        Body: body,
                        Options: {
                            headers: authenticate ? {[CommonConstants.AUTH_HEADER]: `Bearer ${this.tokenInterceptor.token}` } : null
                            params: !environment.production ? {[CommonConstants.XDEBUG_PARAM]: CommonConstants.XDEBUG_TYPE} : null
                        }
                    });
                });
            this.beforeRequest.next(body);
        })
    }

    private hanldeResponse<T>(deserializedType: Type<any>, response: Response): Promise<T> {
        this.jsonDeserializer.deserialize(response, deserializedType);
        this.afterRequest.next(response);
        return response.Result;
    }
}
