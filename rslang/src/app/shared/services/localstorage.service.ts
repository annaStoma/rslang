import { Injectable } from '@angular/core';

import { AuthData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  setAuthData(data: AuthData): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  setUser(user): void {
    console.log(user);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
  }

  deleteUser(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }
}
