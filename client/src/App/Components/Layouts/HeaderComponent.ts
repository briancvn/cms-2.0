import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { AuthenticateService, BaseComponent, CommonService, ModalService, ModuleService } from '../../../Infrastructure';
import { AuthenticateModalComponent } from '../Modals/AuthenticateModalComponent';

@Component({
    selector: 'header',
    templateUrl: 'HeaderComponent.html',
    styleUrls: ['../../../Styles/Layouts/Header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends BaseComponent {
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
