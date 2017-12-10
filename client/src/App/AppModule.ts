import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticateService, INFRASTRUCTURE_SERVICES, InfrastructureModule, Authenticate } from '../Infrastructure';
import { AppRoutingModule } from './AppRoutingModule';
import { APP_COMPONENTS, APP_ENTRY_COMPONENTS } from './Components';
import { AppComponent } from './Components/AppComponent';
import { APP_SERVICES } from './Services';

declare var userContext: Authenticate;

@NgModule({
    imports: [
        BrowserModule,
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
    constructor(authService: AuthenticateService) {
        authService.loadUserContext();
    }
}
