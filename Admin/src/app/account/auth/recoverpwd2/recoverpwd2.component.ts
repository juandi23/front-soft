import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ThemeService } from '@services/layout/theme-service.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '@services/layout/language.service';
@Component({
  selector: 'app-recoverpwd2',
  templateUrl: './recoverpwd2.component.html',
  styleUrls: ['./recoverpwd2.component.scss'],
  providers: [LanguageService]
})
export class Recoverpwd2Component implements OnInit {
  year: number = new Date().getFullYear();
  resetForm: UntypedFormGroup;
  resetToken: UntypedFormGroup;
  newPassword: UntypedFormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  step = 1;
  TRANSLATE_KEY = 'ACCOUNT.AUTH.RECOVERPWD2.';
  mode: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    public api: CommonVerbsApiService,
    private toastr: ToastrService,
    private themeService: ThemeService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.resetToken = this.formBuilder.group({
      token: ['', [Validators.required]],
    });
    this.newPassword = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ]],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validator: this.checkPasswordsMatch('password', 'passwordConfirmation'),
      }
    );

    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

  get f() {
    return this.resetForm.controls;
  }

  get c() {
    return this.resetToken.controls;
  }

  get p() {
    return this.newPassword.controls;
  }

  onSubmit() {
    this.success = '';
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }
    const group = this.resetForm.getRawValue();
    this.api.post<any>('users/password-forgot', group).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Exito');
        this.error = '';
        this.submitted = false;
        this.step = 2;
      },
      (error) => {
        this.error = error ? error : '';
      }
    );
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

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1,
      },
    },
  };
  onValidate() {
    this.submitted = true;
    if (this.resetToken.invalid) {
      return;
    }
    this.api
      .post<any>('users/password-token-check', {
        email: this.f['email'].value,
        token: this.c['token'].value,
      })
      .subscribe(
        (response) => {
          this.toastr.success(response.message, 'Exito');
          this.error = '';
          this.submitted = false;
          this.step = 3;
        },
        (error) => {
          this.toastr.error(error ?? 'Algo salió mal');
        }
      );
  }
  onReset() {
    this.submitted = true;
    if (this.newPassword.invalid) {
      return;
    }
    this.api
      .post<any>('users/password-reset', {
        email: this.f['email'].value,
        password: this.p['password'].value,
        passwordConfirmation: this.p['passwordConfirmation'].value,
      })
      .subscribe(
        (response) => {
          this.toastr.success(response.message, 'Exito');
          this.router.navigate(['/account/auth/login-2']).then();
        },
        (error) => {
          this.toastr.error(error ?? 'Algo salió mal');
        }
      );
  }
}
