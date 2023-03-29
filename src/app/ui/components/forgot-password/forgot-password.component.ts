import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent {

  constructor(private userService: UserService, spinner: NgxSpinnerService, private toastr: CustomToastrService) {
    super(spinner);
  }

  passwordReset(email: string) {
    console.log(email);
    this.showSpinner(SpinnerType.BallRunningDots);
    this.userService.passwordReset(email, () => {
          this.hideSpinner(SpinnerType.BallRunningDots);

      this.toastr.message("Mail başarıyla gönderilmiştir", "Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomFullWidth
        
      })
    });
  }
}
