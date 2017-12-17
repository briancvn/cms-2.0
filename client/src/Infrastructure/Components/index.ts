import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { ModalComponent } from './ModalComponent';

export const INFRASTRUCTURE_COMPONENTS = [
    ...INFRASTRUCTURE_CONTROLS_COMPONENTS,
    ModalComponent
];

export * from './Modals';
export * from './BaseComponent';
export * from './ModalComponent';
