import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AuthenticateService, INFRASTRUCTURE_SERVICES, InfrastructureModule, SystemService } from '../Infrastructure';
import { ROUTES } from './AppRoutes';
import { APP_COMPONENTS, APP_ENTRY_COMPONENTS } from './Components';
import { AppComponent } from './Components/AppComponent';
import { APP_SERVICES } from './Services';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InfrastructureModule,
        RouterModule.forRoot(ROUTES)
    ],
    declarations: [
        AppComponent,
        ...APP_COMPONENTS
    ],
    entryComponents: [
        ...APP_ENTRY_COMPONENTS
    ],
    providers: [
        ...INFRASTRUCTURE_SERVICES,
        ...APP_SERVICES
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(authService: AuthenticateService, systemService: SystemService) {
        systemService.getSettings().then(() => authService.loadUserContext());
    }
}
