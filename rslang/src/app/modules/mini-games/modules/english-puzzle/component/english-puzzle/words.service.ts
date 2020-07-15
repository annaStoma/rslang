import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

interface Statistic {
  errorRatePercent;
  totalGamesCompleted;
}

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  page : any = 1;
  level : any = 1;

  getWords(): Observable<object> {
    return this.http.get(
      `https://api-rslang.herokuapp.com/words?page=${
        Math.floor((this.page - 1) / 2)
      }&group=${this.level - 1}`
    );
  }

  setUserStatistic(rightWordsCount, wrongWordsCount): void {
    let oldStatistic: Statistic;
    let commonRating: number;
    const firstGame = { errorRatePercent: 0, totalGamesCompleted: 0 };
    this.apiService.getUserStatistics().subscribe(res => {
      oldStatistic = res.optional?.['english-puzzle'] || firstGame;
      commonRating = (wrongWordsCount / (rightWordsCount + wrongWordsCount)) + (oldStatistic.errorRatePercent / 100);
      commonRating = oldStatistic.totalGamesCompleted > 0 ? commonRating / 2 : commonRating;
      this.updateUserStatistic(commonRating, oldStatistic);
    });
  }

  private updateUserStatistic(commonRating, oldStatistic): void {
    this.apiService.updateUserStatistics({
      optional: {
        'english-puzzle': {
          errorRatePercent: commonRating * 100,
          totalGamesCompleted: oldStatistic.totalGamesCompleted + 1,
        }
      }
    }).pipe(take(1)).subscribe();
  }
}
