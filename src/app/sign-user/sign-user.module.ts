import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUserRoutingModule } from './sign-user-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    SignUserRoutingModule
  ],
  declarations: [SignInComponent]
})
export class SignUserModule { }
