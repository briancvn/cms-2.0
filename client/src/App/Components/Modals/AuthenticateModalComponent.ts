import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import * as _ from 'underscore';

import {
    AuthenticateService,
    AuthRequest,
    BaseModalComponent,
    CommonService,
    EModalSize,
    SignUpRequest,
    TranslateService,
    EReferenceDataKind
} from '../../../Infrastructure';

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
    static size = EModalSize.SMALL;

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    readonly EAuthenticationType = EAuthenticationType;

    authType: EAuthenticationType = EAuthenticationType.SignIn;
    signInRequest: AuthRequest = new AuthRequest();
    signUpRequest: SignUpRequest = new SignUpRequest();
    isCaptchaInvalid = true;

    get isSubmitisabled(): boolean {
        return !this.form.dirty || this.form.invalid || this.isCaptchaInvalid;
    }

    get language(): string {
        return this.commonService.translateService.language;
    }

    constructor(commonService: CommonService,
        dialogRef: MatDialogRef<AuthenticateModalComponent>,
        private authService: AuthenticateService
    ) {
        super(commonService, dialogRef);
        this.commonService.referenceDataService.register([
            EReferenceDataKind.Boolean,
            EReferenceDataKind.Gender
        ]);
    }

    signIn(): void {
        this.authService.signin(this.signInRequest, this.form).then(() => this.close());
    }

    signUp(): void {
        this.authService.signUp(this.signUpRequest, this.form).then(() => this.close());
    }

    register(): void {
        this.isCaptchaInvalid = true;
        this.authType = EAuthenticationType.SignUp;
        this.signInRequest = null;
        this.signUpRequest = new SignUpRequest();
        this.updateSize(EModalSize.EXTRA_SMALL);
    }

    forgotPassword(): void {
        console.log('Not implemented');
    }

    handleCorrectCaptcha(respone): void {
        this.isCaptchaInvalid = _.isEmpty(this.captcha.getResponse());
    }
}
