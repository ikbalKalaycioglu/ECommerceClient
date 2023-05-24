import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailTrueComponent } from './verify-email-true.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    VerifyEmailTrueComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: VerifyEmailTrueComponent }
    ])
  ]
})
export class VerifyEmailTrueModule { }
