import {
    Compiler,
    Component,
    ComponentRef,
    Injector,
    Input,
    NgModuleRef,
    ReflectiveInjector,
    Renderer2 as Renderer,
    ValueProvider,
    ViewChild,
    ViewContainerRef,
    SystemJsNgModuleLoader
} from '@angular/core';
import { AotCompiler } from '@angular/compiler';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';

import { ModuleHostDirective } from '../Directives/ModuleHostDirective';
import { ModuleInstance } from '../Models/ModuleInstance';
import { CommonService } from '../Services/CommonService';
import { ModuleParameter } from '../Services/ModuleParameter';
import { ModuleService } from '../Services/ModuleService';
import { BaseComponent } from './BaseComponent';
import { ModuleNavigationService } from '../Services/ModuleNavigationService';

@Component({
    selector: 'module-outlet-container',
    template: `
        <spinner id="globalSpinner">
            <ng-content></ng-content>
            <module-host></module-host>
        </spinner>`,
    providers: [ModuleNavigationService]
})
export class ModuleOutletContainerComponent extends BaseComponent {
    @ViewChild(ModuleHostDirective) moduleHost: ModuleHostDirective;

    @Input() moduleInstance: ModuleInstance;

    constructor(commonService: CommonService,
        private moduleService: ModuleService,
        private compiler: Compiler,
        //private aotCompiler: AotCompiler,
        private injector: Injector,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer,
        private navigationService: ModuleNavigationService,
        private loader: SystemJsNgModuleLoader
    ) {
        super(commonService);
    }

    protected onInit(): void {
        this.loader.load(this.moduleInstance.Module.Path)
            .then(ngModuleFactory => {
                var moduleInstanceProvider: ValueProvider = { provide: ModuleInstance, useValue: this.moduleInstance };
                var parameterInstance = new ModuleParameter();
                parameterInstance.setParameter(this.moduleInstance.Parameters);
                var moduleParameterProvider: ValueProvider = { provide: ModuleParameter, useValue: parameterInstance };
                var injector = ReflectiveInjector.resolveAndCreate([moduleInstanceProvider, moduleParameterProvider], this.injector);
                var moduleRef: NgModuleRef<any> = ngModuleFactory.create(injector);
                this.moduleInstance.ModuleRef = moduleRef;
                this.moduleService.setActive(this.moduleInstance);
                this.navigationService.moduleInstance = this.moduleInstance;
                this.moduleDoBootstrap();
            });
    }

    private moduleDoBootstrap(): void {
        var moduleRef: InternalNgModuleRef<any> = this.moduleInstance.ModuleRef as InternalNgModuleRef<any>;
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
    }
}
