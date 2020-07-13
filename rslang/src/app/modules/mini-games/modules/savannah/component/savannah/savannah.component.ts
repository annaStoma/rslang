import { AUDIO_NAMES, CARD_NUMBER, KEY_CODE, MAX_NUMBER, SAVANNAH_DEFAULT_VALUES, SAVANNAH_START_VALUES } from './savannah-default-values';
import { Component, HostListener, OnInit } from '@angular/core';

import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config'
import { SavannahCard } from './savannah-card.model';
import { SavannahService } from './savannah.service';
import { first } from 'rxjs/operators';

// import { SavannahStatsWords } from './svannah-statistics.model';


@Component({
  selector: 'app-savannah',
  templateUrl: './savannah.component.html',
  styleUrls: [
    './savannah.component.scss',
    './savannah-loader.scss',
    './savannah-title.scss',
  ],
  providers: [SavannahService]
})
export class SavannahComponent implements OnInit {
  constructor(private savannahService: SavannahService, private urlConfig: Config, private apiService: ApiService,) {
    for (let i = 1; i < MAX_NUMBER.LEVEL; i++) {
      this.levels.push(i + 1);
    }
    for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
      this.pages.push(i + 1);
    }
  }

  levels: number[] = [];
  pages: number[] = [];
  savannahCards: SavannahCard[];
  remainGameCards: SavannahCard[];
  activeCard: SavannahCard;
  randomCards: SavannahCard[];
  lives: number;
  rightWords: number;
  mistakesNumber: number;
  currentCheckedWordsNumber: number;
  mistakeWordsArray: string[] = [];
  rightWordsArray: string[] = [];
  livesArray: Array<number> = [];
  isHiddenDescription = SAVANNAH_DEFAULT_VALUES.isHiddenDescription;
  isHiddenLoader = SAVANNAH_DEFAULT_VALUES.isHiddenLoader;
  isHiddenButton = SAVANNAH_DEFAULT_VALUES.isHiddenButton;
  isHiddenFinalScreen = SAVANNAH_DEFAULT_VALUES.isHiddenFinalScreen;
  isAnimationStart = SAVANNAH_DEFAULT_VALUES.isAnimationStart;
  isAnimationEnd = SAVANNAH_DEFAULT_VALUES.isAnimationEnd;
  isAnimationBullet = SAVANNAH_DEFAULT_VALUES.isAnimationBullet;
  isSoundSelected = SAVANNAH_DEFAULT_VALUES.isSoundSelected;

  // statistics: SavannahStatsWords[] = null;
  // repairStatistics: SavannahStatsWords[] = null;

  pageNumber: number = 0;
  wordsLevel: number = 0;

  totalErrorPercent: number;
  totalGamesNumber: number;

  title: string[] = 'SAVANAH'.split('').reverse();

  ngOnInit(): void { }

  getDefaultAdditionalGameValues(): void {
    this.isHiddenDescription = SAVANNAH_START_VALUES.isHiddenDescription;
    this.isHiddenButton = SAVANNAH_START_VALUES.isHiddenButton;
    this.isHiddenLoader = SAVANNAH_START_VALUES.isHiddenLoader;
    this.mistakesNumber = SAVANNAH_START_VALUES.mistakesNumber;
    this.currentCheckedWordsNumber = SAVANNAH_START_VALUES.currentCheckedWordsNumber;
    this.rightWords = SAVANNAH_START_VALUES.rightWords;
    this.isHiddenFinalScreen = SAVANNAH_START_VALUES.isHiddenFinalScreen;
    this.isAnimationStart = SAVANNAH_START_VALUES.isAnimationStart;
    this.lives = SAVANNAH_START_VALUES.lives;
    // this.livesArray = SAVANNAH_START_VALUES.livesArray;

    // this.livesArray.push(1);
    // this.livesArray.push(1);
    // this.livesArray.push(1);
    // this.livesArray.push(1);
    // this.livesArray.push(1);
    this.fullLivesArray();
    this.mistakeWordsArray = [];
    this.rightWordsArray = [];
  }

  fullLivesArray(): void {
    for (let i = 1; i <= this.lives; i++) {
      this.livesArray.push(i);
    }
  }

  newLevel(event: { target: { value: number; }; }): void {
    this.pageNumber = event.target.value - 1;
  }

  newPage(event: { target: { value: number; }; }): void {
    this.wordsLevel = event.target.value - 1;
  }

  // startGame(): void {
  //  const ABC =  this.apiService.getUserWords();
  //  console.log('ABC', ABC);
  // }


  startGame(): void {
    this.getDefaultAdditionalGameValues();
    this.getUserStatistic();
    this.savannahService
      .getWords(this.wordsLevel, this.pageNumber)
      .pipe(first()).subscribe((words) => {
        this.savannahCards = words;
        this.remainGameCards = [...this.savannahCards];
        this.getForeignWord();
      });
  }

  getForeignWord(): void {
    this.isHiddenLoader = true;
    this.setActiveCard();
    this.randomCards = this.getThreeRandomCardsRandomNumbers(
      this.savannahCards
    );
    this.randomCards.push(this.activeCard);
    //  console.log('RANDOM_CARDS: ', this.randomCards);
  }


  fallingBlock: ReturnType<typeof setTimeout>;

  setActiveCard(): void {
    this.correctWordSelected = false;

    const activeCardIndex: number = this.getRandomNumber(
      this.remainGameCards.length
    );

    this.activeCard = this.remainGameCards[activeCardIndex];
    this.soundForeignWord();
    this.fallingBlock = setTimeout(() => {
      this.ifGuessTheWord();
    }, 5000);
  }

  removeElementFromArray(array: SavannahCard[], value: SavannahCard) {
    const index: number = array.indexOf(value);
    array.splice(index, 1);
    return array;
  }

  getRandomNumber(maxValue: number): number {
    return Math.floor(Math.random() * Math.floor(maxValue));
  }

  getThreeRandomCardsRandomNumbers(
    cards: SavannahCard[]
  ): SavannahCard[] {
    const array = [...cards];
    const length = 3;
    const result = [];

    this.removeElementFromArray(array, this.activeCard);

    for (let i = 0; i < length; i++) {
      let index = this.getRandomNumber(array.length);
      let curCard = array[index];
      array.splice(index, 1);
      result.push(curCard);
    }

    return result;
  }

  checkResult(wordId: string): void {
    clearTimeout(this.fallingBlock);
    this.correctWordSelected = true;
    this.currentCheckedWordsNumber++;
    wordId === this.activeCard.wordId
      ? this.guessTheWord()
      : this.notGuessTheWord();
  }

  correctWordSelected: boolean = false;

  ifGuessTheWord(): void {
    if (!this.correctWordSelected) {
      this.notGuessTheWord();
    }
  }

  notGuessTheWord(): void {
    this.audioPlay(AUDIO_NAMES.ERROR);
    this.mistakeWordsArray.push(`${this.activeCard.foreignWord} : ${this.activeCard.nativeWord}`);
    this.lives--;
    this.livesArray.splice(0, 1);
    this.livesArray.length === 0 ? this.gameOver() : this.getRandomCards();
    this.isAnimationEnd = false;
    this.mistakesNumber++;
  }

  guessTheWord(): void {
    this.audioPlay(AUDIO_NAMES.CORRECT);
    this.isAnimationEnd = false;
    this.isAnimationBullet = true;
    this.rightWordsArray.push(`${this.activeCard.foreignWord} : ${this.activeCard.nativeWord}`);
    this.rightWords++;
    this.rightWords === 20 ? this.gameOver() : this.getNextRandomCards();
  }

  // soundForeignWord(): void {
  //   const msg = new SpeechSynthesisUtterance();
  //   const foreignWordText = this.activeCard.foreignWord;

  //   if (this.isSoundSelected) {
  //     msg.text = foreignWordText;
  //     speechSynthesis.speak(msg);
  //   }
  // }

  soundForeignWord(): void {
    const audio = new Audio();

    audio.src = `${this.urlConfig.dataUrl()}${this.activeCard.audioUrl}`;
    audio.play();
  }

  getNextRandomCards(): void {
    this.removeElementFromArray(this.remainGameCards, this.activeCard);
    this.getRandomCards();
  }

  getRandomCards(): void {
    const randomActiveNativeWordPosition: number = this.getRandomNumber(
      this.randomCards.length
    );

    this.setActiveCard();
    // this.soundForeignWord();
    this.randomCards = this.getThreeRandomCardsRandomNumbers(
      this.savannahCards
    );
    this.randomCards.splice(randomActiveNativeWordPosition, 0, this.activeCard);
    setTimeout(() => {
      this.isAnimationEnd = true;
    }, 1);

    setTimeout(() => {
      this.isAnimationBullet = false;
    }, 1000);
  }

  audioPlay(name: string): void {
    if (name && this.isSoundSelected) {
      const audioSrc = '../../../../../../../assets/audio/savannah/';
      const audio = new Audio(`${audioSrc}${name}.mp3`);

      audio.play();
    }
  }

  selectSound(): void {
    this.isSoundSelected = !this.isSoundSelected;
  }

  nextLevel(): void {
    if (this.pageNumber < MAX_NUMBER.PAGE) {
      this.pageNumber++;
    } else if (this.wordsLevel < MAX_NUMBER.LEVEL) {
      this.pageNumber = 1;
      this.wordsLevel++;
    } else {
      this.wordsLevel = 1;
      this.pageNumber = 1;
    }
  }

  gameOver(): void {
    this.nextLevel();
    this.isHiddenFinalScreen = false;
    this.isHiddenButton = false;
    this.activeCard = null;
    this.livesArray.length > 0
      ? this.audioPlay(AUDIO_NAMES.SUCCESS)
      : this.audioPlay(AUDIO_NAMES.FAILURE);

    // this.apiService.updateUserStatistics({
    //   optional: {
    //     savannah: {
    //       words: [{}, {}],
    //       errorRatePercent: 0,
    //       totalGamesCompleted: 0
    //     }
    //   }
    // }).subscribe(res => {
    //   console.log(res.optional.savannah)
    // }, error => {
    //   console.log(error)
    // });
this.setUserStatistic();
  }

