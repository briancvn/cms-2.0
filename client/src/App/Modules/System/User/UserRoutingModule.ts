import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateActivate } from '../../../../Infrastructure';
import { UserContainerComponent } from './Components/UserContainerComponent';

export const routes: Routes = [
    { path: '', component: UserContainerComponent, canActivate:[AuthenticateActivate] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class UserRoutingModule {}
