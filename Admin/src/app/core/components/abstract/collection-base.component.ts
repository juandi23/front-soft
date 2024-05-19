import { AfterContentInit } from '@angular/core';
import { CollectionFilter } from '@models/collection/collection-filter';
import { CollectionRequest } from '@models/collection/collection-request';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonComponent } from './common-component.component';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { PaginatedCollection } from '@models/collection/paginated-collection';
import { QueryList } from '@angular/core';
import { SortEvent } from '@models/collection/sort-event';
import { SortableDirective } from '../../directives/tables/sortable.directive';
import { ViewChildren } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { get } from 'lodash';
import { map } from 'rxjs/operators';
import { map as mapp } from 'lodash';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs';
import { union } from 'lodash';
import { unionBy } from 'lodash';
import { unset } from 'lodash';

@Component({ template: `` })
export abstract class CollectionBaseComponent<T>
  extends CommonComponent
  implements OnInit, AfterContentInit
{
  @ViewChildren(SortableDirective) headers:
    | QueryList<SortableDirective>
    | undefined;

  isEmptyList$: Observable<boolean> = of(true);
  limitControl = new FormControl(this.limit);
  searchControl = new FormControl(this.service.options.q);

  protected constructor(
    @Inject('Endpoint') private endpoint: string = '',
    protected api: CommonApiService,
    public service: CollectionService<T>,
    @Inject('Limit') protected limit: number = 10,
    @Inject('OrderBy') protected orderBy: string | SortEvent = '',
    @Inject('Includes') protected includes: string[] = [],
    @Inject('Filters') protected filters: CollectionFilter[] = [],
    @Inject('orderDirection') protected orderDirection: string = 'ASC'
  ) {
    super();
    this.service.setIncludes(includes);
    this.service.setFilters(filters);
  }

  ngOnInit(): void {
    this.service.setOptionValue('limit', this.limit);
    if (this.orderBy) {
      if (typeof this.orderBy === 'string') {
        this.service.setOptionValue('orderBy', this.orderBy);
        this.service.setOptionValue('direction', this.orderDirection);
      } else {
        this.service.setOptionValue('orderBy', this.orderBy.column);
        this.service.setOptionValue('direction', this.orderBy.direction);
      }
    }
    this.isEmptyList$ = this.service.collection$.pipe(
      map(x => x.meta.total === 0)
    );
    this.setControls();
    this.setCollection();
  }

  ngAfterContentInit(): void {
    this.initHeaders();
  }

  protected setControls(): void {
    const subscribe = this.searchControl.valueChanges
      .pipe(debounceTime(1200), takeUntil(this.destroy$))
      .subscribe(value => {
        this.service.setOptionValue(
          'q',
          value && value.length > 2 ? value : null
        );
      });
    this.unsubscribe.push(subscribe);

    const subscribe1 = this.limitControl.valueChanges
      .pipe(
        filter(x => !!x),
        map(v => ['limit', v]),
        takeUntil(this.destroy$)
      )
      .subscribe(([option, value]) => {
        this.service.setOptionValue(`${option}`, value);
      });
    this.unsubscribe.push(subscribe1);
  }

  protected setCollection(): void {
    const subscribe = this.service.requestChange$
      .pipe(
        map(() => ({ ...this.service.options })),
        tap(() => (this.service.isLoading = true)),
        switchMap(options => this.switchMap(options)),
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.subscribe(response));
    this.unsubscribe.push(subscribe);
    this.service.init(this.service.options);
  }

  protected switchMap(
    options: CollectionRequest
  ): Observable<PaginatedCollection<T>> {
    const includes = union(get(options, 'includes', []), this.includes);
    unset(options, 'includes');
    const filters = unionBy(get(options, 'filters', []), this.filters, 'key');
    unset(options, 'filters');
    return this.api.get<PaginatedCollection<T>>(
      this.endpoint,
      options,
      includes,
      filters
    );
  }

  protected subscribe(response: PaginatedCollection<T>): void {
    this.service.isLoading = false;
    if (get(response, 'data')) {
      this.service.setList(response);
    } else {
      const transform = mapp(response, function (value, key) {
        return { id: key, name: value };
      });
      const serialize = JSON.parse(JSON.stringify(transform));
      const list: PaginatedCollection<T> = {
        data: serialize,
        meta: {
          current_page: this.service.page,
          last_page: 0,
          per_page: this.service.limit,
          total: serialize.length,
        },
      };
      this.service.setList(list);
    }
  }

  onSort({ column, direction }: SortEvent): void {
    if (this.headers !== undefined) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.service.setOrderBy(column, direction);
    }
  }

  clear(): void {
    let options: CollectionRequest = {
      ...this.service.options,
      q: undefined,
      page: 1,
      limit: this.limit,
      filters: this.filters,
    };
    if (this.orderBy) {
      if (typeof this.orderBy === 'string') {
        options = {
          ...this.service.options,
          orderBy: this.orderBy,
        };
      } else {
        options = {
          ...this.service.options,
          orderBy: this.orderBy.column,
          direction: this.orderBy.direction,
        };
      }
    }
    this.service.init(options);
    this.service.clear(options);
    this.searchControl.patchValue(this.service.options.q, { emitEvent: false });
    this.limitControl.patchValue(this.limit, { emitEvent: false });
    if (this.headers !== undefined) {
      this.headers.forEach(header => {
        if (typeof this.orderBy === 'string') {
          if (header.sortable === this.orderBy) {
            header.direction = 'ASC';
          } else {
            header.direction = '';
          }
        }
      });
    }
  }

  private initHeaders() {
    if (this.headers !== undefined) {
      this.headers.forEach(header => {
        if (typeof this.orderBy === 'string') {
          if (header.sortable === this.orderBy) {
            header.direction = 'ASC';
          }
        }
      });
    }
  }
}
