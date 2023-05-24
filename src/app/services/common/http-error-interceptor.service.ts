import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, first, firstValueFrom, Observable, of, switchMap, throwError } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { AuthService } from './auth.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Token } from 'src/app/contracts/Users/Token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService extends BaseComponent implements HttpInterceptor {

  constructor(private toastr: CustomToastrService, private authService: AuthService, spinner: NgxSpinnerService, private router: Router,) {
    super(spinner);
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError(error => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.authService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(token => {
              this.authService.identityCheck();
            }), (erorr) => {
              this.router.navigate(["/login"]);
            }
            break;
          case HttpStatusCode.InternalServerError:
            console.log(error);
            
            this.toastr.message(error.error.Message, "Sunucu Hatası", {
              messageType: ToastrMessageType.Info,
              position: ToastrPosition.BottomRight
            });

            break;
          case HttpStatusCode.BadRequest:
            this.toastr.message("Geçersiz istek Yapıldı", "Geçersiz istek", {
              messageType: ToastrMessageType.Info,
              position: ToastrPosition.BottomRight
            });
            break;
          case HttpStatusCode.NotFound:
            this.toastr.message("İstek Bulunamadı", "Bulunamadı", {
              messageType: ToastrMessageType.Info,
              position: ToastrPosition.BottomRight
            });
            break;
          default:
            this.toastr.message("Beklenmeyen Hata meydana geldi", "Hata !", {
              messageType: ToastrMessageType.Info,
              position: ToastrPosition.BottomRight
            });
            break;
        }
        this.hideSpinner(SpinnerType.Ball8bits)
        this.hideSpinner(SpinnerType.AkLab)

        
        return of(error);
      }));
  }
}
