import { Component } from '@angular/core';

@Component({
    selector: 'module-router-outlet',
    template: `
        <div class="container-fluid module-container">
            <router-outlet></router-outlet>
        </div>`
})
export class ModuleRouterOutletComponent {}
