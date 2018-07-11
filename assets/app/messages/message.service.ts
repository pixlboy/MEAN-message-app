import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from "../errors/error.service";

import { Message } from "./message.model";

//Adds a metadata to the service
@Injectable()
export class MessageService {

    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();        //emits a message object

    constructor(private http: Http, private errorService: ErrorService) {}

    //http call to CREATE a message
    addMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-type': 'application/json'});
        const token = localStorage.getItem('token')
            ? `?token=${localStorage.getItem('token')}`
            : '';
        //this does not sends a request, it just sets an observable
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
                .map((response: Response) => {
                    const result = response.json();
                    const message = new Message(
                        result.obj.content,
                        result.obj.user.firstName,
                        result.obj._id,
                        result.obj.user._id);      //set the message object after adding amessage to keep the Id in sync
                    this.messages.push(message);
                    return message; //return for the subscribe method
                })
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json()) //explicit throw is used as catch does not sets an observable by default
                });
    }

    //http call to READ messages
    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for(let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id)
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json()) //explicit throw is used as catch does not sets an observable by default
            });
    }

    //middleman between message.input and message component
    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    //http call to UPDATE/PATCH a message
    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-type': 'application/json'});
        const token = localStorage.getItem('token')
            ? `?token=${localStorage.getItem('token')}`
            : '';
        //this does not sends a request, it just sets an observable
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json()) //explicit throw is used as catch does not sets an observable by default
            });
    }

    //http call to DELETE a message
    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
            ? `?token=${localStorage.getItem('token')}`
            : '';
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json()) //explicit throw is used as catch does not sets an observable by default
            });
    }
}
