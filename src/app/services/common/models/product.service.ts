import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Product } from 'src/app/Entites/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpClientService) { }

  async getAllAsync() :Promise<Product[]> {
    const observable: Observable<Product[]> = this.httpService.get({
      controller: "Product",
    });
    return await firstValueFrom(observable);
  }
}
