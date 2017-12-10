export class InfrastructureContext {
    static SessionTimeoutKey = 'SessionTimeoutOccuredKey';

    public static getIsInSessionTimeout(): boolean {
        return <boolean>window.top[InfrastructureContext.SessionTimeoutKey];
    }

    public static setIsInSessionTimeout(): void {
        window.top[InfrastructureContext.SessionTimeoutKey] = true;
    }
}
