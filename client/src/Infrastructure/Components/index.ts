import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { ModalComponent } from './ModalComponent';
import { SpinnerComponent } from './SpinnerComponent';
import { MessagesComponent } from './MessagesComponent';
import { ModalMessagesComponent } from './ModalMessagesComponent';
import { ModuleRouterOutletComponent } from './ModuleRouterOutletComponent';

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
