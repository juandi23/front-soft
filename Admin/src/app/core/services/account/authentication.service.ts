import { AuthenticationApiService } from '@services/account/authentication-api.service';
import { BehaviorSubject } from 'rxjs';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MenuItem } from '@models/layout/menu.model';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@models/account/user.model';
import { catchError } from 'rxjs/operators';
import { concat } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getMenuByRole } from '@functions/routing';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';
import { take } from 'rxjs';
import { tap } from 'rxjs';
import { Account } from '@models/account/account.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private subject$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  get name(): string {
    return `${localStorage.getItem('userName') ?? ''}`;
  }

  get menu(): MenuItem[] {
    return [];
  }

  constructor(
    @Inject('AuthService')
    public authService: ModelService<User>,
    @Inject('MenuService')
    public menuService: ModelService<MenuItem[]>,
    protected router: Router,
    private api: AuthenticationApiService
  ) { }

  login(email: string, password: string): Observable<any | null> {
    return this.api.login({ email, password }).pipe(
      map(response => {
        console.log('response', response);
        const data = response;
        localStorage.setItem('userToken', response.authToken);
        localStorage.setItem('userName', data?.firstName ?? '');
        localStorage.setItem(
          'tokenIdentifier',
          data.authToken,
        );
        this.authService.set(data);
        this.menuService.set(getMenuByRole(data));
        this.subject$.next(data);
      }),
      switchMap(() => {
        return of(this.subject$.value);
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  localLogin(tokenData: User) {
    localStorage.setItem('userToken', tokenData.authToken);
    localStorage.setItem('userName', tokenData?.firstName ?? '');
    localStorage.setItem(
      'tokenIdentifier',
      tokenData?.authToken ?? '',
    );
    this.authService.set(tokenData);
    this.menuService.set(getMenuByRole(tokenData));
    this.subject$.next(tokenData);
  }

  loginByToken(data: User): void {
    this.authService.set(data);
    this.menuService.set(getMenuByRole(data));
    this.subject$.next(data);
  }

  public isAuthenticated(): Observable<boolean> {
    if (this.authService.model) {
      return of(true);
    }
    return this.getAccount().pipe(map(u => !!u));
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => {
      this.isAuthenticated()
        .pipe()
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  public logout(): void {
    localStorage.clear();
    this.authService.set(null);
    this.menuService.set(null);
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  public getAccount(): Observable<User | null> {
    return concat(
      this.subject$.pipe(
        take(1),
        filter(u => !!u)
      ),
      this.getUserFromApi().pipe(
        filter(u => !!u),
        tap(u => {
          this.authService.set(u!);
          this.menuService.set(getMenuByRole(u!));
          this.subject$.next(u!);
        })
      ),
      this.subject$.asObservable()
    );
  }

  private getUserFromApi(): Observable<User | null> {
    const tokenIdentifier = localStorage.getItem('tokenIdentifier');
    if (tokenIdentifier === null) {
      return of(null);
    }
    return this.api.getUser(tokenIdentifier).pipe(
      mergeMap(response => of(response)),
      catchError(() => {
        return of(null);
      })
    );
  }
}
