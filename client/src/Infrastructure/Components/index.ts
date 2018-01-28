import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { GridColumnComponent } from './GridColumnComponent';
import { GridComponent } from './GridComponent';
import { MessagesComponent } from './MessagesComponent';
import { ModalComponent } from './ModalComponent';
import { ModalMessagesComponent } from './ModalMessagesComponent';
import { ModuleDetailComponent } from './ModuleDetailComponent';
import { ModuleRouterOutletComponent } from './ModuleRouterOutletComponent';
import { ModuleSearchComponent } from './ModuleSearchComponent';
import { SearchFieldComponent } from './SearchFieldComponent';
import { SpinnerComponent } from './SpinnerComponent';

export const INFRASTRUCTURE_COMPONENTS = [
    ...INFRASTRUCTURE_CONTROLS_COMPONENTS,
    GridColumnComponent,
    GridComponent,
    MessagesComponent,
    ModalComponent,
    ModalMessagesComponent,
    ModuleDetailComponent,
    ModuleRouterOutletComponent,
    ModuleSearchComponent,
    SearchFieldComponent,
    SpinnerComponent
];

export * from './Modals';
export * from './BaseComponent';
export * from './BaseContentComponent';
export * from './BaseRouterBoot';
export * from './ModalComponent';
