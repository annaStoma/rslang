import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { Config } from '../../../../../../common/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SavannahApi } from './savannah-api.model';
import { SavannahCard } from './savannah-card.model';

@Injectable()
export class SavannahService {
  constructor(public http: HttpClient, private urlConfig: Config) { }

  pageNumber: number;
  wordsLevel: number;

  mockData: SavannahCard[] = [
    { wordId: '1', foreignWord: 'table', nativeWord: 'стол' },
    { wordId: '2', foreignWord: 'chear', nativeWord: 'стул' },
    { wordId: '3', foreignWord: 'bed', nativeWord: 'кровать' },
    { wordId: '4', foreignWord: 'cupboard', nativeWord: 'шкаф' },
    { wordId: '5', foreignWord: 'window', nativeWord: 'окно' },
    { wordId: '6', foreignWord: 'house', nativeWord: 'дом' },
  ];

  getWords(wordsLevel: number, pageNumber: number): Observable<SavannahCard[]> {
    return this.http
      .get(
        `${this.urlConfig.url()}words?page=${wordsLevel}&group=${pageNumber}`
      )
      .pipe(
        map((response: SavannahApi[]) => {
          const wordsArray: SavannahCard[] = response.map((el) => {
            return {
              wordId: el.id,
              foreignWord: el.word,
              nativeWord: el.wordTranslate,
              audioUrl: el.audio,
            };
          });
          return wordsArray;
        }),
        catchError((err) => {
          console.warn('ERROR: ', err);
          return of(this.mockData);
        }),
        shareReplay()
      );
  }
}