getUserStatistic(): void {
  this.apiService.getUserStatistics().subscribe((stats) => {
    this.totalErrorPercent = stats.optional.savannah.errorRatePercent;
    this.totalGamesNumber = stats.optional.savannah.totalGamesCompleted;
  });
}

  setUserStatistic(): void {
  this.totalGamesNumber++;
  let countErrorsFromPercent: number = ((this.totalErrorPercent) * (this.currentCheckedWordsNumber * this.totalGamesNumber)) / 100;
    countErrorsFromPercent += this.mistakesNumber;
    this.totalErrorPercent = (countErrorsFromPercent * 100) / (this.currentCheckedWordsNumber * this.totalGamesNumber);
    this.apiService.updateUserStatistics({
      optional: {
        savannah: {
          // words: [{}, {}],
          errorRatePercent: this.totalErrorPercent,
          totalGamesCompleted: this.totalGamesNumber,
        }
      }
    }).subscribe(res => {
      console.log(res.optional.savannah)
    }, error => {
      console.log(error)
    });

  }

  ngOnDestroy(): void {
    clearTimeout(this.fallingBlock);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.activeCard) {
      switch (event.key) {
        case KEY_CODE.NUMBER_ONE.toString():
          this.checkResult(this.randomCards[CARD_NUMBER.FIRST].wordId);
          break;
        case KEY_CODE.NUMBER_TWO.toString():
          this.checkResult(this.randomCards[CARD_NUMBER.SECOND].wordId);
          break;
        case KEY_CODE.NUMBER_THREE.toString():
          this.checkResult(this.randomCards[CARD_NUMBER.THIRD].wordId);
          break;
        case KEY_CODE.NUMBER_FOUR.toString():
          this.checkResult(this.randomCards[CARD_NUMBER.FOURTH].wordId);
          break;
      }
    }
  }
}
