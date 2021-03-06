import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import * as _ from 'underscore';

import { environment } from '../../Environments/Environment';
import { CommonConstants } from '../Constants';
import { HttpStatusCodeConstants } from '../Constants/HttpStatusCodeConstants';
import { IHttpParam } from '../Interfaces/IHttpParam';
import { IRequestOptions } from '../Interfaces/IRequestOptions';
import { Response } from '../Models';
import { AuthenticateService } from './AuthenticateService';
import { JsonDeserializer } from './JsonDeserializer';
import { LogService } from './LogService';
import { SnackBarService } from './SnackBarService';
import { SpinnerService } from './SpinnerService';

interface IRequest {
    Url: string;
    Body?: any;
    Options?: IRequestOptions;
}

@Injectable()
export class HttpClientService extends HttpClient {
    public beforeRequest = new Subject<any>();
    public afterResponse = new Subject<Response>();

    public beforeModalRequest = new Subject<any>();
    public afterModalResponse = new Subject<Response>();

    public get token(): string {
        return sessionStorage.getItem(CommonConstants.AUTH_TOKEN);
    }

    public set token(value: string) {
        if (!value) {
            sessionStorage.removeItem(CommonConstants.AUTH_TOKEN);
        } else {
            sessionStorage.setItem(CommonConstants.AUTH_TOKEN, value);
        }
    }

    constructor(handler: HttpHandler,
        private jsonDeserializer: JsonDeserializer,
        private spinnerService: SpinnerService,
        private snackBarService: SnackBarService,
        private logService: LogService
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
            let beforeRequest = param.IsModalRequest ? this.beforeModalRequest : this.beforeRequest;
            beforeRequest.asObservable().take(1).last().toPromise()
                .then(() => {
                    var params = !environment.production ? {[CommonConstants.XDEBUG_PARAM]: CommonConstants.XDEBUG_TYPE} : {};
                    _.extend(params, param.Params);
                    resolve({
                        Url: `${CommonConstants.API_PREFIX}${param.Url}`,
                        Body: param.Body,
                        Options: {
                            headers: param.Authenticate && this.token ? {[CommonConstants.AUTH_HEADER]: `Bearer ${this.token}` } : null,
                            params: params
                        }
                    });
                });

                beforeRequest.next(param.Body);
        });
    }

    private hanldeResponse<T>(param: IHttpParam, response: Response): Promise<T> {
        let afterResponse = param.IsModalRequest ? this.afterModalResponse : this.afterResponse;
        this.spinnerService.hide(param.SpinnerId);

        if (response.Warning) {
            this.snackBarService.warning(response.Warning.Message);
            if (_.includes(HttpStatusCodeConstants.REJECT_CODE, response.Warning.Code)) {
                return Promise.reject(response.Warning.Message);
            }
        } else if (!_.isEmpty(response.ValidationErrors)) {
            afterResponse.next(response);
            return Promise.reject('Validation errors');
        }

        this.jsonDeserializer.deserialize(response, param.DeserializedType);
        afterResponse.next(response);
        return response.Result;
    }
}
