import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'underscore';

import { Authenticate } from '../Models/Authenticate';
import { AuthRequest } from '../Models/AuthRequest';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';
import { TokenInterceptor } from './TokenInterceptor';

declare var userContext: Authenticate;

@Injectable()
export class AuthenticateService extends BaseBackendService {
    private onUserContextChangedSubject: Subject<void> = new Subject<void>();

    onUserContextChanged = this.onUserContextChangedSubject.asObservable();

    get isAuthenticated(): boolean {
        return Boolean(userContext && userContext.Profile);
    }

    constructor(http: HttpClientService, private tokenInterceptor: TokenInterceptor) {
        super(http, 'Authenticate', false);
    }

    login(request: AuthRequest): void {
        this.post<Authenticate>('Login', request, Authenticate)
          .then(auth => {
              userContext = auth;
              this.tokenInterceptor.token = auth.Token;
              this.onUserContextChangedSubject.next();
          });
    }

    loadUserContext(): void {
        if (_.isEmpty(this.tokenInterceptor.token)) {
            return;
        }
        this.get<Authenticate>('IsAuthenticated', Authenticate)
            .then(auth => {
                if (auth) {
                    userContext = auth;
                } else {
                    userContext = new Authenticate();
                    this.tokenInterceptor.token = null;
                }

                this.onUserContextChangedSubject.next();
            });
    }

    logout(): void {
        this.get<void>('Logout')
            .then(() => {
                userContext = new Authenticate();
                this.tokenInterceptor.token = null;
                this.onUserContextChangedSubject.next();
            });
    }
}
