import { AfterViewInit, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export abstract class BaseComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @ViewChild(NgForm) form: NgForm;

    protected isReadOnly: boolean;
    protected isEditable: boolean;

    ngOnInit(): void {
        this.onInit();
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges(changes);
    }

    ngOnDestroy(): void {
        this.onDestroy();
    }

    protected onInit(): void {
        // Virtual method
    }

    protected afterViewInit(): void {
        // Virtual method
    }

    protected onChanges(changes: SimpleChanges): void {
        // Virtual method
    }

    protected onDestroy(): void {
        // Virtual method
    }
}
