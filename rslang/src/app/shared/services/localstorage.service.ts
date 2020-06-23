import { Injectable } from '@angular/core';

import { AuthData, User } from '../interfaces';

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
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
  }

  getUser(): User {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (name && email) {
      return { name, email };
    }

    return null;
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
