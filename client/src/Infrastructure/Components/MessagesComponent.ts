import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import * as _ from 'underscore';

import { EMessageType } from '../Enums/EMessageType';
import { IMessage } from '../Interfaces/IMessage';
import { CommonService } from '../Services/CommonService';
import { HttpClientService } from '../Services/HttpClientService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'messages',
    template: `
        <div [@messageContainer]="hidden ? 'hide' : 'show'">
            <div *ngFor="let message of messages">
                {{ message.Type }} - {{ message.Message }}
            </div>
        </div>`,
    animations: [
        trigger('messageContainer', [
            state('show', style({ opacity: 1 })),
            state('hide', style({ opacity: 0 })),
            transition('show => hide', animate('300ms ease-out')),
            transition('hide => show', animate('300ms ease-in'))
        ])
    ],
    styleUrls: ['../Styles/Components/Messages.scss']
})
export class MessagesComponent extends BaseComponent {
    public messages: IMessage[] = [];

    get hidden(): boolean {
        return _.isEmpty(this.messages);
    }

    constructor(commonService: CommonService, protected httpService: HttpClientService) {
        super(commonService);
        this.init();
    }

    protected init(): void {
        this.httpService.beforeRequest.subscribe(() => this.messages = []);
        this.httpService.afterResponse.subscribe(response => {
            response.ValidationErrors.forEach(error => this.messages.push({ Message: error.Message, Type: EMessageType.Error }));
        });
    }
}
