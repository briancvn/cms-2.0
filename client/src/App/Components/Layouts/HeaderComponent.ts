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
    public get isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    constructor(commonService: CommonService,
        public moduleService: ModuleService,
        private modalService: ModalService,
        private authService: AuthenticateService,
        private cdr: ChangeDetectorRef
    ) {
        super(commonService);
        this.subscribe(this.authService.onUserContextChanged, () => this.cdr.markForCheck());
    }

    public login(): void {
        this.modalService.show(AuthenticateModalComponent);
    }

    public logout(): void {
        this.authService.signout();
    }
}
