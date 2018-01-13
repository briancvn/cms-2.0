import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    Authenticate,
    AuthenticateService,
    INFRASTRUCTURE_SERVICES,
    InfrastructureModule,
    SystemService,
} from '../Infrastructure';
import { AppRoutingModule } from './AppRoutingModule';
import { APP_COMPONENTS, APP_ENTRY_COMPONENTS } from './Components';
import { AppComponent } from './Components/AppComponent';
import { APP_SERVICES } from './Services';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InfrastructureModule,
        AppRoutingModule
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
