import { CollectionBaseComponent } from './collection-base.component';
import { CollectionFilter } from '@models/collection/collection-filter';
import { CollectionRequest } from '@models/collection/collection-request';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SortEvent } from '@models/collection/sort-event';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs';

@Component({ template: `` })
export abstract class CollectionComponent<
  T
> extends CollectionBaseComponent<T> {
  protected constructor(
    protected router: Router,
    private location: Location,
    @Inject('Endpoint') endpoint = '',
    api: CommonApiService,
    service: CollectionService<T>,
    @Inject('Limit') limit = 10,
    @Inject('OrderBy') orderBy: string | SortEvent = '',
    @Inject('Includes') includes: string[] = [],
    @Inject('Filters') filters: CollectionFilter[] = []
  ) {
    super(endpoint, api, service, limit, orderBy, includes, filters);
  }

  protected getQueryParams(): CollectionRequest {
    const params: CollectionRequest = {
      page: this.service.options.page,
      limit: this.service.options.limit,
    };
    const options = this.service.options;
    if ('page' in options && options.page !== this.service.options.page) {
      params['page'] = options.page;
    }
    if ('limit' in options && options.limit !== this.service.options.limit) {
      params['limit'] = options.limit;
    }
    if ('orderBy' in options && 'direction' in options) {
      params['orderBy'] = options.orderBy;
      params['direction'] = options.direction;
    }
    if ('q' in options && options.q) {
      params['q'] = options.q;
    }
    return params;
  }

  protected updateUrl(): void {
    const tree = this.router.parseUrl(this.router.url);
    tree.queryParams = this.getQueryParams();
    this.location.replaceState(tree.toString());
  }

  protected override setCollection(): void {
    const subscribe = this.service.requestChange$
      .pipe(
        map(() => this.map()),
        tap(() => (this.service.isLoading = true)),
        switchMap(options => this.switchMap(options)),
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.subscribe(response));
    this.unsubscribe.push(subscribe);
    this.service.init(this.getQueryParams());
  }

  private map(): CollectionRequest {
    this.updateUrl();
    return {
      ...this.service.options,
    };
  }
}
