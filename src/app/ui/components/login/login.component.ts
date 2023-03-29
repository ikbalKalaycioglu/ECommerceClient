import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserLogin } from 'src/app/Entites/User/userLogin';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup;
  hide:boolean = true;
  
  constructor(private formBuilder: FormBuilder, spinner: NgxSpinnerService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, private socialAuthService: SocialAuthService) {
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
            this.router.navigate(["/"]);
          })
          break;
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmail: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    })
  }
  // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$')

  submitted: Boolean = false;
  async onSubmit(user: UserLogin) {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;
    const result = await this.authService.login(user);
    if (result) {
      this.authService.identityCheck()
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);

        this.router.navigate(["/"]);

      })
    }
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }



}
