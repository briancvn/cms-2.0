import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import * as _ from 'underscore';

import { AuthenticateService, AuthRequest, BaseModalComponent, TranslateService } from '../../../Infrastructure';

enum EAuthenticationType {
    SignIn,
    SignUp,
    ForgotPassword
}

@Component({
    selector: 'authenticate-modal',
    templateUrl: 'AuthenticateModalComponent.html',
    styleUrls: ['../../../Styles/Modals/AuthenticateModal.scss']
})
export class AuthenticateModalComponent extends BaseModalComponent<AuthenticateModalComponent> {
    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    readonly EAuthenticationType = EAuthenticationType;

    authType: EAuthenticationType = EAuthenticationType.SignIn;
    signInRequest: AuthRequest = new AuthRequest();
    isCaptchaInvalid = true;

    get isSubmitisabled(): boolean {
        return !this.form.dirty || this.form.invalid || this.isCaptchaInvalid;
    }

    constructor(dialogRef: MatDialogRef<AuthenticateModalComponent>,
        public translateService: TranslateService,
        private authService: AuthenticateService
    ) {
        super(dialogRef);
    }

    signIn(): void {
        this.authService.signin(this.signInRequest).then(() => this.close());
    }

    register(): void {}

    forgotPassword(): void {}

    handleCorrectCaptcha(respone): void {
        this.isCaptchaInvalid = _.isEmpty(this.captcha.getResponse());
    }
}
