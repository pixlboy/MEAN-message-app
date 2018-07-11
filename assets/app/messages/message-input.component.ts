import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MessageService } from './message.service';
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit {
    message : Message;           //default is empty
    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm){
        if(this.message){
            //Edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        } else {
            //Create
            const message = new Message(form.value.content, "Jill");
            this.messageService.addMessage(message)
                //Until a subscription is made, the HTTP request will not be fired
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        this.message = null;
        form.resetForm();       //Built in method
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();       //Built in method
    }

    //When the edit button is clicked in other component, the subsrciption is invoked
    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message         //set the message to the one passed through event emitter
        )
    }
}
