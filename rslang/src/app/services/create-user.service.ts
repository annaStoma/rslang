import { Injectable } from '@angular/core';
import { User, SignInData } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor(private http: HttpClient) {}

  // Users
  //метод для создания пользователя
  createUser(user: User): Observable<User> {
    console.log('createUser');
    return this.http
      .post<User>('https://api-rslang.herokuapp.com/users', user)
      .pipe(tap((newUser: User) => newUser));
  }

  // Sign in
  //метод для входа в аккаунт
  signIn(signInData: SignInData): Observable<any> {
    console.log('signIn');
    return this.http
      .post<SignInData>('https://api-rslang.herokuapp.com/signin', signInData)
      .pipe(tap((newUser: SignInData) => newUser));
  }

  // Users
  //метод для получения данных об пользователе
  getUser(userId: string): Observable<User> {
    console.log('getUser');
    return this.http
      .get<User>(`https://api-rslang.herokuapp.com/users/${userId}`)
      .pipe(tap((user: User) => user));
  }
}
