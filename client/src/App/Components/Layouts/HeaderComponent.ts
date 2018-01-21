import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import * as _ from 'underscore';

import { AuthenticateService, BaseComponent, CommonService, ERoleGroup, ModalService, ModuleService } from '../../../Infrastructure';
import { AuthenticateModalComponent } from '../Modals/AuthenticateModalComponent';

@Component({
    selector: 'header',
    templateUrl: 'HeaderComponent.html',
    styleUrls: ['../../../Styles/Layouts/Header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends BaseComponent {
    get userInfo(): string {
        return this.userContext.Profile && this.userContext.Profile.DisplayName;
    }

    get userIcon(): string {
        let roles = this.userContext && this.userContext.RoleGroups;

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

    constructor(commonService: CommonService,
        public moduleService: ModuleService,
        private modalService: ModalService,
        private authService: AuthenticateService,
        private cdr: ChangeDetectorRef
    ) {
        super(commonService);
        this.authService.onUserContextChanged.subscribe(() => this.cdr.markForCheck());
    }

    login(): void {
        this.modalService.show(AuthenticateModalComponent);
    }

    logout(): void {
        this.authService.signout();
    }
}
