import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { MessageModule } from "./messages/message.module";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./errors/error.service"
import { ErrorComponent } from "./errors/error.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,    //we cannot remove this component bacuse we use this routing section
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing, //default router module cannot be imported as it won't include custom routes
        HttpModule,      //unlocks the inbuilt http service
        MessageModule
    ],
    providers: [AuthService, ErrorService],     //inject service which are to be used across application here
    bootstrap: [AppComponent]
})
export class AppModule {

}
