import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { MessagesComponent } from './MessagesComponent';
import { ModalComponent } from './ModalComponent';
import { ModalMessagesComponent } from './ModalMessagesComponent';
import { ModuleRouterOutletComponent } from './ModuleRouterOutletComponent';
import { SpinnerComponent } from './SpinnerComponent';

export const INFRASTRUCTURE_COMPONENTS = [
    ...INFRASTRUCTURE_CONTROLS_COMPONENTS,
    ModalComponent,
    SpinnerComponent,
    MessagesComponent,
    ModalMessagesComponent,
    ModuleRouterOutletComponent
];

export * from './Modals';
export * from './BaseComponent';
export * from './BaseContentComponent';
export * from './BaseRouterBoot';
export * from './ModalComponent';
