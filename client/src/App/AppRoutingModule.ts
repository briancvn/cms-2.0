import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateActivate } from '../Infrastructure';
import { HomeComponent } from './Components/HomeComponent';
import { ModuleContainerComponent } from './Components/ModuleContainerComponent';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'module-container', component: ModuleContainerComponent, canActivate:[AuthenticateActivate] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
