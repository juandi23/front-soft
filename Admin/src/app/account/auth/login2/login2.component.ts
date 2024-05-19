import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@services/account/authentication.service';
import { AuthfakeauthenticationService } from '@services/authfake.service';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonComponent } from '../../../core/components/abstract/common-component.component';
import { Media } from '@models/media/media.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
import { getRouteByRole } from '@functions/routing';
import { ModelService } from '@services/common/model.service';
import { User } from '@models/account/user.model';
import { ThemeService } from '@services/layout/theme-service.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '@services/layout/language.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: '' },
    CommonApiService,
    LanguageService
  ],
})
/**
 * Login-2 component
 */
export class Login2Component extends CommonComponent implements OnInit {

  showPassword: boolean = false;
  loginForm: UntypedFormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });
  submitted = false;
  error = '';
  returnUrl = '';
  year: number = new Date().getFullYear();
  externalAuthUrl = environment.api + '/external-auth/redirect';
  mode: string;
  TRANSLATE_KEY='ACCOUNT.AUTH.LOGIN2.'
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService,
    private api: CommonApiService,
    @Inject('MemberService')
    public memberService: ModelService<User>,
    private themeService: ThemeService,
    private toastr: ToastrService,
    public languageService: LanguageService
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(Object.keys(params).length > 0){
        const tokenData = params?.token ? JSON.parse(params.token) : null;
        const error = params?.error
        if(error){
          this.toastr.error(error);
        }
        if(tokenData){
          this.service.localLogin(tokenData);
          this.memberService.set(tokenData.user);
          this.router.navigate([getRouteByRole(tokenData.user)]).then();
        }
      }
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || null;
    const modeAttribute = this.themeService.getTheme();
    this.mode = modeAttribute !== '' ? modeAttribute : 'light';
  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const subscribe = this.service
        .login(this.f['email'].value, this.f['password'].value)
        .pipe(first())
        .subscribe(user => {
          if (user) {
            this.router.navigate([this.returnUrl ?? getRouteByRole(user)]).then();
          } else {
            this.error = 'Invalid credentials';
          }
        });

      this.unsubscribe.push(subscribe);
    }
  }
  redirectToExternalAuth(key: string): void {
    window.location.href = this.externalAuthUrl + `?role=SINGLE_USER&provider=${key}`;
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
