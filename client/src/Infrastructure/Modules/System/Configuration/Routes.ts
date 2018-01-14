import { Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { ConfigurationContainerComponent } from './Components/ConfigurationContainerComponent';

export const ROUTES: Routes = [
    { path: '', component: ConfigurationContainerComponent, canActivate:[AuthenticateActivate] }
];
