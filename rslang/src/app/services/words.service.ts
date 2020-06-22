import { Injectable } from '@angular/core';
import {
  User,
  SignInData,
  userSettings,
  UsersWords,
} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  //метод для получения всех слов пользователя
  getUserWords(userId: string, token: string): Observable<UsersWords> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<UsersWords>(
      `https://api-rslang.herokuapp.com/users/${userId}/words`,
      { headers }
    );
  }

  //Set new settings
  setSettings(
    userId: string,
    token: string,
    settings: userSettings
  ): Observable<userSettings> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<userSettings>(
      `https://api-rslang.herokuapp.com/users/${userId}/settings`,
      settings,
      { headers }
    );
  }

  //Get user settings
  getSettings(userId: string, token: string): Observable<userSettings> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<userSettings>(
      `https://api-rslang.herokuapp.com/users/${userId}/settings`,
      { headers }
    );
  }
}
