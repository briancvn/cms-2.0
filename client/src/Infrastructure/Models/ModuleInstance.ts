import { ComponentRef, NgModuleRef } from '@angular/core';
import { v4 } from 'uuid';
import { Module } from './Module';

export class ModuleInstance {
    public CorrelationId = v4();
    public ModuleRef: NgModuleRef<any>;
    public Parameters: {[key: string]: string} = {};
    public ComponentRef: ComponentRef<any>;

    constructor(public Id: string,
        public Title: string,
        public Module: Module,
        public Classes?: string
    ) {}
}
