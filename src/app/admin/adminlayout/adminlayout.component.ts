import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent extends BaseComponent {

  /**
   *
   */
  constructor(spinner: NgxSpinnerService) {
    
    super(spinner);
    this.showSpinner(SpinnerType.AkLab)
    setTimeout(() => {
      spinner.hide(SpinnerType.AkLab);
    }, 1000);
  }
}
