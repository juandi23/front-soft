import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommonComponent } from './common-component.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormArray } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { forOwn } from 'lodash';
import { get } from 'lodash';
import { unset } from 'lodash';

@Component({ template: '' })
export abstract class CommonFormComponent<T, R> extends CommonComponent {
  protected isCreateSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  @Output() submitEvent: EventEmitter<R> = new EventEmitter();

  protected subject$: ReplaySubject<R | null> = new ReplaySubject<R | null>(1);
  readonly model$: Observable<R | null> = this.subject$.asObservable();

  private titleSubject$: ReplaySubject<string> = new ReplaySubject<string>(1);
  readonly title$: Observable<string> = this.titleSubject$.asObservable();

  group!: UntypedFormGroup;
  submit = false;

  get controls() {
    return this.group.controls;
  }

  protected constructor(
    protected builder: UntypedFormBuilder,
    protected api: CommonVerbsApiService,
    protected toastr: ToastrService,
    @Inject('String') private path: string = ''
  ) {
    super();
  }
  updatePath(path: string) {
    this.path = path;
  }

  innerControls(name: string) {
    const group = this.group.get(name) as UntypedFormArray;
    return group.controls;
  }

  ngClassGroupValidate(
    group: FormGroup | AbstractControl<any>,
    name: string
  ): string {
    if (!this.submit) return '';
    const control = (group as FormGroup).controls[name];
    return control.errors ? 'is-invalid' : 'is-valid';
  }

  ngClassValidate(group: UntypedFormGroup, name: string): string {
    if (!this.submit) return '';
    return group.controls[name].errors ? 'is-invalid' : 'is-valid';
  }

  protected load(model: T) {
    this.group.patchValue(model);
  }

  ngSubmit(isForm = false): void {
    this.submit = true;
    if (this.group.valid) {
      const subscribe = this.getMethod(isForm);
      subscribe.subscribe({
        complete: () => (this.submit = false),
        error: err => {
          this.toastr.error(
            err?.error?.message || err?.message || 'An ocurrido un Error'
          );
        },
        next: response => {
          this.toastr.success('Cambios Aplicados.');
          this.subject$.next(response);
          this.submitEvent.emit(response);
          if (this.isCreateSubject$.value) {
            this.group.reset();
          }
        },
      });
    }
    
  }

  getMethod(isForm = false): Observable<any> {
    const body = this.group.getRawValue();
    const id = get(body, 'id', null);
    let subscribe: Observable<any>;
    let path = `${this.path}`;
    unset(body, 'id');
    if (id !== null) {
      path += `/${id}`;
      subscribe = this.api.put(path, body);
    } else {
      subscribe = this.api.post(path, body);
    }
    if (isForm) {
      return this.api.form(path, body);
    }
    return subscribe;
  }
}
