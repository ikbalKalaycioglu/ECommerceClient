import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private userService: UserService, private activatedRoute: ActivatedRoute, private toastr: CustomToastrService, private router: Router) {
    super(spinner)
  }
  state: any;
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userService.verifyResetToken(resetToken, userId, () => {
          this.state = true
          this.hideSpinner(SpinnerType.BallScaleMultiple)
        })
      }
    })
  }

  updatePassword(password: string, confirmPassword: string) {
    this.showSpinner(SpinnerType.AkLab)
    if (password === confirmPassword) {
      this.activatedRoute.params.subscribe({
        next: async params => {
          const userId: string = params["userId"];
          const resetToken: string = params["resetToken"];
          await this.userService.updatePassword(userId, resetToken, password, confirmPassword, () => {
            this.toastr.message("Şifre başarıyla güncellendi", "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomRight
            })
            this.hideSpinner(SpinnerType.AkLab)
            this.router.navigate(["/login"])
          });
        }

      })
    } else {
      this.toastr.message("Şifreler birbirleriyle eşleşmiyor", "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.BottomRight
      })
      this.hideSpinner(SpinnerType.AkLab);
    }
  }

}
