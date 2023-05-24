import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/Entites/Product/product';
import { BaseComponent } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  products: Product[];

  constructor(spinner: NgxSpinnerService, private productService: ProductService) {
    super(spinner);

  }
  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getAllAsync();
    console.log(this.products);
    
  }
}
