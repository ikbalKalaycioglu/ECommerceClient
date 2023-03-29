import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService, _isAuthenticated } from '../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show("spinner4")
    this.authService.identityCheck();
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum Açmanı Gerekiyor!", "Yetksisiz Giriş!", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.BottomRight
      })
    }
    this.spinner.hide("spinner4");

    return true;
  }

}
