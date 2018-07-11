import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/messages', pathMatch: 'full'},  //PathMatch: 'full' ensures that redirection only happens when path is blank
    {path: 'messages', component: MessagesComponent},
    {path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule'}   //a webpack package converts the './auth/auth.module#AuthModule' into a function
]

export const routing = RouterModule.forRoot(APP_ROUTES);        //registers the routes in ng2 application


//forRoot is used to register the router for complete app

//--> If we do not lazy load the Auth Module

//import { AUTH_ROUTES } from "./auth/auth.routes";
//use - children: AUTH_ROUTES}

//--> If we use Lazy Loading
//use - loadChildren: './auth/auth.module#AuthModule'
