import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { CustomFormsModule } from 'ng2-validation';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { INFRASTRUCTURE_COMPONENTS } from './Components';
import { INFRASTRUCTURE_MODALS_COMPONENTS } from './Components/Modals';
import { INFRASTRUCTURE_DIRECTIVES } from './Directives';
import { INFRASTRUCTURE_PIPES } from './Pipes';
import { TokenInterceptor } from './Services/TokenInterceptor';
import { reflector } from './Utils/Reflection/Reflection';
import { ReflectorReader } from './Utils/Reflection/ReflectionReader';
import { Reflector } from './Utils/Reflection/Reflector';

const MATERIAL_MODULES = [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
];

const INFRASTRUCTURE_EXTERNAL_MODULES = [
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    ReCaptchaModule,
    PerfectScrollbarModule,
    PasswordStrengthBarModule,
    CustomFormsModule
];

export const INFRASTRUCTURE_ENTRY_COMPONENTS: Type<any>[] = [
    ...INFRASTRUCTURE_MODALS_COMPONENTS
];

export const INFRASTRUCTURE_COMPONENTS_DIRECTIVES: Type<any>[] = [
    ...INFRASTRUCTURE_COMPONENTS,
    ...INFRASTRUCTURE_ENTRY_COMPONENTS,
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
