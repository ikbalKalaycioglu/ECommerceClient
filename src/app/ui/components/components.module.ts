import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RecoverPasswordModule } from './recover-password/recover-password.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HomeModule,
    ForgotPasswordModule,
    RecoverPasswordModule,
    PageNotFoundModule
  ],
  
})
export class ComponentsModule { }
