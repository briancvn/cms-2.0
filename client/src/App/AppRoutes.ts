import { Routes } from '@angular/router';

import { AuthenticateActivate, RouteProvider } from '../Infrastructure';
import { HomeComponent } from './Components/HomeComponent';
import { ModuleContainerComponent } from './Components/ModuleContainerComponent';
import { ModuleConstants } from './Constants/ModuleConstants';

export const ROUTES: Routes = [
    { path: RouteProvider.ROOT, component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: RouteProvider.MODULE_ROUTE,
        component: ModuleContainerComponent,
        canActivate:[AuthenticateActivate],
        children: [
            { path: ModuleConstants.Configuration.Name, loadChildren: ModuleConstants.Configuration.Path },
            { path: ModuleConstants.User.Name, loadChildren: ModuleConstants.User.Path }
        ]
    }
];

