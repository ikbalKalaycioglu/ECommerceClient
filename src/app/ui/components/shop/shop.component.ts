import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  ngOnInit(): void {
    $(document).ready(function () {
      $('select').niceSelect();
    });
  }

}
