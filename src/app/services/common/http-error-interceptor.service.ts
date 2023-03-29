import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private toastr: CustomToastrService, private authService: AuthService,private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {
        case HttpStatusCode.Unauthorized:

          this.toastr.message("Bu işlemi yapmak için yetkiniz bulunmamaktadır!", "Yetkisiz Giriş", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomRight
          });
          this.authService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucuya erişilmiyor", "Sunucu Hatası", {
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
      this.spinner.hide();
      return of(error);
    }));
  }
}
