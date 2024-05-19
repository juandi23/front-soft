import { AuthenticationService } from '@services/account/authentication.service';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { finalize } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private service: AuthenticationService,
    private spinner: NgxSpinnerService
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      !request.url.includes('assets') &&
      !request.url.includes('unsplash') &&
      !request.url.includes('amazonaws.com')
    ) {
      if (request.body &&
        typeof request.body === 'object' &&
        'blockApiInterceptorSpinner' in request.body) {
        this.spinner.hide().then()
      } else {
        this.spinner.show().then();
      }
      request = this.getRequest(request);
      return next.handle(request).pipe(
        filter(r => r.type === 4),
        finalize(() => this.spinner.hide().then()),
        catchError(response => {
          if (response?.status === 401 || response.includes('Unauthenticated')) {
            localStorage.clear();
            if (this.router.url !== '/') {
              this.service.logout();
              this.router.navigate(['/account/auth/login']).then();
            }
          }
          return throwError(response);
        })
      );
    }
    return next.handle(request);
  }

  protected getRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let headers = request.headers;
    headers = headers.append('Accept', 'application/json');
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      headers = headers.append('Authorization', `Bearer ${userToken}`);
      return request.clone({ withCredentials: true, headers });
    }
    return request.clone({ headers });
  }
}
