declare var global;

export class InfrastructureContext {
    static SessionTimeoutKey = 'SessionTimeoutOccuredKey';

    public static getIsInSessionTimeout(): boolean {
        return Boolean([InfrastructureContext.SessionTimeoutKey]);
    }

    public static setIsInSessionTimeout(): void {
        global[InfrastructureContext.SessionTimeoutKey] = true;
    }
}
