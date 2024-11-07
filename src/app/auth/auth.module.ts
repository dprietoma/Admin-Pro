import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,

    ],
    imports: [
        BrowserModule,
        RouterModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
    ],
    providers: [],
})
export class AuthModule { }
