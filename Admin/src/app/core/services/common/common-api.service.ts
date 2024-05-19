import { CollectionFilter } from '@models/collection/collection-filter';
import { CommonVerbsApiService } from './common-verbs-api.service';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonApiService extends CommonVerbsApiService {
  constructor(
    @Inject('API_URL') api: string,
    @Inject('API_SERVICE') private path: string,
    httpClient: HttpClient
  ) {
    super(api, httpClient);
  }

  override get<T>(
    endpoint = '',
    params: any = null,
    includes: string[] = [],
    filters: CollectionFilter[] = []
  ): Observable<T> {
    return super.get<T>(`${this.path}${endpoint}`, params, includes, filters);
  }

  override post<T>(endpoint = '', body: any = {}): Observable<T> {
    return super.post<T>(`${this.path}${endpoint}`, body);
  }

  override put<T>(endpoint = '', body: any = {}): Observable<T> {
    return super.put<T>(`${this.path}${endpoint}`, body);
  }

  override delete<T>(endpoint = '', params: any = null): Observable<T> {
    return super.delete<T>(`${this.path}${endpoint}`, params);
  }
}
