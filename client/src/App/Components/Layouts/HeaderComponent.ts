import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import * as _ from 'underscore';

import { Authenticate, AuthenticateService, ERoleGroup, ModalService } from '../../../Infrastructure';
import { AuthenticateModalComponent } from '../Modals/AuthenticateModalComponent';

declare var userContext: Authenticate;

@Component({
    selector: 'header',
    templateUrl: 'HeaderComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    get userInfo(): string {
        return userContext.Profile && userContext.Profile.DisplayName;
    }

    get userIcon(): string {
        let roles = userContext && userContext.RoleGroups;

        if (!_.isEmpty(_.intersection(roles, [ERoleGroup[ERoleGroup.ADMINISTRATOR], ERoleGroup[ERoleGroup.MANAGER]]))) {
            return 'fa-tachometer';
        } else if (_.contains(roles, ERoleGroup[ERoleGroup.AUTHORIZED])) {
            return 'fa-cog';
        }

        return 'fa-user-circle';
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    constructor(private authService: AuthenticateService,
        private modalService: ModalService,
        private cdr: ChangeDetectorRef
    ) {
        this.authService.onUserContextChanged.subscribe(() => this.cdr.markForCheck());
    }

    login(): void {
        this.modalService.show(AuthenticateModalComponent);
    }

    logout(): void {
        this.authService.signout();
    }
}
