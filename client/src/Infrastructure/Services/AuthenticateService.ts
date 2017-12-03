import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'underscore';

import { IUserContext } from '../Interfaces/IUserContext';
import { Authenticate } from '../Models/Authenticate';
import { AuthenticateResponse } from '../Models/AuthenticateResponse';
import { BaseBackendService } from './BaseBackendService';
import { TokenInterceptor } from './TokenInterceptor';

declare var userContext: IUserContext;

@Injectable()
export class AuthenticateService extends BaseBackendService {
    private onUserContextChangedSubject: Subject<void> = new Subject<void>();

    onUserContextChanged = this.onUserContextChangedSubject.asObservable();

    get isAuthenticated(): boolean {
        return Boolean(userContext && userContext.Profile);
    }

    constructor(http: HttpClient, private tokenInterceptor: TokenInterceptor) {
        super(http, 'users');
    }

    authenticate(request: Authenticate): Promise<any> {
        return this.post<any>('authenticate', request)
          .then(response => {
              this.tokenInterceptor.token = response.data.token;
              userContext.Token = response.data.token;
              userContext.Expires = response.data.expires;
              userContext.Profile = response.data.user;
              this.onUserContextChangedSubject.next();
          });
    }

    loadUserContext(): void {
        if (_.isEmpty(this.tokenInterceptor.token)) {
            return;
        }
        this.get<AuthenticateResponse>('getUserContext')
            .then(response => {
                userContext.Profile = response.user;
                this.onUserContextChangedSubject.next();
            });
    }

    logout(): void {
        this.get<void>('logout')
            .then(() => {
                userContext = <IUserContext>{};
                this.tokenInterceptor.token = null;
                this.onUserContextChangedSubject.next();
            });
    }
}
