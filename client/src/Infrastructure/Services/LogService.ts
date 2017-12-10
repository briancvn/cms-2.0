import { Injectable } from '@angular/core';

import { Authenticate } from '../Models/Authenticate';

declare var userContext: Authenticate;

export enum LogLevel {
    Info,
    Debug,
    Warn,
    Error,
    Fatal,
    Trace
}

export class LogInfo {
    ElapsedTime?: number;
    Message: string;
    LogLevel: LogLevel;
    CorrelationId: string;

    constructor(msg: string, level: LogLevel, correlationId?: string, elapsedTime?: number) {
        this.Message = msg;
        this.LogLevel = level;
        this.ElapsedTime = elapsedTime;
        this.CorrelationId = correlationId;
    }
}

@Injectable()
export class LogService {
    static debugEnabled = true;
    static errorEnabled = true;
    static infoEnabled = true;
    static fatalEnabled = true;
    static LogTimeFormat = 'DD.MM.YYYY HH:mm:ss:SSS';

    public log(msg: string): void {
        this.info(msg);
    }

    public info(msg: string): void {
        this.sendLog(msg, LogLevel.Info);
    }

    public debug(msg: string): void {
        this.sendLog(msg, LogLevel.Debug);
    }
    public warn(msg: string): void {
        this.sendLog(msg, LogLevel.Warn);
    }
    public error(msg: string): void {
        this.sendLog(msg, LogLevel.Error);
    }

    private sendLog(msg: string, level: LogLevel): void {
        console.log(msg);
    }
}


