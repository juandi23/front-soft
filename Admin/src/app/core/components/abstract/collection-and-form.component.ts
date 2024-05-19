import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CollectionBaseComponent } from '@components/abstract/collection-base.component';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
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
import { get } from 'lodash';
import { unset } from 'lodash';

@Component({ template: `` })
export abstract class CollectionAndFormComponent<
  T,
  R
> extends CollectionBaseComponent<T> {
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
    api: CommonApiService,
    service: CollectionService<T>,
    @Inject('Number') limit = 10,

    protected builder: UntypedFormBuilder,
    protected toastr: ToastrService,
    @Inject('String') protected path: string = ''
  ) {
    super(``, api, service, limit);
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

  protected patch(model: T) {
    this.group.patchValue(model);
  }
  abstract load(): void;

  ngSubmit(isForm = false): void {
    this.submit = true;
    if (this.group.valid) {
      const subscribe = this.getMethod(isForm);
      subscribe.subscribe({
        complete: () => (this.submit = false),
        error: err =>
          this.toastr.error(err?.error.message || 'An ocurrido un Error.'),
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
    if (id !== null) {
      path += `/${id}`;
      subscribe = this.api.put(path, body);
    } else {
      unset(body, 'id');
      subscribe = this.api.post(path, body);
    }
    if (isForm) {
      return this.api.form(path, body);
    }
    return subscribe;
  }
}
