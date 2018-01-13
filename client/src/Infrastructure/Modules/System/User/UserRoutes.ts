import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { UserContainerComponent } from './Components/UserContainerComponent';

const routes: Routes = [
    { path: '', component: UserContainerComponent, canActivate:[AuthenticateActivate] }
];

export const ROUTER_PROVIDERS = RouterModule.forChild(routes);
