import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Token } from 'src/app/contracts/Users/Token';
import { UserLogin } from 'src/app/Entites/User/userLogin';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseComponent {

  constructor(private jwtHelperService: JwtHelperService, private httpClientService: HttpClientService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  identityCheck() {
    const token = localStorage.getItem("accessToken");
    let expired: boolean;
    try {
      expired = this.jwtHelperService.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }
    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }


  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | Token> = this.httpClientService.post<SocialUser | Token>({
      controller: "auth",
      action: "googleLogin"
    }, user);
    const token: Token = await firstValueFrom(observable) as Token;
    if (token) {
      localStorage.setItem("refreshToken", token.refreshToken)
      localStorage.setItem("accessToken", token.accessToken)
      this.toastrService.message("Google Üzerinden Giriş Başarılı", "Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      })
    }
    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | Token> = this.httpClientService.post<SocialUser | Token>({
      controller: "auth",
      action: "facebookLogin"
    }, user);
    const token: Token = await firstValueFrom(observable) as Token;
    if (token) {
      localStorage.setItem("accessToken", token.accessToken)
      localStorage.setItem("refreshToken", token.refreshToken);

      this.toastrService.message("Facebook Üzerinden Giriş Başarılı", "Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      })
    }
    callBackFunction();
  }

  async login(userLogin: UserLogin): Promise<any> {
    this.showSpinner(SpinnerType.Ball8bits)
    const observable: Observable<Token | UserLogin> = this.httpClientService.post<Token | UserLogin>({
      controller: "auth",
      action: "login"
    }, userLogin)
    const token: Token = await firstValueFrom(observable) as Token;
    if (token) {
      this.hideSpinner(SpinnerType.Ball8bits)
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
      this.toastrService.message("Kullanıcı Girişi Başarılı", "Başarılı", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.BottomRight
      })
      return true;
    } else {
      this.hideSpinner(SpinnerType.Ball8bits)
      this.toastrService.message("Kullanıcı veya Şifre Hatalı", "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.BottomRight
      })
      return false;
    }
  }
  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void) {
    const observable: Observable<string | Token> = this.httpClientService.post<string | Token>({
      controller: "Auth",
      action: "refreshTokenLogin"
    }, {refreshToken:refreshToken});
    const token: Token = await firstValueFrom(observable) as Token;
    if (token) {
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
    }

    callBackFunction();
  }
}


export let _isAuthenticated: boolean;

