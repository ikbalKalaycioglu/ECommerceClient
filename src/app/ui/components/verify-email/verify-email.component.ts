import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DataShareService } from 'src/app/services/common/data-share.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent extends BaseComponent implements OnInit {

  email: string;

  constructor(private dataShareService: DataShareService, private userService: UserService, spinner: NgxSpinnerService) {
    super(spinner)
  }
  ngOnInit(): void {
    this.dataShareService.currentEmail.subscribe(data => {
      this.email = data;
    })
  }

  sendVerifyEmail() {
    this.showSpinner(SpinnerType.AkLab);
    this.userService.sendVerifyEmail(this.email, () => {
      this.hideSpinner(SpinnerType.AkLab)
    });
    this.hideSpinner(SpinnerType.AkLab)
  }
}
