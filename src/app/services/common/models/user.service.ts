import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/Users/create_user';
import { UserRegister } from 'src/app/Entites/User/userRegister';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(userRegister: UserRegister): Promise<CreateUser> {
    const observable: Observable<CreateUser | UserRegister> = this.httpClientService.post<CreateUser | UserRegister>({
      controller: "user",
    }, userRegister);

    return await firstValueFrom(observable) as CreateUser;
  }

  async passwordReset(email: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "user",
      action: "passwordReset",
      params: new HttpParams().set("email", email),
    });
    await firstValueFrom(observable)
    callBackFunction();
  }

  async verifyResetToken(resetToken: string, userId: string, callBackFunction?: () => void): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "user",
      action: "verifyResetToken",
    }, { resetToken: resetToken, userId: userId });
    const state: boolean = await firstValueFrom(observable);
    callBackFunction()

    return state;
  }

  async updatePassword(userId: string, resetToken: string, password: string, confirmPassword: string, successCallBack?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "user",
      action: "updatePassword"
    }, { userId: userId, password: password, confirmPassword: confirmPassword, resetToken: resetToken });
    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack());
    await promiseData;
  }

}