import { Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { ConfigurationContainer } from './Components/ConfigurationContainer';

export const ROUTES: Routes = [
    { path: '', component: ConfigurationContainer, canActivate:[AuthenticateActivate] }
];
