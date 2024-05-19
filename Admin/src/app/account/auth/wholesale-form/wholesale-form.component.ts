import { Component, OnInit } from '@angular/core';
import { get, unset } from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonVerbsApiService } from 'src/app/core/services/common/common-verbs-api.service';
import { AuthenticationService } from '@services/account/authentication.service';
import { first } from 'rxjs/operators';
import { getRouteByRole } from '@functions/routing';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-wholesale-form',
  templateUrl: './wholesale-form.component.html',
  styleUrls: ['./wholesale-form.component.scss'],
  providers: [FormBuilder]
})
export class WholesaleFormComponent  implements OnInit {
  TRANSLATE_KEY='ACCOUNT.AUTH.LOGIN2.'
  breadCrumbs = [
    { label: 'People', active: true },
    {
      label: 'Members',
      active: false,
   
    },
    { label: 'Create', active: true },
  ];
  section: number = 1;
  companySizes = [
    { label: '1-10 empleados', value: '1-10' },
    { label: '11-50 empleados', value: '11-50' },
    { label: '51-200 empleados', value: '51-200' },
    { label: '201-500 empleados', value: '201-500' },
    { label: '501-1000 empleados', value: '501-1000' },
    { label: '1001-5000 empleados', value: '1001-5000' },
    { label: '5001-10000 empleados', value: '5001-10000' },
    { label: 'Más de 10000 empleados', value: '10000+' }
];

selectedCompanySize = '1-10';

  submit =false;
  group: UntypedFormGroup  = this.formBuilder.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    companyName: [null, [Validators.required]],
    companySize: [null],
    address: [null],
    rutRegistration: [null, [Validators.required]],
    acceptPolicy: [false, [Validators.requiredTrue]],
}, {
  validators: [this.passwordMatchValidator]
});
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



passwordMatchValidator(formGroup: FormGroup) {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
  } else {
      confirmPasswordControl.setErrors(null);
  }
}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    builder: UntypedFormBuilder,
    private formBuilder: UntypedFormBuilder,
  
    public api: CommonVerbsApiService,
    public toastr: ToastrService,
    private http: CommonVerbsApiService,
    private service: AuthenticationService,
  ){
  
  }

  ngOnInit(): void {

  }

  get f() {
    return this.group.controls;
  }

  saveMember() {
    if (this.group.get('email')?.value === null) {
      this.group.removeControl('email');
    }
    this.ngSubmit();
  }
  nextSection() {
    this.submit = true; 
    if (this.section === 1 && this.validateSection1()) {
      this.section++;
      this.submit = false;  
    } else if (this.section === 2 && this.validateSection2()) {
      this.section++;
      this.submit = false;  
    }
  
  }
  
  validateSection1(): boolean {
    // Validar campos requeridos en la sección 1
    if (
      this.group.get('firstName').invalid ||
      this.group.get('lastName').invalid ||
      this.group.get('email').invalid ||
      this.group.get('password').invalid ||
      this.group.get('confirmPassword').invalid
    ) {
      return false;
    }
    return true;
  }
  
  validateSection2(): boolean {
    // Validar campos requeridos en la sección 2
    if (
      this.group.get('phone').invalid ||
      this.group.get('companyName').invalid ||
      this.group.get('companySize').invalid ||
      this.group.get('rutRegistration').invalid ||
      this.group.get('acceptPolicy').invalid
    ) {
      return false;
    }
    return true;
  }
  
  ngSubmit(): void {
    this.submit = true;
    if (this.group.invalid) {
      return;
    }
    const group = this.group.value;

    this.api.post<any>('users/wholesale-register', group)
      .subscribe(
        (r) => {
          if (r.user) {
            this.toastr.success('Usuario creado correctamente ve a Confirmar tu Email');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.toastr.error(error || 'Error');
        }
      );
  }


previousSection() {
  this.section--;
}

}