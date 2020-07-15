import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';
import { Observable } from 'rxjs';

interface Statistic {
  errorRatePercent,
  totalGamesCompleted
}

@Injectable({
  providedIn: 'root',
})
export class WordsService  {
  constructor(private http: HttpClient, private apiService: ApiService) { }
  page = 1;
  level = 1;
  getWords() : Observable<Object> {
    return this.http.get(
      `https://api-rslang.herokuapp.com/words?page=${
      Math.floor((this.page - 1) / 2)
      }&group=${this.level - 1}`
    );
  }

  setUserStatistic(rightWordsCount, wrongWordsCount) : void {
    let oldStatistic : Statistic;
    let commonRating : number;
    this.apiService.getUserStatistics().subscribe(res => {
      oldStatistic = res.optional ? res.optional["english-puzzle"] : { errorRatePercent : 0, totalGamesCompleted: 0 };
      commonRating = (wrongWordsCount / (rightWordsCount + wrongWordsCount)) + (oldStatistic.errorRatePercent / 100);
      commonRating = oldStatistic.totalGamesCompleted > 0 ? commonRating / 2 : commonRating;
      this.apiService.updateUserStatistics({
        optional: {
          "english-puzzle": {
            errorRatePercent: commonRating * 100,
            totalGamesCompleted: oldStatistic.totalGamesCompleted + 1,
          }
        }
      })
    });
  }
}
