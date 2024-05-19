import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@services/account/authentication.service';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { ThemeService } from '@services/layout/theme-service.service';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
import { getRouteByRole } from '@functions/routing';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  api: CommonVerbsApiService;
  signupForm: UntypedFormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  mode: string;

  // set the currenr year
  year: number = new Date().getFullYear();
  TRANSLATE_KEY = 'ACCOUNT.AUTH.SIGNUP.';
  googleAuthAppUrl = environment.api + '/google-auth/redirect';

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,
    api: CommonVerbsApiService, private service: AuthenticationService, private themeService: ThemeService,) {
      this.api = api;
    }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      const group =  this.signupForm.getRawValue();
      group.companySingUpFlag = true;
      this.api.post<any>('users/register', group)
        .subscribe(r => {
          if (r.user) {
            this.service
              .login(this.f['email'].value, this.f['password'].value)
              .pipe(first())
              .subscribe(user => {
                if (user) {
                  this.router.navigate([getRouteByRole(user)]).then();
                } else {
                  this.error = 'Invalid credentials';
                }
              });
          }
      });
    }
  }
}
