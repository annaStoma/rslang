import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient, private apiService: ApiService) { }
  page = 1;
  level = 1;
  getWords() {
    return this.http.get(
      `https://api-rslang.herokuapp.com/words?page=${
      Math.floor((this.page - 1) / 2)
      }&group=${this.level - 1}`
    );
  }


  setUserStatistic(rightWordsCount, wrongWordsCount) {
    let oldStatistic;
    let commonRating;
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
      }).subscribe(res => {
      }, error => {
        console.log(error)
      });
    });



    console.log('hello');
  }

  /*setUserStatistic = async (learningWords = [], hardWords = []) => {
    let response = await fetch(`https://api-rslang.herokuapp.com/users/${localStorage.getItem("userId")}/user-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    let updateData = await response.json();

    updateData.learningWords = learningWords;
    updateData.hardWords = hardWords;

    response = await fetch(`https://api-rslang.herokuapp.com/users/${localStorage.getItem("userId")}/user-data`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
  };*/
}
