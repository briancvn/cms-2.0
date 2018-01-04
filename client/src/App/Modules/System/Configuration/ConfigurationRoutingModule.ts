import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../../Infrastructure';
import { ConfigurationContainerComponent } from './Components/ConfigurationContainerComponent';

export const routes: Routes = [
    { path: '', component: ConfigurationContainerComponent, canActivate:[AuthenticateActivate] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class ConfigurationRoutingModule {}
