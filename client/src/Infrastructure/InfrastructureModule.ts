import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { INFRASTRUCTURE_COMPONENTS } from './Components';
import { INFRASTRUCTURE_DIRECTIVES } from './Directives';
import { INFRASTRUCTURE_PIPES } from './Pipes';
import { Reflector, ReflectorReader, TokenInterceptor } from './Services';
import { reflector } from './Services/Reflection/Reflection';

const MATERIAL_MODULES = [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule
];

const INFRASTRUCTURE_EXTERNAL_MODULES = [
    ...MATERIAL_MODULES,
    FlexLayoutModule
];

export const INFRASTRUCTURE_ENTRY_COMPONENTS: Type<any>[] = [];

export const INFRASTRUCTURE_COMPONENTS_DIRECTIVES: Type<any>[] = [
    ...INFRASTRUCTURE_COMPONENTS,
    ...INFRASTRUCTURE_DIRECTIVES
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        ...INFRASTRUCTURE_EXTERNAL_MODULES
    ],
    declarations: [
        ...INFRASTRUCTURE_COMPONENTS_DIRECTIVES,
        ...INFRASTRUCTURE_PIPES
    ],
    entryComponents: [
        ...INFRASTRUCTURE_ENTRY_COMPONENTS
    ],
    providers: [
        TokenInterceptor,
        { provide: Reflector, useValue: reflector },
        { provide: ReflectorReader, useValue: reflector },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ...INFRASTRUCTURE_EXTERNAL_MODULES,
        ...INFRASTRUCTURE_COMPONENTS_DIRECTIVES,
        ...INFRASTRUCTURE_PIPES
    ]
})
export class InfrastructureModule {}
