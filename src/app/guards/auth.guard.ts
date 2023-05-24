import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, _isAuthenticated } from '../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show("spinner4")
    this.authService.identityCheck();
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum Açmanız Gerekiyor!", "Yetksisiz Giriş!", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.BottomRight
      })
      this.spinner.hide("spinner4");
      return false;
    }
    this.spinner.hide("spinner4");
    return true;
  }

}
