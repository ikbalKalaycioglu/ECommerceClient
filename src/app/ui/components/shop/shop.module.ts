import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    RouterModule.forChild([
      { path: "", component: ShopComponent }
    ])
  ]
})
export class ShopModule { }
