import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Config } from '../../common/config';
import { LocalstorageService } from './localstorage.service';
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
  UserWordById, Word,
} from '../interfaces';
import { userSettings } from '../../models/user.model';

type Group = 0|1|2|3|4|5;
type Page = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29;

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  private readonly url: URL;
  private readonly id: string;

  constructor(
    private http: HttpClient,
    private config: Config,
    private localData: LocalstorageService
  ) {
    this.url = this.config.url();
    this.id = this.localData.getUserId();
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
    return this.http.get<Array<Word>>(url, { params });
  }

  createUserWordByWordId(
    wordId: string,
    word: UserWordById
  ): Observable<UserWordById> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.post<UserWordById>(url, word);
  }

  getUserWordByWordId(wordId: string): Observable<UserWordById> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.get<UserWordById>(url);
  }

  updateUserWordByWordId(
    wordId: string,
    word: UserWordById
  ): Observable<UserWordById> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.put<UserWordById>(url, word);
  }

  deleteUserWordByWordId(wordId: string): Observable<void> {
    this.url.pathname = `/users/${this.id}/words/${wordId}`;
    const url = this.url.toString();
    return this.http.delete<void>(url);
  }

  getUserAggregatedWords(
    filter?: AggregatedFilter,
    group?: number
  ): Observable<Array<AggregatedWordResponse>> {
    this.url.pathname = `/users/${this.id}/aggregatedWords/`;
    const url = this.url.toString();
    let params = new HttpParams();
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

  getUserSettings(): Observable<userSettings> {
    this.url.pathname = `/users/${this.id}/settings`;
    const url = this.url.toString();
    return this.http.get<userSettings>(url);
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
    return this.http.put<UserSetting>(url , settings);
  }
}
