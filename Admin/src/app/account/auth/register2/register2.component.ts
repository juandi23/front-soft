import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@services/account/authentication.service';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ThemeService } from '@services/layout/theme-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../../../core/services/user.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { getRouteByRole } from '@functions/routing';
import { LanguageService } from '@services/layout/language.service';
@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss'],
  providers: [
    LanguageService
  ],
})
export class Register2Component implements OnInit {

  signupForm: UntypedFormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  TRANSLATE_KEY= 'ACCOUNT.AUTH.REGISTER.';
  mode: string;

  externalAuthUrl = environment.api + '/external-auth/redirect';

  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService, public api: CommonVerbsApiService, private service: AuthenticationService, private themeService: ThemeService,    private toastr: ToastrService,
    public languageService: LanguageService
    ) { }
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validator: this.checkPasswordsMatch('password', 'passwordConfirmation'),
      }
    );
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

  checkPasswordsMatch(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }


  get f() { return this.signupForm.controls; }

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

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {

      const group = this.signupForm.getRawValue();
      const body={
        username: group.firstName,
        firstName: group.firstName,
        lastName: group.lastName,
        email: group.email,
        password: group.password,
      }
      this.api.post<any>('users/register', body)
        .subscribe(r => {
          if (r) {
            console.log(r);
            console.log(r);  

            this.service
              .login(this.f['email'].value, this.f['password'].value)
              .pipe(first())
              .subscribe(r => {
                if (r) {
                  this.router.navigate([getRouteByRole(r)]).then();
                }
              }, error => {
           this.toastr.error(error || 'Error');
              });
          }
        }, error => {
          this.toastr.error(error || 'Error');
        });
    }
  }

  redirectToExternalAuth(key: string): void {
    window.location.href = this.externalAuthUrl + `?role=SINGLE_USER&provider=${key}`;
  }
}
