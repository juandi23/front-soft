import { ActivatedRouteSnapshot } from '@angular/router';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs';
import { Product } from '@models/products/product.model';

@Injectable()
export class ProductApiResolver implements Resolve<Product | null> {
  constructor(
    @Inject('ProductService')
    public productsService: ModelService<Product>,
    private service: CommonVerbsApiService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product | null> {
    const id = route.params.id || route.data.id;
    return this.service
      .get<Product>(`products/${id}`, {}, [])
      .pipe(
        tap(response => {
          this.productsService.set(response);
        }),
        catchError(error => {
          this.router.navigate(['/404']).then();
          return of(null);
        })
      );
  }
}
