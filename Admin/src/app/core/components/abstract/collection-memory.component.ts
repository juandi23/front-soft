import { CollectionState } from '@models/collection/collection-state';
import { CommonComponent } from './common-component.component';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SortEvent } from '@models/collection/sort-event';
import { debounceTime } from 'rxjs/operators';
import { get } from 'lodash';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs';
import { unset } from 'lodash';

@Component({ template: `` })
export abstract class CollectionMemoryComponent<T>
  extends CommonComponent
  implements OnInit
{
  isEmpty$: Observable<boolean> = of(true);
  private subject$: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);
  readonly collection$: Observable<T[]> = this.subject$.asObservable();
  private collection: T[] = [];

  //
  private listSubject$: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);
  readonly list$: Observable<T[]> = this.listSubject$.asObservable();

  private optionsState: CollectionState = {
    page: 1,
    limit: 8,
    from: 1,
    to: 8,
    total: 0,
  };
  readonly optionsChange$: EventEmitter<CollectionState> =
    new EventEmitter<CollectionState>();
  //
  limitControl = new FormControl(this.optionsState.limit);
  searchControl = new FormControl(this.optionsState.q);
  //
  get from(): number {
    return this.optionsState?.from ?? 0;
  }

  get to(): number {
    return this.optionsState?.to ?? 0;
  }

  get total(): number {
    return this.optionsState?.total ?? 0;
  }

  set page(page: number) {
    this.setOptionValue('page', page);
  }

  get page(): number {
    return this.optionsState?.page ?? 1;
  }

  get limit(): number {
    return this.optionsState?.limit ?? 10;
  }

  protected constructor(
    @Inject('SearchTerm') private searchTerm: string,
    private spinner: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    const subscribe = this.collection$.subscribe(() => {
      this.optionsChange$.emit(this.optionsState);
    });
    this.unsubscribe.push(subscribe);

    const subscribe1 = this.optionsChange$
      .pipe(
        map(() => ({ ...this.optionsState })),
        tap(() => this.spinner.show().then()),
        switchMap(options => {
          let collection = this.collection;
          let total = options.total!;
          const start = options.page * options.limit - options.limit;
          let end = start + options.limit;
          let state = {
            ...this.optionsState,
            from: start + 1,
          };

          if (options.q) {
            collection = this.collection.filter(c => {
              const value = `${get(c, this.searchTerm, '')}`.toLowerCase();
              const query = `${options.q}`.toLowerCase();
              return value.includes(query);
            });
            total = collection.length;
          } else {
            total = this.collection.length;
          }

          end = end > total ? total : end;
          state = { ...state, to: end, total };
          this.optionsState = state;
          return of(collection.slice(start, end));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(list => {
        this.spinner.hide().then();
        this.listSubject$.next(list);
      });
    this.unsubscribe.push(subscribe1);

    const subscribe2 = this.limitControl.valueChanges
      .pipe(
        map(v => ['limit', v]),
        takeUntil(this.destroy$)
      )
      .subscribe(([option, value]) => {
        this.setOptionValue(`${option}`, value);
      });
    this.unsubscribe.push(subscribe2);

    const subscribe3 = this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(term => {
        this.setOptionValue('q', term);
      });
    this.unsubscribe.push(subscribe3);
  }

  set(collection: T[]): void {
    this.collection = collection;
    this.optionsState = { ...this.optionsState, total: collection.length };
    this.subject$.next(this.collection);
  }

  setOptionValue(optionSlug: string, optionValue: any): void {
    unset(this.optionsState, optionSlug);
    let params = {
      ...this.optionsState,
      page: 1,
    };
    if (optionValue !== null) {
      params = {
        ...params,
        [optionSlug]: optionValue,
      };
    }
    this.setOptions(params);
  }

  onSort($event: SortEvent): void {
    console.log($event);
  }

  private setOptions(options: CollectionState): void {
    this.optionsState = options;

    this.optionsChange$.emit(options);
  }

  clear(): void {
    this.optionsState = {
      ...this.optionsState,
      page: 1,
      limit: 8,
      from: 1,
      to: 8,
      total: 0,
      q: null,
    };
    this.subject$.next(this.collection);
    this.searchControl.patchValue(null, { emitEvent: false });
  }
}
