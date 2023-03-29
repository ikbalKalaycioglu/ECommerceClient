import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RecoverPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: RecoverPasswordComponent }
    ])
  ]
})
export class RecoverPasswordModule { }
