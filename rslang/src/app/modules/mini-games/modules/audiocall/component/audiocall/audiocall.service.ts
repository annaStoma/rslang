import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { AudioCallApi } from './audiocall-api.model';
import { AudioCallCard } from './audiocall-card.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

enum WordsPageNumber {
  pageNumber = 2,
  wordsLevel = 1,
}

@Injectable()
export class AudioCallService {
  constructor(public http: HttpClient) { }

  mockData: AudioCallCard[] = [
    { wordId: '1', foreignWord: 'table', nativeWord: 'стол' },
    { wordId: '2', foreignWord: 'table2', nativeWord: 'стол2' },
    { wordId: '3', foreignWord: 'table3', nativeWord: 'стол3' },
    { wordId: '4', foreignWord: 'table4', nativeWord: 'стол4' },
    { wordId: '5', foreignWord: 'table5', nativeWord: 'стол5' },
    { wordId: '6', foreignWord: 'table6', nativeWord: 'стол6' },
  ];

  getWords(): Observable<AudioCallCard[]> {
    return this.http
      .get(
        `https:/api-rslang.herokuapp.com/words?page=${WordsPageNumber.pageNumber}&group=${WordsPageNumber.wordsLevel}`
      )
      .pipe(
        map((response: AudioCallApi[]) => {
          const wordsArray: AudioCallCard[] = response.map((el) => {
            return {
              wordId: el.id,
              foreignWord: el.word,
              nativeWord: el.wordTranslate,
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
