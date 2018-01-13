import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: 'module-host',
})
export class ModuleHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
