import { ComponentRef, NgModuleRef } from '@angular/core';
import { v4 } from 'uuid';

import { Module } from '../Models/Module';

export class ModuleInstance {
    public Id: string;
    public CorrelationId = v4();
    public ModuleRef: NgModuleRef<any>;
    public Parameters: {[key: string]: string} = {};
    public ComponentRef: ComponentRef<any>;
    public Active: boolean;

    constructor(id: number,
        public Title: string,
        public Module: Module,
        public Classes?: string
    ) {
        this.Id = `cms-module-${id}`;
    }
}
