import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import * as s from 'underscore.string';

import { CommonConstants } from '../Constants/CommonConstants';

declare var RTCPeerConnection;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private cachedRequests: Array<HttpRequest<any>> = [];

    public get token(): string {
        return sessionStorage.getItem('x-auth-token');
    }

    public set token(value: string) {
        if (!value) {
            sessionStorage.removeItem('x-auth-token');
        } else {
            sessionStorage.setItem('x-auth-token', value);
        }
    }

    private get localIp(): string {
        return sessionStorage.getItem('local-ip');
    }

    private set localIp(value: string) {
        sessionStorage.setItem('local-ip', value);
    }

    constructor() {
        if (!_.isEmpty(this.localIp)) {
            this.getLocalIp().then(ip => this.localIp = ip);
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!s.startsWith(request.url, 'api/Authenticate/')) {
          let header = { Authorization: `Bearer ${this.token}` }
          request = request.clone({ setHeaders: header });
        }

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {}
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.collectFailedRequest(request);
                }
            }
        });
    }

    private collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    private retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }

    private getLocalIp(): Promise<string> {
        return new Promise<string>((resolve) => {
            let servers = { iceServers: [{ urls: 'stun:stun.services.mozilla.com' }] };
            let constraints = {
                optional: [{ RtpDataChannels: true }]
            };
            var rtcPeerConnection = new RTCPeerConnection(servers, constraints);
            var foundcandidate = false;

            var handleCandidate = (candidate: string) => {
                if (foundcandidate) {
                    return;
                }

                let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
                let ip_addr = ip_regex.exec(candidate)[1];
                if (ip_addr.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)) {
                    foundcandidate = true;
                    resolve(ip_addr);
                }
            };
            rtcPeerConnection.onicecandidate = (ice) => ice.candidate && handleCandidate(ice.candidate.candidate);
            rtcPeerConnection.createDataChannel('');
            rtcPeerConnection.createOffer((result) => {
                rtcPeerConnection.setLocalDescription(result, () => {
                    // successCallback
                }, () => {
                    // errorCallback
                });
            }, () => {
                // failureCallback
            });

            setTimeout(() => {
                let lines = rtcPeerConnection.localDescription.sdp.split('\n');
                lines.forEach(l => l.indexOf('a=candidate:') === 0 && handleCandidate(l));
            }, CommonConstants.LONG_TIMEOUT);
        });
    }
}
