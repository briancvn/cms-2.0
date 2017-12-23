import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { ModalComponent } from './ModalComponent';
import { SpinnerComponent } from './SpinnerComponent';
import { MessagesComponent } from './MessagesComponent';
import { ModalMessagesComponent } from './ModalMessagesComponent';

export const INFRASTRUCTURE_COMPONENTS = [
    ...INFRASTRUCTURE_CONTROLS_COMPONENTS,
    ModalComponent,
    SpinnerComponent,
    MessagesComponent,
    ModalMessagesComponent
];

export * from './Modals';
export * from './BaseComponent';
export * from './ModalComponent';
