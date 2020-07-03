import { Component, OnInit, Input, Output, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { WordsService } from './words.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { element } from 'protractor';

@Component({
  selector: 'app-english-puzzle',
  templateUrl: './english-puzzle.component.html',
  styleUrls: ['./english-puzzle.component.scss'],
})
export class EnglishPuzzleComponent implements OnInit {
  levels: number[] = [];
  pages: number[] = [];
  constructor(private wordsService: WordsService) {
    const levelsNumber = 6;
    const pagesNumber = 60;
    for (let i = 0; i < levelsNumber; i++) {
      this.levels.push(i + 1);
    }
    for (let i = 0; i < pagesNumber; i++) {
      this.pages.push(i + 1);
    }
  }

  isSmall:boolean = false;
  hiddenContinue = true;
  answers: string[] = [];
  wrongWords: string[] = [];
  rightWords: string[] = [];
  words: object[] = [];
  currentWordNumber = 0;
  numberOfLetters: number;
  currentTextExample: string;
  currentWord: string;
  currentSplittedTextExample: string[];
  currentAnswer: string[] = [];
  page = 0;
  level = 0;
  textTranslate = '';
  ngOnInit() {
    this.wordsService.getWords().subscribe((data: object[]) => {
      this.words = data;
      this.currentTextExample = this.getCurrentTextExample();
      this.currentWord = this.words[this.currentWordNumber]['word'];
      this.numberOfLetters = this.currentTextExample.replace(/ /g, '').length;
      this.currentSplittedTextExample = this.currentTextExample.split(' ');
      return this.words;
    });
  }

  setStyleOfTextExample(text) {
    return {
      'width': (text.length / this.numberOfLetters * 100) + '%',
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  abort() {
    this.wrongWords.push(this.currentWord);
    this.hiddenContinue = false;
    this.answers.push(this.currentTextExample);
    this.currentSplittedTextExample = [];
    this.currentAnswer = [];
    this.setLearnedWords()
  }

  check(event) {
    if (this.currentAnswer.join(' ') === this.currentTextExample) {
      this.answers.push(this.currentTextExample);
      this.rightWords.push(this.currentWord);
      this.currentAnswer = [];
      this.setLearnedWords();
      this.hiddenContinue = false;
    } else {
      document.querySelectorAll(".word").forEach((item)=>{
        item.classList.add("field-for-words__wrong");
      })
      setTimeout(() => {
        document.querySelectorAll(".word").forEach((item)=>{
          item.classList.remove("field-for-words__wrong");
        })
      }, 500);
    }
  }

  newLine() {
    this.hiddenContinue = true;
    this.currentWordNumber++;
    this.currentTextExample = this.getCurrentTextExample();
    this.currentWord = this.words[this.currentWordNumber]['word'];
    this.numberOfLetters = this.currentTextExample.replace(/ /g, '').length;
    this.currentSplittedTextExample = this.currentTextExample.split(' ');
  }

  getCurrentTextExample(): string {
    return this.words[this.currentWordNumber]['textExample'].replace(
      /<.?.?.?>/g,
      ''
    );
  }

  getCurrentTextTranslate(): void {
    this.textTranslate = this.words[this.currentWordNumber][
      'textExampleTranslate'
    ];
  }

  wordToBottomBlock(text) {
    const index = this.currentAnswer.indexOf(text);
    if (index !== -1) {
      this.currentAnswer.splice(index, 1);
      this.currentSplittedTextExample.push(text);
    }
  }

  wordToUpperBlock(text) {
    const index = this.currentSplittedTextExample.indexOf(text);
    if (index !== -1) {
      this.currentSplittedTextExample.splice(index, 1);
      this.currentAnswer.push(text);
    }
  }

  newLevel(evt) {
    this.wordsService.level = evt.target.value;
    this.resetQuestion();
  }

  newPage(evt) {
    this.wordsService.page = evt.target.value;
    this.resetQuestion();
  }

  nextLevel() {
    const lvl = document.querySelector(".menu__level");
    const pg = document.querySelector(".menu__page");
    if (pg["value"] < 60) {
      pg["value"]++  
    } else if (lvl["value"] < 6) {
      pg["value"] = 1;
      lvl["value"]++;
    } else {
      pg["value"] = 1;
      lvl["value"] = 1;
    }
    this.wordsService.level = lvl["value"];
    this.wordsService.page = pg["value"];
    this.resetQuestion();
  }

  resetQuestion() {
    this.answers = [];
    this.currentAnswer = [];
    this.currentWordNumber = 0;
    this.hiddenContinue = true;
    this.wordsService.getWords().subscribe((data: object[]) => {
      this.words =
        this.wordsService.page % 2 !== 0 ? data.slice(10) : data.slice(0, 10);
      this.currentTextExample = this.getCurrentTextExample();
      this.currentWord = this.words[this.currentWordNumber]['word'];
      this.numberOfLetters = this.currentTextExample.replace(/ /g, '').length;
      this.currentSplittedTextExample = this.currentTextExample.split(' ');
      return this.words;
    });
  }

  setLearnedWords() {
    this.wordsService.setUserStatistic(this.rightWords, this.wrongWords);
  }

  voiceExample() {
    const message = new SpeechSynthesisUtterance();
    message.lang = "en";
    message.text = this.currentTextExample;
    window.speechSynthesis.speak(message);
  }
}
