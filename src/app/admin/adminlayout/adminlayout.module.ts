import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminlayoutComponent } from './adminlayout.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    AdminlayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    AdminlayoutComponent
  ]
})
export class AdminlayoutModule { }
