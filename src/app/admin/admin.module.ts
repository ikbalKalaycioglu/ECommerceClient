import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { AdminlayoutModule } from './adminlayout/adminlayout.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminlayoutModule
  ],
  exports: [
    AdminlayoutModule
  ]
})
export class AdminModule { }
