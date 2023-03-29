import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private toastr: CustomToastrService, spinner: NgxSpinnerService, private httpService: HttpClientService) {
    super(spinner);
       
  }

  ngOnInit() {
    
  }
}