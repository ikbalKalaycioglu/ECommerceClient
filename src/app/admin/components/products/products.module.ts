import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { AddproductComponent } from './addproduct/addproduct.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent, },
      { path: "add", component: AddproductComponent, },
    ])
  ]
})
export class ProductsModule { }
