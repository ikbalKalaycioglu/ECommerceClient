import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-verify-email-true',
  templateUrl: './verify-email-true.component.html',
  styleUrls: ['./verify-email-true.component.css']
})
export class VerifyEmailTrueComponent extends BaseComponent implements OnInit {

  state: any;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, spinner: NgxSpinnerService, private toastr: CustomToastrService) {
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.AkLab)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const token: string = params["token"];
        this.state = await this.userService.verifyEmailToken(userId, token, () => {
          this.state = true;
          this.hideSpinner(SpinnerType.AkLab)
        })
      }
    })
    this.toastr.message("Giriş Sayfasına Yönlendiriliyorsunuz.", "Başarılı", {
      messageType: ToastrMessageType.Success,
      position:ToastrPosition.TopCenter
    })
    setTimeout(() => {
      this.router.navigate(["/login"])
    }, 3000);
  }

}
