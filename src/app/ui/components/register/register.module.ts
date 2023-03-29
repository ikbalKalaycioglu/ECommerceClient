import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [
    //RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: RegisterComponent }
    ]),
    ReactiveFormsModule,
  ]
})
export class RegisterModule { }
