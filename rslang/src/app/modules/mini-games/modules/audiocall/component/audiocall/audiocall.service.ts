import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { AudioCallApi } from './audiocall-api.model';
import { AudioCallCard } from './audiocall-card.model';
import { Config } from '../../../../../../common/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AudioCallService {
  constructor(public http: HttpClient, private urlConfig: Config) { }

  pageNumber: number;
  wordsLevel: number;

  mockData: AudioCallCard[] = [
    { wordId: '1', foreignWord: 'table', nativeWord: 'стол' },
    { wordId: '2', foreignWord: 'table2', nativeWord: 'стол2' },
    { wordId: '3', foreignWord: 'table3', nativeWord: 'стол3' },
    { wordId: '4', foreignWord: 'table4', nativeWord: 'стол4' },
    { wordId: '5', foreignWord: 'table5', nativeWord: 'стол5' },
    { wordId: '6', foreignWord: 'table6', nativeWord: 'стол6' },
  ];

  getWords(wordsLevel: number, pageNumber: number): Observable<AudioCallCard[]> {
    return this.http
      .get(
        `${this.urlConfig.url()}words?page=${wordsLevel}&group=${pageNumber}`
      )
      .pipe(
        map((response: AudioCallApi[]) => {
          const wordsArray: AudioCallCard[] = response.map((el) => {
            return {
              wordId: el.id,
              foreignWord: el.word,
              nativeWord: el.wordTranslate,
              audioUrl: el.audio,
              imageUrl: el.image,
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
