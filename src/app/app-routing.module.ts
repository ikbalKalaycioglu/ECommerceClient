import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent } from './ui/layout/layout.component';


const routes: Routes = [
  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
      { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
    ],
  },
  
  { path: "forgot-password", loadChildren: () => import("./ui/components/forgot-password/forgot-password.module").then(module => module.ForgotPasswordModule) },
  { path: "recover-password/:userId/:resetToken", loadChildren: () => import("./ui/components/recover-password/recover-password.module").then(module => module.RecoverPasswordModule) },


  {
    path: "admin", component: AdminlayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "users", loadChildren: () => import("./admin/components/user/user.module").then(module => module.UserModule) },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) },
    ], canActivate: [AuthGuard]
  },
  { path: "**", pathMatch: 'full', loadChildren: () => import("./ui/components/page-not-found/page-not-found.module").then(module => module.PageNotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration:"enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
