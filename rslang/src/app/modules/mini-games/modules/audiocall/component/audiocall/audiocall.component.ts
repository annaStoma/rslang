import { AUDIOCALL_DEFAULT_VALUES, AUDIOCALL_START_VALUES, AUDIO_NAMES, CARD_NUMBER, KEY_CODE } from './audiocall-default-values';
import { Component, HostListener, OnInit } from '@angular/core';

import { AudioCallCard } from './audiocall-card.model';
import { AudioCallService } from './audiocall.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.scss'],
  providers: [AudioCallService]
})
export class AudiocallComponent implements OnInit {
  constructor(private audioCallService: AudioCallService) { }

  audioCallCards: AudioCallCard[];
  remainGameCards: AudioCallCard[];
  activeCard: AudioCallCard;
  randomCards: AudioCallCard[];
  lives: number;
  rightWords: number;
  mistakes: number;
  livesArray: Array<number> = AUDIOCALL_DEFAULT_VALUES.livesArray;
  isHiddenDescription = AUDIOCALL_DEFAULT_VALUES.isHiddenDescription;
  isHiddenLoader = AUDIOCALL_DEFAULT_VALUES.isHiddenLoader;
  isHiddenButton = AUDIOCALL_DEFAULT_VALUES.isHiddenButton;
  isHiddenFinalScreen = AUDIOCALL_DEFAULT_VALUES.isHiddenFinalScreen;
  isAnimationStart = AUDIOCALL_DEFAULT_VALUES.isAnimationStart;
  isAnimationEnd = AUDIOCALL_DEFAULT_VALUES.isAnimationEnd;
  isAnimationBullet = AUDIOCALL_DEFAULT_VALUES.isAnimationBullet;
  isSoundSelected = AUDIOCALL_DEFAULT_VALUES.isSoundSelected;

  title: string[] = 'SAVANAH'.split('').reverse();

  ngOnInit(): void { }

  getDefaultAdditionalGameValues(): void {
    this.isHiddenDescription = AUDIOCALL_START_VALUES.isHiddenDescription;
    this.isHiddenButton = AUDIOCALL_START_VALUES.isHiddenButton;
    this.isHiddenLoader = AUDIOCALL_START_VALUES.isHiddenLoader;
    this.lives = AUDIOCALL_START_VALUES.lives;
    this.mistakes = AUDIOCALL_START_VALUES.mistakes;
    this.rightWords = AUDIOCALL_START_VALUES.rightWords;
    this.isHiddenFinalScreen = AUDIOCALL_START_VALUES.isHiddenFinalScreen;
  }

  startGame(): void {
    this.getDefaultAdditionalGameValues();
    this.audioCallService
      .getWords()
      .pipe(first()).subscribe((words) => {
        this.audioCallCards = words;
        this.remainGameCards = [...this.audioCallCards];
        this.getForeignWord();
      });
  }

  getForeignWord(): void {
    this.isHiddenLoader = true;
    this.setActiveCard();
    this.randomCards = this.getThreeRandomCardsRandomNumbers(
      this.audioCallCards
    );
    this.randomCards.push(this.activeCard);
  }


  fallingBlock: ReturnType<typeof setTimeout>;

  setActiveCard(): void {
    this.correctWordSelected = false;

    const activeCardIndex: number = this.getRandomNumber(
      this.remainGameCards.length
    );

    this.activeCard = this.remainGameCards[activeCardIndex];
    this.fallingBlock = setTimeout(() => {
      this.ifGuessTheWord();
    }, 5000);
  }

  removeElementFromArray(array: AudioCallCard[], value: AudioCallCard) {
    const index: number = array.indexOf(value);
    array.splice(index, 1);
    return array;
  }

  getRandomNumber(maxValue: number): number {
    return Math.floor(Math.random() * Math.floor(maxValue));
  }

  getThreeRandomCardsRandomNumbers(
    cards: AudioCallCard[]
  ): AudioCallCard[] {
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
    this.lives--;
    this.livesArray.splice(0, 1);
    this.livesArray.length === 0 ? this.gameOver() : this.getRandomCards();
    this.isAnimationEnd = false;
    this.mistakes++;
  }

  guessTheWord(): void {
    this.audioPlay(AUDIO_NAMES.CORRECT);
    this.isAnimationEnd = false;
    this.isAnimationBullet = true;
    this.rightWords++;
    this.rightWords === 20 ? this.gameOver() : this.getNextRandomCards();
  }

  soundForeignWord(): void {
    const msg = new SpeechSynthesisUtterance();
    const foreignWordText = this.activeCard.foreignWord;

    if (this.isSoundSelected) {
      msg.text = foreignWordText;
      speechSynthesis.speak(msg);
    }
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
    this.soundForeignWord();
    this.randomCards = this.getThreeRandomCardsRandomNumbers(
      this.audioCallCards
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
      const audio = new Audio(`../../../../../../../assets/audio/savannah-${name}.mp3`);

      audio.play();
    }
  }

  selectSound(): void {
    this.isSoundSelected = !this.isSoundSelected;
  }

  gameOver(): void {
    this.isHiddenFinalScreen = false;
    this.isHiddenButton = false;
    this.activeCard = null;
    this.livesArray.length > 0
      ? this.audioPlay(AUDIO_NAMES.SUCCESS)
      : this.audioPlay(AUDIO_NAMES.FAILURE);
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
