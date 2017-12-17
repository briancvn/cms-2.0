import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { environment } from '../../Environments/Environment';
import { CommonConstants } from '../Constants';
import { IHttpParam } from '../Interfaces/IHttpParam';
import { IRequestOptions } from '../Interfaces/IRequestOptions';
import { Response } from '../Models';
import { JsonDeserializer } from './JsonDeserializer';
import { SpinnerService } from './SpinnerService';
import { TokenInterceptor } from './TokenInterceptor';

interface IRequest {
    Url: string;
    Body?: any;
    Options?: IRequestOptions;
}

Injectable()
export class HttpClientService extends HttpClient {
    public beforeRequest = new Subject<any>();
    public afterRequest = new Subject<Response>();

    constructor(handler: HttpHandler,
        private jsonDeserializer: JsonDeserializer,
        private tokenInterceptor: TokenInterceptor,
        private spinnerService: SpinnerService
    ) {
        super(handler);
    }

    public httpGet<T>(param: IHttpParam): Promise<T> {
        return this.hanldeRequest(param)
            .then(request => this.get<T>(request.Url, request.Options).toPromise())
            .then(this.hanldeResponse.bind(this, param));
    }

    public httpPost<T>(param: IHttpParam): Promise<T> {
        return this.hanldeRequest(param)
            .then(request => this.post<T>(request.Url, request.Body, request.Options).toPromise())
            .then(this.hanldeResponse.bind(this, param));
    }

    private hanldeRequest(param: IHttpParam): Promise<IRequest> {
        this.spinnerService.show(param.SpinnerId);
        return new Promise<IRequest>(resolve => {
            this.beforeRequest.asObservable().take(1).last().toPromise()
                .then(() => {
                    resolve({
                        Url: `${CommonConstants.API_PREFIX}${param.Url}`,
                        Body: param.Body,
                        Options: {
                            headers: param.Authenticate && this.tokenInterceptor.token
                                ? {[CommonConstants.AUTH_HEADER]: `Bearer ${this.tokenInterceptor.token}` }
                                : null,
                            params: !environment.production ? {[CommonConstants.XDEBUG_PARAM]: CommonConstants.XDEBUG_TYPE} : null
                        }
                    });
                });
            this.beforeRequest.next(param.Body);
        })
    }

    private hanldeResponse<T>(param: IHttpParam, response: Response): Promise<T> {
        this.jsonDeserializer.deserialize(response, param.DeserializedType);
        this.afterRequest.next(response);
        this.spinnerService.hide(param.SpinnerId);
        return response.Result;
    }
}
