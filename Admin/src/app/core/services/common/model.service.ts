import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ModelService<T> {
  private subject$: ReplaySubject<T | null> = new ReplaySubject<T | null>(1);
  readonly model$: Observable<T | null> = this.subject$.asObservable();
  private state: T | null = null;

  isLoading = false;

  get model(): T | null {
    return this.state;
  }

  set(model: T | null) {
    this.state = model;
    this.subject$.next(this.state);
  }
}
