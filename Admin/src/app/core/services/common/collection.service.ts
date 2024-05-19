import { CollectionFilter } from '@models/collection/collection-filter';
import { CollectionRequest } from '@models/collection/collection-request';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedCollection } from '@models/collection/paginated-collection';
import { ReplaySubject } from 'rxjs';
import { unset } from 'lodash';

@Injectable()
export class CollectionService<T> {
  private subject$: ReplaySubject<PaginatedCollection<T>> = new ReplaySubject<
    PaginatedCollection<T>
  >(1);
  readonly collection$: Observable<PaginatedCollection<T>> =
    this.subject$.asObservable();

  private collection!: PaginatedCollection<T>;
  private request: CollectionRequest = {
    page: 1,
    limit: 10,
  };

  readonly requestChange$: EventEmitter<CollectionRequest> =
    new EventEmitter<CollectionRequest>();

  readonly clear$: EventEmitter<CollectionRequest> =
    new EventEmitter<CollectionRequest>();

  isLoading = false;

  get items(): T[] {
    return this.collection?.data;
  }

  get page(): number {
    return this.request?.page ?? 1;
  }
  set page(page: number) {
    this.setOptionValue('page', page);
  }
  get limit(): number {
    return this.request?.limit ?? 10;
  }

  get options(): CollectionRequest {
    return this.request;
  }

  get from(): number {
    return this.collection?.meta?.from ?? 0;
  }

  get to(): number {
    return this.collection?.meta?.to ?? 0;
  }

  get total(): number {
    return this.collection?.meta?.total ?? 0;
  }

  setOptionValue(optionSlug: string, optionValue: any): void {
    unset(this.request, optionSlug);
    let params = {
      ...this.request,
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

  setOptionValues(values: Map<string, any>): void {
    let params = {
      ...this.request,
      page: 1,
    };
    values.forEach((v, k) => {
      unset(params, k);
      params = {
        ...params,
        [k]: v,
      };
    });
    this.setOptions(params);
  }

  setFilterValue(param: CollectionFilter): void {
    const filters =
      this.request.filters?.filter(x => x.key !== param.key) ?? [];
    if (param.values.length) {
      filters.push(param);
    }
    this.request.filters = filters;
    this.setOptions(this.request);
  }

  removeFilter(key: string) {
    this.request.filters = this.request.filters?.filter(x => x.key !== key);
    this.setOptions(this.request);
  }

  setIncludes(includes: string[]): void {
    this.setOptions({ ...this.options, includes });
  }

  setFilters(filters: CollectionFilter[]): void {
    this.setOptions({ ...this.options, filters });
  }

  setOrderBy(orderBy: string, direction: 'ASC' | 'DESC' | ''): void {
    unset(this.request, 'orderBy');
    unset(this.request, 'direction');
    let params = {
      ...this.request,
      page: 1,
    };
    if (orderBy && direction !== '') {
      params = { ...params, orderBy: orderBy, direction: direction };
    }
    this.setOptions(params);
  }

  setList(list: PaginatedCollection<T>): void {
    this.collection = list;
    this.subject$.next(this.collection);
  }

  private setOptions(options: CollectionRequest): void {
    this.request = options;
    this.requestChange$.emit(options);
  }

  init(options: CollectionRequest): void {
    this.request = options;
    this.requestChange$.emit(options);
  }

  clear(options: CollectionRequest): void {
    this.clear$.emit(options);
  }
}
