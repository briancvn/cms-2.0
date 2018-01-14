import { Routes } from '@angular/router';

import { AuthenticateActivate, RouteProvider } from '../Infrastructure';
import { HomeComponent } from './Components/HomeComponent';
import { ModuleContainer } from './Components/ModuleContainer';
import { ModuleConstants } from './Constants/ModuleConstants';

export const ROUTES: Routes = [
    { path: RouteProvider.ROOT, component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: RouteProvider.MODULE_ROUTE,
        component: ModuleContainer,
        canActivate:[AuthenticateActivate],
        children: [
            { path: ModuleConstants.Configuration.Name, loadChildren: 'Infrastructure/Modules/System/Configuration/Boot#ConfigurationModule' },
            { path: ModuleConstants.User.Name, loadChildren: 'Infrastructure/Modules/System/User/Boot#UserModule' }
        ]
    }
];

