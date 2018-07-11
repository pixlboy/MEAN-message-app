import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent {

}

//providers: [MessageService] will create one single instance of MessageService for all child components
