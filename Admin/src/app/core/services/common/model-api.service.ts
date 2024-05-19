import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class ModelApiService<T> {
  private subject$: ReplaySubject<T | null> = new ReplaySubject<T | null>(1);
  readonly model$: Observable<T | null> = this.subject$.asObservable();
  private state: T | null = null;

  get model(): T | null {
    return this.state;
  }

  set(model: T | null) {
    this.state = model;
    this.subject$.next(this.state);
  }

  getModel(api: CommonVerbsApiService, path: string): Observable<T> {
    if (this.state !== null) {
      return of(this.state);
    }
    return api.get<T>(`${path}`);
  }
}
