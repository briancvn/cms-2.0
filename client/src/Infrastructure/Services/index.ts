import { AuthenticateService } from './AuthenticateService';
import { ModalService } from './ModalService';

export const INFRASTRUCTURE_SERVICES = [
    AuthenticateService,
    ModalService
];

export * from './BaseBackendService';
export * from './TokenInterceptor';

export * from './AuthenticateService';
export * from './ModalService';
