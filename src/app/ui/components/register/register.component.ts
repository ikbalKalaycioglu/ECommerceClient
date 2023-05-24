import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/Users/create_user';
import { UserRegister } from 'src/app/Entites/User/userRegister';
import { AuthService } from 'src/app/services/common/auth.service';
import { DataShareService } from 'src/app/services/common/data-share.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { CheckPasswords } from 'src/app/validators/check-passwords';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  hide = true; hide1: boolean = true;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService, private router: Router, private socialAuthService: SocialAuthService, private authService: AuthService, private dataShareService: DataShareService) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.AkLab);
      switch (user.provider) {
        case "GOOGLE":
          await authService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.AkLab)
            this.router.navigate(["/"]);
          })
          break;
        case "FACEBOOK":
          await authService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.AkLab)
            this.router.navigate(["/"])
          })
          break;
        default:
          this.hideSpinner(SpinnerType.AkLab);
      }
    });
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2),
      Validators.pattern('^[a-zA-ZğüşıöçĞÜŞİÖÇ\\s]+$')]],
      lastName: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2),
      Validators.pattern('^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$')]],
      userName: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$')],],
      passwordConfirm: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      terms: [false, Validators.requiredTrue]
    }, { validators: CheckPasswords() })

  }

  submitted: boolean = false;
  async onSubmit(user: UserRegister) {
    console.log(this.registerForm.get("passwordConfirm").touched);
    this.submitted = true;
    if (this.registerForm.invalid) {
      if (this.registerForm.get("terms").invalid) {
        this.toastrService.message("Lütfen Şartları Kabul Ediyorumu işaretleyin", "Geçersiz", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.BottomRight
        });
        return
      }
      this.toastrService.message("Geçersiz form doldurdunuz", "Geçersiz", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.BottomRight
      });
      return
    }
    let result: CreateUser;
    this.showSpinner(SpinnerType.Ball8bits)
    result = await this.userService.create(user)

    this.hideSpinner(SpinnerType.Ball8bits);
    if (result.succeeded) {
      this.dataShareService.changeMessage(this.registerForm.get("email").value);
      this.router.navigate(["/verify-email"]);
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      });

    }
    else {
      this.toastrService.message(result.message, "Kullanıcı Kaydı Hatalı", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.BottomRight
      });
    }
  }

  get component() {
    return this.registerForm.controls;
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
