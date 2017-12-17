
import { HeaderComponent } from './Layouts/HeaderComponent';
import { FooterComponent } from './Layouts/FooterComponent';
import { AuthenticateModalComponent } from './Modals/AuthenticateModalComponent';
import { HomeComponent } from './HomeComponent';

export const APP_ENTRY_COMPONENTS = [
    AuthenticateModalComponent
];

export const APP_COMPONENTS = [
    ...APP_ENTRY_COMPONENTS,
    HeaderComponent,
    FooterComponent,
    HomeComponent
];
