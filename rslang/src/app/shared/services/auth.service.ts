import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  LoginResponse,
  RefreshTokenResponse,
  UserCreate,
  UserCreateResponse,
} from '../interfaces';
import { Config } from '../../common/config';
import { LocalDataService } from './local-data.service';
import { UserBlockService } from './user-block.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: URL;
  private token = null;
  private refreshToken = null;

  constructor(
    private http: HttpClient,
    private config: Config,
    private localData: LocalDataService,
    private userBlockService: UserBlockService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.url = this.config.url();
  }

  login(user: LoginResponse): Observable<LoginResponse> {
    this.url.pathname = 'signin';
    const url = this.url.toString();
    return this.http.post<LoginResponse>(url, user).pipe(
      tap(({refreshToken, token, userId}) => {
        this.localData.setAuthData({refreshToken, token, userId});
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        this.apiService.setUserId(userId);
      })
    );
  }

  register(user: UserCreate): Observable<UserCreateResponse> {
    this.url.pathname = 'users';
    const url = this.url.toString();
    return this.http.post<UserCreateResponse>(url, user);
  }

  updateTokens(): Observable<RefreshTokenResponse> {
    const userId = this.localData.getUserId();
    this.url.pathname = `/users/${userId}/tokens`;
    const url = this.url.toString();
    return this.http.get<RefreshTokenResponse>(url).pipe(
      tap(({refreshToken, token}) => {
        this.localData.setAuthData({refreshToken, token, userId});
        this.setToken(token);
        this.setRefreshToken(refreshToken);
      })
    );
  }

  isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  setToken(token): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  setRefreshToken(refreshToken): void {
    this.refreshToken = refreshToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  logout(): void {
    this.setToken(null);
    this.setRefreshToken(null);
    this.userBlockService.setUser(null);
    this.apiService.setUserId(null);
    this.localData.deleteUser();
    this.localData.clearAuthData();
    this.router.navigate(['/login']);
  }
}
