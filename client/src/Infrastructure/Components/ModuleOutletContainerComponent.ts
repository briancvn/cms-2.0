import {
    Component,
    Input,
    Compiler,
    ReflectiveInjector,
    ValueProvider,
    Injector,
    NgModuleRef,
    ViewContainerRef,
    ComponentRef,
    ViewChild,
    Renderer2 as Renderer
} from '@angular/core';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';
import { Router } from '@angular/router';

import { ModuleInstance } from '../Models/ModuleInstance';
import { BaseComponent } from './BaseComponent';
import { CommonService } from '../Services/CommonService';
import { ModuleParameter } from '../Services/ModuleParameter';
import { ModuleHostDirective } from '../Directives/ModuleHostDirective';
import { ModuleService } from '../Services/ModuleService';
import { CommonConstants } from '../Constants/CommonConstants';

@Component({
    selector: 'module-outlet-container',
    template: `
        <spinner id="globalSpinner">
            <ng-content></ng-content>
            <module-host></module-host>
        </spinner>`
})
export class ModuleOutletContainerComponent extends BaseComponent {
    @ViewChild(ModuleHostDirective) moduleHost: ModuleHostDirective;

    @Input() moduleInstance: ModuleInstance;

    constructor(commonService: CommonService,
        private moduleService: ModuleService,
        private compiler: Compiler,
        private injector: Injector,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer
    ) {
        super(commonService);
    }

    protected onInit(): void {
        this.compiler.compileModuleAsync(this.moduleInstance.Module.ModuleType)
            .then(moduleType => {
                var moduleInstanceProvider: ValueProvider = { provide: ModuleInstance, useValue: this.moduleInstance };
                var parameterInstance = new ModuleParameter(this.moduleInstance.Parameters);
                var moduleParameterProvider: ValueProvider = { provide: ModuleParameter, useValue: parameterInstance };
                var injector = ReflectiveInjector.resolveAndCreate([moduleInstanceProvider, moduleParameterProvider], this.injector);
                var moduleRef: NgModuleRef<any> = <any>moduleType.create(injector);
                this.moduleInstance.ModuleRef = moduleRef;
                this.moduleDoBootstrap();
            })
    }

    private moduleDoBootstrap(): void {
        var moduleRef: InternalNgModuleRef<any> = this.moduleInstance.ModuleRef as InternalNgModuleRef<any>;
        if (moduleRef._bootstrapComponents.length === 1) {
            var boostrapComponent = moduleRef._bootstrapComponents[0];
            var componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(boostrapComponent);
            this.viewContainerRef.clear();
            let componentRef: ComponentRef<any> = this.moduleHost.viewContainerRef.createComponent(componentFactory);
            this.moduleInstance.ComponentRef = componentRef;
            this.renderer.setAttribute(componentRef.location.nativeElement, 'instance-id', this.moduleInstance.Id);
            this.renderer.addClass(componentRef.location.nativeElement, 'loading');
            this.renderer.addClass(componentRef.location.nativeElement, 'module-root');
            if (this.moduleInstance.Classes) {
                this.renderer.addClass(componentRef.location.nativeElement, this.moduleInstance.Classes);
            }
        } else if (moduleRef._bootstrapComponents.length === 0) {
            throw new Error(`No bootstrap component existing`);
        }
        else {
            throw new Error(`Expect only 1 bootstrap component for each module`);
        }
    }
}
