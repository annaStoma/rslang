import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Config } from '../../common/config';
import { LocalDataService } from './local-data.service';
import { Observable } from 'rxjs';
import {
  AggregatedFilter,
  AggregatedWord,
  AggregatedWordResponse,
  UserData,
  UserSetting,
  UserStatistic,
  UsersWords,
  UserUpdate,
  UserUpdateResponse,
  Word,
} from '../interfaces';
import { UserSettings } from '../../models/user.model';
import { Group, Page } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly url: URL;
  private id: string;

  constructor(
    private http: HttpClient,
    private config: Config,
  ) {
    this.url = this.config.url();
  }

  updateUser(user: UserUpdate): Observable<UserUpdateResponse> {
    this.url.pathname = `users/${this.id}`;
    const url = this.url.toString();
    return this.http.put<UserUpdateResponse>(url, user);
  }

  deleteUser(): Observable<void> {
    this.url.pathname = `users/${this.id}`;
    const url = this.url.toString();
    return this.http.delete<void>(url);
  }

  getUserWords(): Observable<Array<UsersWords>> {
    this.url.pathname = `/users/${this.id}/words`;
    const url = this.url.toString();
    return this.http.get<Array<UsersWords>>(url);
  }

  getWords(group: Group, page: Page): Observable<Array<Word>> {
    this.url.pathname = `/words`;
    const url = this.url.toString();
    let params = new HttpParams();
    params = params.append('group', group.toString());
    params = params.append('page', page.toString());
    return this.http.get<Array<Word>>(url, {params});
  }

  createUserWordByWordId(
    wordId: string,
    word: UsersWords
  ): Observable<UsersWords> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.post<UsersWords>(url, word);
  }

  getUserWordByWordId(wordId: string): Observable<UsersWords> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.get<UsersWords>(url);
  }

  updateUserWordByWordId(
    wordId: string,
    word: UsersWords
  ): Observable<UsersWords> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.put<UsersWords>(url, word);
  }

  deleteUserWordByWordId(wordId: string): Observable<void> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.delete<void>(url);
  }

  getUserAggregatedWords(
    filter?: AggregatedFilter,
    wordsPerPage?: number | false,
    group?: number
  ): Observable<Array<AggregatedWordResponse>> {
    this.url.pathname = `/users/${this.id}/aggregatedWords/`;
    const url = this.url.toString();
    let params = new HttpParams();

    if (wordsPerPage) {
      params = params.append('wordsPerPage', wordsPerPage.toString());
    }

    if (group) {
      params = params.append('group', group.toString());
    }

    if (filter) {
      params = params.append('filter', JSON.stringify(filter));
    }
    return this.http.get<Array<AggregatedWordResponse>>(url, {
      params,
    });
  }

  getUserAggregatedWordByWordId(wordId: string): Observable<AggregatedWord> {
    this.url.pathname = `/users/${this.id}/aggregatedWords/${wordId}`;
    const url = this.url.toString();
    return this.http.get<AggregatedWord>(url);
  }

  getUserStatistics(): Observable<UserStatistic> {
    this.url.pathname = `/users/${this.id}/statistics`;
    const url = this.url.toString();
    return this.http.get<UserStatistic>(url);
  }

  updateUserStatistics(statistic: UserStatistic): Observable<UserStatistic> {
    this.url.pathname = `/users/${this.id}/statistics`;
    const url = this.url.toString();
    return this.http.put<UserStatistic>(url, statistic);
  }

  getUserSettings(): Observable<UserSettings> {
    this.url.pathname = `/users/${this.id}/settings`;
    const url = this.url.toString();
    return this.http.get<UserSettings>(url);
  }

  updateUserSettings(setting: UserSetting): Observable<UserSetting> {
    this.url.pathname = `/users/${this.id}/statistics`;
    const url = this.url.toString();
    return this.http.put<UserSetting>(url, setting);
  }

  getUserData(): Observable<UserData> {
    this.url.pathname = `/users/${this.id}/user-data`;
    const url = this.url.toString();
    return this.http.get<UserData>(url);
  }

  updateUserData(userData: UserData): Observable<UserData> {
    this.url.pathname = `/users/${this.id}/user-data`;
    const url = this.url.toString();
    return this.http.put<UserData>(url, userData);
  }

  setUserSettings(settings: UserSetting): Observable<UserSetting> {
    this.url.pathname = `/users/${this.id}/settings`;
    const url = this.url.toString();
    return this.http.put<UserSetting>(url, settings);
  }

  setUserId(id: string): void {
    this.id = id;
  }
}
