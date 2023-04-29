import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    UserModule,
    ProductsModule
  ]
})
export class ComponentsModule { }
