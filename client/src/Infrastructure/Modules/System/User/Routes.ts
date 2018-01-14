import { Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { UserContainerComponent } from './Components/UserContainerComponent';

export const ROUTES: Routes = [
    { path: '', component: UserContainerComponent, canActivate:[AuthenticateActivate] }
];
