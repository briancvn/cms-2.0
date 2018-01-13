import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { ConfigurationContainerComponent } from './Components/ConfigurationContainerComponent';

const routes: Routes = [
    { path: 'configuration', component: ConfigurationContainerComponent, canActivate:[AuthenticateActivate] }
];

export const ROUTER_PROVIDERS = RouterModule.forChild(routes);
