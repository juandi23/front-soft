import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { CommonComponent } from '@components/abstract/common-component.component';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { first } from 'rxjs';
import { getRouteByRole } from '@functions/routing';

@Component({
  selector: 'app-common-login',
  templateUrl: './common-login.component.html',
  styles: [],
})
export class CommonLoginComponent extends CommonComponent implements OnInit {
  loginForm: UntypedFormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });
  submitted = false;
  error = '';
  returnUrl = '';
  LOGIN= 'CORE.MODULES.AUTHENTICATION.LOGIN.';

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || null;
  }

  get f() {
    return this.loginForm.controls;
  }

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
            this.router
              .navigate([this.returnUrl ?? getRouteByRole(user)])
              .then();
            this.modalService.dismissAll();
          } else {
            this.error = 'Invalid credentials';
          }
        });

      this.unsubscribe.push(subscribe);
    }
  }

  forgot() {
    this.modalService.dismissAll();
    this.router.navigate(['/account/reset-password-page']).then();
  }
}
