import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
export class RecoverPasswordComponent extends BaseComponent implements OnInit {

  recoverForm: FormGroup;
  submitted: boolean = false;
  state: any;


  constructor(spinner: NgxSpinnerService, private userService: UserService, private activatedRoute: ActivatedRoute, private toastr: CustomToastrService, private router: Router, private formBuilder: FormBuilder) {
    super(spinner)
  }
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
    });
    this.recoverForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$')],],
      passwordConfirm: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]]
    }, { validators: this.checkPasswords })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value
    return pass === confirmPass ? null : { notSame: true }
  }

  updatePassword(password: string, confirmPassword: string) {
    this.submitted = true;
    this.showSpinner(SpinnerType.AkLab)
    if (this.recoverForm.valid) {
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
    }
    this.hideSpinner(SpinnerType.AkLab);
  }

  get component() {
    return this.recoverForm.controls;
  }
}
