import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { authRouting } from "./auth.routing";
import { LogoutComponent } from "./logout.component";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";

@NgModule({
    declarations: [
        LogoutComponent,
        SignupComponent,
        SigninComponent,
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ],
    providers: []     //ng2 will create instance of MessageService and pass it to the constructor
})

export class AuthModule{

}
