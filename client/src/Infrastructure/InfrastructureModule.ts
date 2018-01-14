import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';

import { ModuleOutletContainerComponent } from './Components/ModuleOutletContainerComponent';
import { InfrastructureCoreModule } from './InfrastructureCoreModule';
import { TokenInterceptor } from './Services/TokenInterceptor';
import { reflector } from './Utils/Reflection/Reflection';
import { ReflectorReader } from './Utils/Reflection/ReflectionReader';
import { Reflector } from './Utils/Reflection/Reflector';

@NgModule({
    imports: [
        InfrastructureCoreModule
    ],
    declarations: [
        ModuleOutletContainerComponent
    ],
    providers: [
        SystemJsNgModuleLoader,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: Reflector, useValue: reflector },
        { provide: ReflectorReader, useValue: reflector },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    exports: [
        ModuleOutletContainerComponent,
        InfrastructureCoreModule
    ]
})
export class InfrastructureModule {}
