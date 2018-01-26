import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { MessagesComponent } from './MessagesComponent';
import { ModalComponent } from './ModalComponent';
import { ModalMessagesComponent } from './ModalMessagesComponent';
import { ModuleDetailComponent } from './ModuleDetailComponent';
import { ModuleRouterOutletComponent } from './ModuleRouterOutletComponent';
import { ModuleSearchComponent } from './ModuleSearchComponent';
import { SpinnerComponent } from './SpinnerComponent';

export const INFRASTRUCTURE_COMPONENTS = [
    ...INFRASTRUCTURE_CONTROLS_COMPONENTS,
    MessagesComponent,
    ModalComponent,
    ModalMessagesComponent,
    ModuleDetailComponent,
    ModuleRouterOutletComponent,
    ModuleSearchComponent,
    SpinnerComponent
];

export * from './Modals';
export * from './BaseComponent';
export * from './BaseContentComponent';
export * from './BaseRouterBoot';
export * from './ModalComponent';
