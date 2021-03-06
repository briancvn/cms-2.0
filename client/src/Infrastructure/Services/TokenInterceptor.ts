import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

import { CommonConstants } from '../Constants/CommonConstants';
import { JsonDeserializer } from './JsonDeserializer';
import { ModalService } from './ModalService';
import { SpinnerService } from './SpinnerService';

declare var RTCPeerConnection;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private cachedRequests: Array<HttpRequest<any>> = [];

    private get localIp(): string {
        return sessionStorage.getItem(CommonConstants.LOCAL_IP);
    }

    private set localIp(value: string) {
        sessionStorage.setItem(CommonConstants.LOCAL_IP, value);
    }

    constructor(
        private modalService: ModalService,
        private jsonDeserializer: JsonDeserializer,
        private spinnerService: SpinnerService
    ) {
        if (!_.isEmpty(this.localIp)) {
            this.getLocalIp().then(ip => (this.localIp = ip));
        }
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // Not implemented
                }
            },
            (response: any) => {
                if (response instanceof HttpErrorResponse) {
                    if (response.status === 401) {
                        this.collectFailedRequest(request);
                    }
                }
                this.handlResponseError(response);
            }
        );
    }

    private handlResponseError(response): void {
        if (response.error) {
            this.modalService.showReponseError(response.error.text);
            this.spinnerService.hideAll();
        }
    }

    private collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    private getLocalIp(): Promise<string> {
        // tslint:disable-next-line:promise-must-complete
        return new Promise<string>(resolve => {
            let servers = { iceServers: [{ urls: 'stun:stun.services.mozilla.com' }] };
            let constraints = { optional: [{ RtpDataChannels: true }] };
            var rtcPeerConnection = new RTCPeerConnection(servers, constraints);
            var foundcandidate = false;

            var handleCandidate = (candidate: string) => {
                if (foundcandidate) {
                    return;
                }

                let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
                let ip_addr = ip_regex.exec(candidate)[1];
                if (
                    ip_addr.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)
                ) {
                    foundcandidate = true;
                    resolve(ip_addr);
                }
            };
            rtcPeerConnection.onicecandidate = ice => ice.candidate && handleCandidate(ice.candidate.candidate);
            rtcPeerConnection.createDataChannel(CommonConstants.Empty);
            rtcPeerConnection.createOffer(
                result => {
                    rtcPeerConnection.setLocalDescription(
                        result,
                        () => { /* successCallback */ },
                        () => { /* errorCallback */ }
                    );
                },
                () => { /* failureCallback */ }
            );

            setTimeout(() => {
                let lines = rtcPeerConnection.localDescription.sdp.split('\n');
                lines.forEach(l => l.indexOf('a=candidate:') === 0 && handleCandidate(l));
            }, CommonConstants.LONG_TIMEOUT);
        });
    }
}
