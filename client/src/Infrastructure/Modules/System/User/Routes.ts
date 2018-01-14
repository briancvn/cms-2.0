import { Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../Services/AuthenticateActivate';
import { UserContainer } from './Components/UserContainer';

export const ROUTES: Routes = [
    { path: '', component: UserContainer, canActivate:[AuthenticateActivate] }
];
