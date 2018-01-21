import { Injectable } from '@angular/core';

import { BaseService } from './BaseService';

export enum LogLevel {
    Info,
    Debug,
    Warn,
    Error,
    Fatal,
    Trace
}

@Injectable()
export class LogService extends BaseService {
    static debugEnabled = true;
    static errorEnabled = true;
    static infoEnabled = true;
    static fatalEnabled = true;
    static LogTimeFormat = 'DD.MM.YYYY HH:mm:ss:SSS';

    log(msg: string): void {
        this.info(msg);
    }

    info(msg: string): void {
        this.sendLog(msg, LogLevel.Info);
    }

    debug(msg: string): void {
        this.sendLog(msg, LogLevel.Debug);
    }

    warn(msg: string): void {
        this.sendLog(msg, LogLevel.Warn);
    }

    error(msg: string): void {
        this.sendLog(msg, LogLevel.Error);
    }

    private sendLog(msg: string, level: LogLevel): void {
        console.log(msg);
    }
}


