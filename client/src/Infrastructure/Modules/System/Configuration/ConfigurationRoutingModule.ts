import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { ConfigurationContainerComponent } from './Components/ConfigurationContainerComponent';

export const routes: Routes = [
    { path: '', component: ConfigurationContainerComponent, canActivate:[AuthenticateActivate] }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ConfigurationRoutingModule {}
