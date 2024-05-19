import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/account/user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationFakeService {
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storage = localStorage.getItem('currentUser');
    if (storage) {
      const user: User = JSON.parse(storage);
      this.currentUserSubject = new BehaviorSubject<User | null>(user);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { email, password }).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
