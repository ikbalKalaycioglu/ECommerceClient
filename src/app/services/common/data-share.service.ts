import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  //Email doğrulamada kayıt olunan emaili doğrulama sayfasında gösterme

  private emailSource = new BehaviorSubject<string>("");
  currentEmail = this.emailSource.asObservable();

  constructor() { }

  changeMessage(email: string) {
    this.emailSource.next(email);
  }
}
