import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardModule,
    UserModule
  ]
})
export class ComponentsModule { }
