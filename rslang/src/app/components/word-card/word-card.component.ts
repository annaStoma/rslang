import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
})
export class WordCardComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  @Input() group: number;
  @Input() page: number;
  @Input() word: string;
  @Input() image: string;
  @Input() audio: string;
  @Input() audioMeaning: string;
  @Input() audioExample: string;
  @Input() textMeaning: string;
  @Input() textExample: string;
  @Input() transcription: string;
  @Input() textExampleTranslate: string;
  @Input() textMeaningTranslate: string;
  @Input() wordTranslate: string;
  @Input() wordsPerExampleSentence: number;
  @Input() isShowTranslation: boolean;
  @Input() isShowExplanation: boolean;
  @Input() isShowExampleText: boolean;
  @Input() isShowTranscription: boolean;
  @Input() isShowAssociation: boolean;
  @Input() isShowTextExampleTranslate: boolean;
  @Input() isShowTextMeaningTranslate: boolean;
  @Input() isAutoPlay: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() hard: EventEmitter<any> = new EventEmitter<any>();
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  hiddenTextExample: string = this.textExample;
  isWordHidden: boolean = true;
  hiddenTextMeaning: string = this.textMeaning;
  isWordTranslationHidden: boolean = false;
  isExplanationHidden: boolean = false;
  isExampleTextHidden: boolean = false;
  wordForm: FormGroup;

//  @ViewChild('inputWord', {static: true}) inputWord: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.inputWord.nativeElement.focus();
    // }, 0);
    this.wordForm = new FormGroup({
      word: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp(`${ this.word }`, 'giu'))
      ])
    });
    if (this.isShowExampleText || this.isShowExplanation) {
      const reg = new RegExp(`${ this.word }`, 'i');
      this.hiddenTextMeaning = this.textMeaning.replace(reg, '*');
      this.hiddenTextExample = this.textExample.replace(reg, '*');
    }
  }

  ngAfterViewInit() {
    // this.inputWord.nativeElement.focus();
  }

  showAnswer(): void {
    this.hiddenTextMeaning = this.textMeaning;
    this.hiddenTextExample = this.textExample;
    this.isWordHidden = false;
  }

  playWord(): any {
    if (!this.wordForm.invalid) {
      this.showAnswer();
      if (this.isShowTranslation) {
        this.isWordTranslationHidden = true;
      }
      if (this.isShowTextMeaningTranslate) {
        this.isExplanationHidden = true;
      }
      if (this.isShowTextExampleTranslate) {
        this.isExampleTextHidden = true;
      }
      const word = new SpeechSynthesisUtterance(this.word);
      if (this.isAutoPlay) {
        window.speechSynthesis.speak(word);
        word.onend = () => {
          this.playText();
        };
      }
    }
  }

  playText(): void {
    if (this.isShowExplanation) {
      const play = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${ this.audioMeaning }`);
      play.play();
      play.onended = () => {
        if (this.isShowExampleText) {
          new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${ this.audioExample }`)
            .play();
        }
      };
    }
  }

}
