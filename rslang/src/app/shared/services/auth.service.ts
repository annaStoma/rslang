import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  AuthData,
  LoginResponse,
  UserCreate,
  UserCreateResponse,
} from '../interfaces';
import { Config } from '../../common/config';
import { LocalstorageService } from './localstorage.service';
import { UserBlockService } from './user-block.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: URL;
  private token = null;

  constructor(
    private http: HttpClient,
    private config: Config,
    private localData: LocalstorageService,
    private userBlockService: UserBlockService,
    private router: Router
  ) {
    this.url = this.config.url();
  }

  login(user: LoginResponse): Observable<LoginResponse> {
    this.url.pathname = 'signin';
    const url = this.url.toString();
    return this.http.post<LoginResponse>(url, user).pipe(
      tap(({ token, userId }) => {
        this.localData.setAuthData({ token, userId });
        this.setToken(token);
      })
    );
  }

  register(user: UserCreate): Observable<UserCreateResponse> {
    this.url.pathname = 'users';
    const url = this.url.toString();
    return this.http.post<UserCreateResponse>(url, user);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(token) {
    this.token = token;
  }

  getToken(): AuthData {
    return this.token;
  }

  logout() {
    this.setToken(null);
    this.userBlockService.setUser(null);
    this.localData.deleteUser();
    this.localData.clearAuthData();
    this.router.navigate(['/login']);
  }
}
