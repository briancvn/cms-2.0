import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { reflector } from './Utils/Reflection/Reflection';
import { ReflectorReader } from './Utils/Reflection/ReflectionReader';
import { Reflector } from './Utils/Reflection/Reflector';
import { InfrastructureCoreModule } from './InfrastructureCoreModule';
import { TokenInterceptor } from './Services/TokenInterceptor';
import { ModuleOutletContainerComponent } from './Components/ModuleOutletContainerComponent';

@NgModule({
    imports: [
        InfrastructureCoreModule
    ],
    declarations: [
        ModuleOutletContainerComponent
    ],
    providers: [
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
