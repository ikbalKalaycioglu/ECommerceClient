import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: "", component: VerifyEmailComponent }
    ])
  ]
})
export class VerifyEmailModule { }
