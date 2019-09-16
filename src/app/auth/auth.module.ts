import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {AuthRoutingModule} from "./auth-routing.module";
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule,
    MatSelectModule
    
  ]
})
export class AuthModule { }
