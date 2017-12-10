import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { AuthRequest, AuthenticateService, Authenticate, ERole } from '../../../Infrastructure';

declare var userContext: Authenticate;

@Component({
    selector: 'header',
    templateUrl: 'HeaderComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    get userInfo(): string {
        return userContext.User && userContext.User.DisplayName;
    }

    get userIcon(): string {
        let role = userContext && userContext.User &&  userContext.User.Role;
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
        let request = new AuthRequest();
        request.Username = 'admin';
        request.Password = 'test123';
        this.authService.login(request);
    }

    logout(): void {
        this.authService.logout();
    }
}
