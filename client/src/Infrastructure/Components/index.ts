import { INFRASTRUCTURE_CONTROLS_COMPONENTS } from './Controls';
import { ModalComponent } from './ModalComponent';
import { SpinnerComponent } from './SpinnerComponent';

export const INFRASTRUCTURE_COMPONENTS = [
    ...INFRASTRUCTURE_CONTROLS_COMPONENTS,
    ModalComponent,
    SpinnerComponent
];

export * from './Modals';
export * from './BaseComponent';
export * from './ModalComponent';
