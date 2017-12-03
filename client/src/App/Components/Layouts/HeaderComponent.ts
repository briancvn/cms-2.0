import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Authenticate, AuthenticateService, IUserContext, ERole } from '../../../Infrastructure';

declare var userContext: IUserContext;

@Component({
    selector: 'header',
    templateUrl: 'HeaderComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    get userInfo(): string {
        return userContext && userContext.Profile
            ? `${userContext.Profile.FirstName} ${userContext.Profile.LastName}`
            : null;
    }

    get userIcon(): string {
        let role = userContext && userContext.Profile &&  userContext.Profile.Role;
        switch(role) {
            case ERole[ERole.Administrator]:
                return 'fa-tachometer';
            case ERole[ERole.User]:
                return 'fa-cog';
            default:
                return 'fa-user-circle';
        }
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    constructor(private authService: AuthenticateService, private cdr: ChangeDetectorRef) {
        this.authService.onUserContextChanged.subscribe(() => this.cdr.markForCheck());
    }

    login(): void {
        let request = new Authenticate();
        request.Username = 'admin';
        request.Password = 'test123';
        this.authService.authenticate(request);
    }

    logout(): void {
        this.authService.logout();
    }
}
