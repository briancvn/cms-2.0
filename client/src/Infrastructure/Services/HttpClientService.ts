import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Headers, RequestOptionsArgs, Response } from '@angular/http';
import { endsWith } from 'lodash';
import { Subject } from 'rxjs/Rx';

import { CommonConstants } from '../Constants';
import { EResponseErrorKind } from '../Enums';
import { Response as ApiResponse, ResponseError } from '../Models';
import { JsonDeserializer } from '../Reflection/JsonDeserializer';
import { InfrastructureContext } from './InfrastructureContext';
import { LogService } from './LogService';
import { ModalService } from './ModalService';
import { ReflectionService } from './ReflectionService';

@Injectable()
export class HttpClientService {
    public afterPost = new Subject<ApiResponse>();
    public beforePost = new Subject();

    private commonUIResFile = 'CommonUIResources';
    private offlineStateHandled = false;

    constructor(private http: HttpClient,
      private logService: LogService,
      private modalService: ModalService,
      private reflectionService: ReflectionService
    ) {}

    public getJson<T>(url: string, deserializedType: Type<any> = null): Promise<T> {
        if (!window.navigator.onLine) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve => {
                    if (window.navigator.onLine) {
                        this.internalGetJson(url, {}, deserializedType)
                          .then(result => resolve(result), () => reject())
                          .catch(() => reject());
                    } else {
                        if (!this.offlineStateHandled) {
                            this.offlineStateHandled = true;
                        }
                        reject();
                    }
                }, CommonConstants.REQUEST_TIMEOUT);
            });
        }
        return this.internalGetJson(url, {}, deserializedType);
    }

    public postJson<T>(url: string, body?: any, deserializedType: Type<any> = null): Promise<T> {
        if (!window.navigator.onLine) {
            return new Promise((resolve, reject) => {
                setTimeout((resolve) => {
                    if (window.navigator.onLine) {
                        this.internalPostJson(url, body, {}, deserializedType)
                        .then((result) => resolve(result), () => reject())
                        .catch(() => reject());
                    } else {
                        if (!this.offlineStateHandled) {
                            this.offlineStateHandled = true;
                        }
                        reject();
                    }
                }, CommonConstants.REQUEST_TIMEOUT);
            });
        }
        return this.internalPostJson(url, body, {}, deserializedType);
    }

    private handleServerError(error: ApiResponse): any {
        this.afterPost.next(error);
        return Promise.reject(error);
    }

    private examineResponseAndConvertToJson<T>(result: ApiResponse, deserializedType: Type<any>): Promise<T> {
        var jsonDeserializer = new JsonDeserializer(this.reflectionService, deserializedType);
        var jsonResponse = jsonDeserializer.deserialize(result);
        if (this.checkResponseAndShowError(jsonResponse)) {
            return Promise.resolve<T>(jsonResponse.Result);
        } else {
            return Promise.reject<T>(result);
        }
    }

    private logResponse(dateTimeRequest: number, url: string): void {
        var callDuration = this.calculateCallDuration(dateTimeRequest);
        this.logService.info(`HttpService - Completed request to [${url}] in ${callDuration} miliseconds`);
    }

    private checkResponseAndShowError(response: ApiResponse): boolean {
        if (!response || !response.StatusCode) {
            return false;
        }
        this.afterPost.next(response);
        return response.Errors.length === 0;
    }

    private analyseError<T>(error: Response | Error, dateTimeRequest: number, url: string): Promise<Response | T> {
        return new Promise((resolve, reject) => {
            var callDuration = this.calculateCallDuration(dateTimeRequest);
            this.handleErrorResponse(error);
            reject(error); // reject error before throwing conflict exception
            this.hanldeJsonRequestError(
                error,
                `HttpService - Failed request to [${url}] in ${callDuration} miliseconds with error: ${String(error)}`,
                callDuration
            );
        });
    }

    private examineResponseHeader(response: Response | Error): void {
        if (response instanceof Error) {
            return;
        }
        if (response.status === 204) {
            if (!InfrastructureContext.getIsInSessionTimeout()) {
                InfrastructureContext.setIsInSessionTimeout();
                window.top.location.reload(true);
                throw Error('ServerSessionTimeout');
            }
            return;
        }

        if (response.status === 409) {
            let apiResponse = <ApiResponse>response.json();
            if (apiResponse.Errors) {
                if (apiResponse.ErrorKind === EResponseErrorKind.Popup) {
                    var errorTitle = apiResponse.ErrorTitle || 'Error_Title';

                    this.modalService.alert(errorTitle, this.getErrorResponseMessages(apiResponse.Errors));
                } else {
                    this.afterPost.next(apiResponse);
                }
                throw Error('ConflictError');
            }
        }

        if (response.headers && response.headers.has('X-StVA-OutOfWorkingHour')) {
            this.modalService.alert('Alert_OutOfWorkingHour_Title', 'Alert_OutOfWorkingHour_Message');
            throw Error('OutOfWorkingHour');
        }
    }

    private getErrorResponseMessages(errors: ResponseError[]): string[] {
        var messages: string[] = [];
        if (errors) {
            errors.forEach((e: ResponseError) => {
                if (e.Error) {
                    messages.push(e.Error);
                }
                if (e.ErrorDetails) {
                    e.ErrorDetails.forEach((ed: string) => {
                        messages.push(ed);
                    });
                }
            });
        }
        return messages;
    }

    private isSessionTimeoutError(errorResponse: Response | Error): boolean {
        return (errorResponse instanceof Error && endsWith(String(errorResponse), 'ServerSessionTimeout'));
    }

    private hanldeJsonRequestError(errorResponse: Response | Error, errorLogMessage: string, elapsedTime?: number): void {
        if (!this.isSessionTimeoutError(errorResponse)) {
            this.examineResponseHeader(errorResponse);
            // In case of an error related to a web API call, the log must also contain the request and response
            this.logService.error(errorLogMessage);
        }
    }

    private calculateCallDuration(dateTimeRequest: number): number {
        var dateTimeResponse = Date.now();
        var callDuration = dateTimeResponse - dateTimeRequest;
        return callDuration;
    }


    private analyseErrorPostRequest<T>(error: Response | Error, body: string, dateTimeRequest: number, url: string): Promise<Response | Error | T> {
        return new Promise((resolve, reject) => {
            var callDuration = this.calculateCallDuration(dateTimeRequest);
            this.handleErrorResponse(error);
            reject(error); // reject error before throwing conflict exception
            this.hanldeJsonRequestError(error, `HttpService -  POST request to ${url} with data: ` +
                `[${body ? body : ''}] failed in ${callDuration} miliseconds with error:` + String(error), callDuration);
        });
    }

    private internalGetJson<T>(url: string, options?: any, deserializedType: Type<any> = null): Promise<T> {
        this.offlineStateHandled = false;
        var dateTimeRequest = Date.now();
        return this.http.get(this.getRequestUrl(url), options).toPromise()
            .catch(error => this.handleServerError(error))
            .then(result => <Promise<T>>this.examineResponseAndConvertToJson(result, deserializedType))
            .then(response => { this.logResponse(dateTimeRequest, url); return response; })
            .catch(error => <Promise<T>>this.analyseError(error, dateTimeRequest, url));
    }

    private internalPostJson<T>(url: string, body: any, options: any, deserializedType: Type<any>): Promise<T> {
        this.offlineStateHandled = false;
        var dateTimeRequest = Date.now();
        this.beforePost.next(body);
        body = this.convertBodyToString(body);
        options = this.addContentTypeToHeader(options);
        return this.http.post(this.getRequestUrl(url), body, options).toPromise()
            .catch(error => this.handleServerError(error))
            .then(result => <Promise<T>>this.examineResponseAndConvertToJson(result, deserializedType))
            .then(response => { this.logResponse(dateTimeRequest, url); return response; })
            .catch(error => <Promise<T>>this.analyseErrorPostRequest(error, body, dateTimeRequest, url));
    }

    private getRequestUrl(url: string): string {
        return `${url}?XDEBUG_SESSION_START=PHPSTORM`;
    }

    private convertBodyToString(body: any): string {
        if (typeof (body) !== 'string') {
            /*Since JSON.stringify already auto convert dateObject to UTC we do not need to covert it ourself.*/
            try {
                return JSON.stringify(body);
            } catch (error) {
                return 'Cannot convert body to string due to circular reference';
            }
        }
        return body;
    }

    private addContentTypeToHeader(options: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            options = { headers: headers };
        }
        return options;
    }

    private handleErrorResponse(error: Error | Response): void {
        if (error) {
            if ((<Response>error).status === 500) {
                error['serverError'] = true;
            } else {
                error['handled'] = true;
            }
        }
    }
}
