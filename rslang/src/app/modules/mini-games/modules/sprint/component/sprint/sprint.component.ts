import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { SprintTranslateItem, SprintResult, Word, SprintWord } from '../../../../../../shared/interfaces';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';
import { Page } from '../../../../../../shared/types';


@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  public countOfCards: number = 10;
  public resultOfGame: SprintResult = {
    historyOfAnswers: [],
    countOfCorrect: 0,
    countCorrectInRow: 0,
    totalScore: 0,
  };
  public currentGameItem: SprintTranslateItem;
  public listOfCards: SprintWord[] = [];
  public listOfGameTranslateItems: SprintTranslateItem [] = [];
  public correctTranslates: any = {};
  public currentGroupWords: any = 0;
  public selectedGroup: any = 0;

  currentWord: Word;
  autoTicks = false;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  sliderValue = 1;
  tickInterval = 1;
  durationInSeconds = 9;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  timeLeft: number = 60;
  interval;
  isTimer: boolean = false;
  gameTimeOut: boolean = false;
  countsCards: number = 0;
  gameOver: boolean = false;
  isNotPlay = true;
  audio = new Audio();
  boostScore: number = 0;
  scoreUnFour: number = 0;
  scoreBeforeFour: number = 0;
  numbersOfUpdateScore = [1,2,4,8,16,32]
  inRowUnFour: boolean = false;
  errorAnswer: boolean = false;
  isLoad: boolean = false;
  randomNumbers = []
  counterListOfCards: number = 0;
  page: Page;
  percentError: number;
  falseAnswer: number = 0;

  globalPercentOfErrors: number;
  globalCountOfGames: number;

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiService,
    private config: Config
  ) {
  }

  ngOnInit(): void {
    this.selectedGroup = localStorage.getItem('levelGroup');
    if(this.selectedGroup == null) this.selectedGroup = 0;
    const page = Math.round(Math.random() * 29) as Page;
    this.page = page;
    this.apiService.getWords(this.selectedGroup, page).subscribe(data => {
      this.listOfCards = data.slice(0, this.countOfCards);
      this.listOfCards.forEach((card, index) => {
        const isRandom: boolean = Math.random() < 0.5;
        this.listOfGameTranslateItems.push({
          word: card.word,
          index: index,
          wordTranslate: this.listOfCards[this.getRandomCount(isRandom, index)].wordTranslate,
          isDisabled: false,
          audio: card.audio
        });
        this.correctTranslates[card.word] = card.wordTranslate;
      });
      this.currentGameItem = this.listOfGameTranslateItems[0];
    });
    setTimeout(() => {
      this.isLoad = true;
    },2500);

    this.apiService.getUserStatistics().subscribe((stats) => {
      this.globalPercentOfErrors = stats.optional.sprint.errorRatePercent;
      this.globalCountOfGames = stats.optional.sprint.totalGamesCompleted;
    });
  }
  public gameTime(): any {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
      if(this.timeLeft == 0) {
        this.gameTimeStop();
        this.gameTimeOut = true;
      }
    },1000)
  }

  public gameTimeStop() : void {
    clearInterval(this.interval);
  }

  public checkAnswer(state: any): void {
    this.countsCards++;
    if(this.countsCards == this.countOfCards){
      this.gameTimeStop();

      this.sendStatistic()
      this.gameOver = true;
    }

    if(!this.isTimer) {
      this.gameTime();
      this.isTimer = true;
    }
    if ((this.correctTranslates[state.gameItem.word] === state.gameItem.wordTranslate && state.answer) || (
      this.correctTranslates[state.gameItem.word] !== state.gameItem.wordTranslate && !state.answer
    )) {
      if (this.resultOfGame.countCorrectInRow <= 3) {
        this.inRowUnFour = false;
        this.scoreUnFour = 10
        this.resultOfGame.totalScore += this.scoreUnFour;
      } else {
        this.errorAnswer = false;
        this.inRowUnFour = true;
        this.scoreBeforeFour = 20 * this.numbersOfUpdateScore[this.boostScore];
        this.resultOfGame.totalScore +=  this.scoreBeforeFour;
        this.boostScore++
      }
      this.resultOfGame.countCorrectInRow++;
      this.resultOfGame.countOfCorrect++;
      this.audio.src = "../../../../../../../assets/audio/savannah/correct.mp3";
      this.audio.play();
    } else {
      this.resultOfGame.countCorrectInRow = 0;
      this.audio.src = "../../../../../../../assets/audio/savannah/error.mp3";
      this.audio.play();
      this.falseAnswer++
    }

    if (this.sliderValue <= this.countOfCards) {
      this.sliderValue++;
    } else this.sliderValue = 1;
    this.changeSlide(this.sliderValue);

    this.listOfGameTranslateItems[state.gameItem.index].isDisabled = true;
    this.resultOfGame.historyOfAnswers.push(state.answer);
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  openSnackBar(): void {
    this._snackBar.open('You can select an answer option using the "KeyLeft"(false) or "KeyRight"(true) key', 'End now', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  sendStatistic() : void {
    this.globalCountOfGames++;
    let countErrorsFromPercent: number = ((this.globalPercentOfErrors) * (this.countOfCards * this.globalCountOfGames)) / 100;
    countErrorsFromPercent += this.falseAnswer;
    this.globalPercentOfErrors = (countErrorsFromPercent * 100) / (this.countOfCards * this.globalCountOfGames);
    this.apiService.updateUserStatistics({
      optional: {
        sprint: {
          errorRatePercent: this.globalPercentOfErrors,
          totalGamesCompleted: this.globalCountOfGames,
        }
      }
    }).subscribe(res => {
          console.log(res.optional.sprint)
        }, error => {
          console.log(error)
        });
  }
  setWord(word: Word): void {
    this.currentWord = word;
  }
  setIsNotPlay(value: boolean): void {
    this.isNotPlay = value;
  }

  changeSlide(value: number): void {
    this.currentGameItem = this.listOfGameTranslateItems[value - 1];
  }

  private getRandomCount(isRandom, index): any {
    if(isRandom){
      const min: number = 0;
      const max: number = Math.floor(this.countOfCards - 1);
      while(this.randomNumbers.length < this.countOfCards) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if(this.randomNumbers.indexOf(randomNumber) > -1) continue;
        this.randomNumbers[this.randomNumbers.length] = randomNumber;
        this.counterListOfCards = this.randomNumbers[this.randomNumbers.length - 1];

        return this.counterListOfCards
      }}
    else {
      this.randomNumbers[this.randomNumbers.length] = index;
      return index;
    }
  }

  refresh(): void {
    window.location.reload();
  }

  playSound(): void {
    this.audio.src = `${this.config.dataUrl()}${this.currentGameItem.audio}`;
    this.audio.play();
  }

  changeLevel($event): void {
    let nameClass: string = $event.path[0].classList[1];
    if(nameClass == "level-A") this.currentGroupWords = 0;
    else if(nameClass == "level-B") this.currentGroupWords = 1;
    else if(nameClass == "level-C") this.currentGroupWords = 2;
    else if(nameClass == "level-D") this.currentGroupWords = 3;
    else if(nameClass == "level-E") this.currentGroupWords = 4;
    else if(nameClass == "level-F") this.currentGroupWords = 5;

    localStorage.setItem('levelGroup', this.currentGroupWords);
    window.location.reload();
  }

}



