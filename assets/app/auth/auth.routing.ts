import { Routes, RouterModule } from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];

//Lazy Loading the Auth Module
export const authRouting = RouterModule.forChild(AUTH_ROUTES);


//No Lazy loading
// export const AUTH_ROUTES: Routes = [
//     { path: '', redirectTo: 'signup', pathMatch: 'full' },
//     { path: 'signup', component: SignupComponent },
//     { path: 'signin', component: SigninComponent },
//     { path: 'logout', component: LogoutComponent }
// ];
