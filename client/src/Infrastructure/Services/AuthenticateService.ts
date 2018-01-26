import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'underscore';

import { Authenticate } from '../Models/Authenticate';
import { AuthRequest } from '../Models/AuthRequest';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';
import { SignUpRequest } from '../Models/SignUpRequest';

@Injectable()
export class AuthenticateService extends BaseBackendService {
    private onUserContextChangedSubject: Subject<void> = new Subject<void>();

    onUserContextChanged = this.onUserContextChangedSubject.asObservable();

    get isAuthenticated(): boolean {
        return Boolean(this.userContext && this.userContext.Profile);
    }

    constructor(http: HttpClientService, private router: Router) {
        super(http, 'Authenticate', false);
    }

    signin(request: AuthRequest, form: NgForm): Promise<void> {
        return this.modalPost<Authenticate>({
            Method: 'SignIn',
            Body: request,
            DeserializedType: Authenticate,
            SpinnerId: 'modalSpinner',
            Form: form
        }).then(auth => {
            this.userContext = auth;
            this.http.token = auth.Token;
            this.onUserContextChangedSubject.next();
        });
    }

    signUp(request: SignUpRequest, form: NgForm): Promise<void> {
        return this.modalPost<Authenticate>({
            Method: 'SignUp',
            Body: request,
            DeserializedType: Authenticate,
            SpinnerId: 'modalSpinner',
            Form: form
        }).then(auth => {
            this.userContext = auth;
            this.http.token = auth.Token;
            this.onUserContextChangedSubject.next();
        });
    }

    loadUserContext(): void {
        if (_.isEmpty(this.http.token)) {
            return;
        }
        this.get<Authenticate>({
            Method: 'IsAuthenticated',
            DeserializedType: Authenticate
        }).then(auth => {
            if (auth) {
                this.userContext = auth;
            } else {
                this.userContext = new Authenticate();
                this.http.token = null;
            }

            this.onUserContextChangedSubject.next();
        });
    }

    signout(): void {
        this.get<void>({ Method: 'SignOut' })
            .then(() => {
                this.userContext = new Authenticate();
                this.http.token = null;
                this.onUserContextChangedSubject.next();
                this.router.navigate(['/']);
            });
    }
}
