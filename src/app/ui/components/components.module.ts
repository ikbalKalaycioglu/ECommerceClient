import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RecoverPasswordModule } from './recover-password/recover-password.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { ShopModule } from './shop/shop.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { VerifyEmailModule } from './verify-email/verify-email.module';
import { VerifyEmailTrueModule } from './verify-email-true/verify-email-true.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    ForgotPasswordModule,
    RecoverPasswordModule,
    PageNotFoundModule,
    ShopModule,
    ContactUsModule,
    VerifyEmailModule,
    VerifyEmailTrueModule,
  ],

})
export class ComponentsModule { }
