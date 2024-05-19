import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CommonComponent } from '@components/abstract/common-component.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styles: [],
})
export class ResetPasswordPageComponent extends CommonComponent {
  year: number = new Date().getFullYear();
  error = '';
  submitted = false;
  step = 1;
  TRANSLATE_KEY= 'ACCOUNT.PAGES.RESET_PASSWORD';

  group: UntypedFormGroup = this.builder.group({
    email: [null, [Validators.required, Validators.email]],
  });
  groupCode: UntypedFormGroup = this.builder.group({
    token: [null, [Validators.required]],
  });
  groupPassword: UntypedFormGroup = this.builder.group({
    password: [null, [Validators.required, Validators.minLength(9)]],
    passwordConfirmation: [
      null,
      [Validators.required, Validators.minLength(9)],
    ],
  });
  constructor(
    private builder: UntypedFormBuilder,
    private api: CommonVerbsApiService
  ) {
    super();
  }

  get f() {
    return this.group.controls;
  }
  get c() {
    return this.groupCode.controls;
  }

  get p() {
    return this.groupPassword.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.groupCode.markAsTouched();
    if (this.group.invalid) {
      return;
    } else {
      const subscribe = this.api
        .post(`users/password-forgot`, {
          email: this.f['email'].value,
        })
        .subscribe({
          next: () => {
            this.error = '';
            this.submitted = false;
            this.step = 2;
          },
        });

      this.unsubscribe.push(subscribe);
    }
  }

  onValidate() {
    this.submitted = true;
    this.groupCode.markAsTouched();
    if (this.groupCode.invalid) {
      return;
    } else {
      const subscribe = this.api
        .post(`users/password-token-check`, {
          email: this.f['email'].value,
          token: this.c['token'].value,
        })
        .subscribe({
          next: () => {
            this.error = '';
            this.submitted = false;
            this.step = 3;
          },
          error: () => {
            this.error = 'Invalid Code';
            this.submitted = false;
          },
        });

      this.unsubscribe.push(subscribe);
    }
  }

  onPassword() {
    this.submitted = true;
    this.groupPassword.markAsTouched();
    if (this.groupPassword.invalid) {
      return;
    } else {
      const subscribe = this.api
        .post(`users/password-reset`, {
          email: this.f['email'].value,
          password: this.p['password'].value,
          passwordConfirmation: this.p['passwordConfirmation'].value,
        })
        .subscribe({
          next: () => {
            this.error = '';
            this.submitted = false;
            this.step = 4;
          },
          error: () => {
            this.error = 'Invalid Password';
            this.submitted = false;
          },
        });

      this.unsubscribe.push(subscribe);
    }
  }
}
