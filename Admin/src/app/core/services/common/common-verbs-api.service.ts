import { CollectionFilter } from '@models/collection/collection-filter';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forEach } from 'lodash';
import { forOwn } from 'lodash';

@Injectable()
export class CommonVerbsApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    @Inject('API_URL') protected api: string,
    protected httpClient: HttpClient
  ) {}

  get<T>(
    endpoint = '',
    params: any = null,
    includes: string[] = [],
    filters: CollectionFilter[] = []
  ): Observable<T> {
    return this.httpClient.get<T>(`${this.api}/${endpoint}`, {
      headers: this.headers,
      params: this.getParams(params, includes, filters),
    });
  }

  post<T>(endpoint = '', body: any = {}, config = false): Observable<T> {
    return this.httpClient.post<T>(`${this.api}/${endpoint}`, body, {
      headers: this.headers,
    });
  }
  put<T>(endpoint = '', body: any = {}): Observable<T> {
    return this.httpClient.put<T>(`${this.api}/${endpoint}`, body, {
      headers: this.headers,
    });
  }

  delete<T>(endpoint = '', params: any = {}): Observable<T> {
    return this.httpClient.delete<T>(`${this.api}/${endpoint}`, {
      headers: this.headers,
      params: this.getParams(params, [], []),
    });
  }

  form<T>(endpoint = '', body: any = {}): Observable<T> {
    const payload: any = new FormData();
    if (body !== null) {
      forOwn(body, (v, k) => {
        if (k && v) {
          payload.append(k, v);
        }
      });
    }
    return this.httpClient.post<T>(`${this.api}/${endpoint}`, payload);
  }

  download<Blob>(endpoint = '', params: any = {}): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.api}/${endpoint}`, {
      headers: this.headers,
      responseType: 'blob' as 'json',
      params: this.getParams(params, [], []),
    });
  }

  private getParams(
    query: any = null,
    includes: string[],
    filters: CollectionFilter[]
  ): HttpParams {
    let params = new HttpParams();
    if (includes.length) {
      params = new HttpParams({
        fromObject: { 'includes[]': includes },
      });
    }
    if (filters.length) {
      forEach(filters, f => {
        forEach(f.values, v => {
          const key = `filters[${f.key}][]`;
          params = params.append(key, v);
        });
      });
    }
    if (query !== null) {
      forOwn(query, (v, k) => {
        if (v && v !== '' && v !== undefined) {
          if (v instanceof Array) {
            forEach(v, value => {
              const key = `${k}[]`;
              params = params.append(key, value);
            });
          } else {
            params = params.append(k, v);
          }
        }
      });
    }
    return params;
  }
}
