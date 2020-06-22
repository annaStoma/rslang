import { map, shareReplay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavannahGameApi } from './savannah-game-api.model';
import { SavannahGameCard } from './savannah-game-card.model';

enum WordsPageNumber {
  pageNumber = 2,
  wordsLevel = 1,
}

@Injectable()
export class SavannahGameService {
  constructor(public http: HttpClient) {}

  getWords(): Observable<SavannahGameCard[]> {
    return this.http
      .get(
        `https://afternoon-falls-25894.herokuapp.com/words?page=${WordsPageNumber.pageNumber}&group=${WordsPageNumber.wordsLevel}`
      )
      .pipe(
        map((response: SavannahGameApi[]) => {
          const wordsArray: SavannahGameCard[] = response.map((el) => {
            return {
              wordId: el.id,
              foreignWord: el.word,
              nativeWord: el.wordTranslate,
            };
          });

          return wordsArray;
        }),
        shareReplay()
      );
  }
}
