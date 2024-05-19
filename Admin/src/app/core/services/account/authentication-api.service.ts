import { Account } from '@models/account/account.model';
import { ApiDataResponse } from '@models/common/api-data-response.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@models/account/user.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationApiService {
  constructor(
    @Inject('API_URL') private api: string,
    private httpClient: HttpClient
  ) {}

  login(body: any = {}): Observable<ApiDataResponse<Account>> {
    return this.httpClient.post<ApiDataResponse<Account>>(
      `${this.api}/users/login`,
      body
    );
  }

  loginById(body: any = {}): Observable<ApiDataResponse<Account>> {
    return this.httpClient.post<ApiDataResponse<Account>>(
      `${this.api}/users/login-by-id`,
      body
    );
  }

  getUser(identifier: string, includes: string[] = []): Observable<User> {
    return this.httpClient.get<User>(`${this.api}/users/${identifier}`);
  }
}
