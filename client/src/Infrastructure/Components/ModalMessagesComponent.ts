import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { EMessageType } from '../Enums/EMessageType';
import { CommonService } from '../Services/CommonService';
import { HttpClientService } from '../Services/HttpClientService';
import { MessagesComponent } from './MessagesComponent';

@Component({
    selector: 'modal-messages',
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
export class ModalMessagesComponent extends MessagesComponent {
    constructor(commonService: CommonService, httpService: HttpClientService) {
        super(commonService, httpService);
    }

    protected init(): void {
        this.httpService.beforeModalRequest.subscribe(() => this.messages = []);
        this.httpService.afterModalResponse.subscribe(response => {
            response.ValidationErrors.forEach(error => this.messages.push({ Message: error.Message, Type: EMessageType.Error }));
        });
    }
}
