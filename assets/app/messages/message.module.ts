import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MessageService } from "./message.service";
import { MessageComponent } from "./message.component";
import { MessageListComponent } from "./message-list.component";
import { MessageInputComponent } from "./message-input.component";
import { MessagesComponent } from "./messages.component";

@NgModule({
    declarations: [
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent
    ],
    imports : [
        CommonModule,
        FormsModule
    ],
    providers: [MessageService]     //ng2 will create instance of MessageService and pass it to the constructor
})

export class MessageModule{

}
