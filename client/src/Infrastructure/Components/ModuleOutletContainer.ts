import {
    Compiler,
    Component,
    ComponentRef,
    Injector,
    Input,
    NgModuleRef,
    OnInit,
    ReflectiveInjector,
    Renderer2 as Renderer,
    SystemJsNgModuleLoader,
    ValueProvider,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';
import { Router } from '@angular/router';

import { ModuleHostDirective } from '../Directives/ModuleHostDirective';
import { CommonService } from '../Services/CommonService';
import { ModuleInstance } from '../Services/ModuleInstance';
import { ModuleParameter } from '../Services/ModuleParameter';
import { ModuleService } from '../Services/ModuleService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'module-outlet-container',
    template: `
        <spinner id="globalSpinner" fxLayout="column" fxFlexFill>
            <module-header [instance]="instance"></module-header>
            <div fxFlex>
                <ng-content></ng-content>
                <module-host></module-host>
            </div>
        </spinner>`,
    styleUrls: ['../Styles/Components/ModuleOutlet.scss']
})
export class ModuleOutletContainer extends BaseComponent implements OnInit {
    @ViewChild(ModuleHostDirective) moduleHost: ModuleHostDirective;

    @Input() instance: ModuleInstance;

    constructor(commonService: CommonService,
        private moduleService: ModuleService,
        private compiler: Compiler,
        private injector: Injector,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer,
        private loader: SystemJsNgModuleLoader,
        private router: Router
    ) {
        super(commonService);
    }

    public ngOnInit(): void {
        this.loader.load(this.instance.Module.Path)
            .then(ngModuleFactory => {
                var moduleInstanceProvider: ValueProvider = { provide: ModuleInstance, useValue: this.instance };
                var parameterInstance = new ModuleParameter();
                parameterInstance.setParameter(this.instance.Parameters);
                var moduleParameterProvider: ValueProvider = { provide: ModuleParameter, useValue: parameterInstance };
                var injector = ReflectiveInjector.resolveAndCreate([moduleInstanceProvider, moduleParameterProvider], this.injector);
                var moduleRef: NgModuleRef<any> = ngModuleFactory.create(injector);
                this.instance.ModuleRef = moduleRef;
                this.moduleService.setActive(this.instance);
                this.moduleDoBootstrap();
            });
    }

    private moduleDoBootstrap(): void {
        var moduleRef: InternalNgModuleRef<any> = this.instance.ModuleRef as InternalNgModuleRef<any>;
        var boostrapComponent = moduleRef._bootstrapComponents[0];
        var componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(boostrapComponent);
        this.viewContainerRef.clear();
        let componentRef: ComponentRef<any> = this.moduleHost.viewContainerRef.createComponent(componentFactory);
        this.instance.ComponentRef = componentRef;
        this.renderer.setAttribute(componentRef.location.nativeElement, 'instance-id', this.instance.Id);
        this.renderer.addClass(componentRef.location.nativeElement, 'loading');
        this.renderer.addClass(componentRef.location.nativeElement, 'module-root');
        if (this.instance.Classes) {
            this.renderer.addClass(componentRef.location.nativeElement, this.instance.Classes);
        }
    }
}
