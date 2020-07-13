import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { SprintTranslateItem, SprintWord } from '../../../../../../shared/interfaces';


@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {
  @Output() currentWord = new EventEmitter<SprintWord>();
  @Output() setIsNotPlay = new EventEmitter<boolean>();
  @Output() emitAnswer: EventEmitter<object> = new EventEmitter<object>();



  @Input() gameItem: SprintTranslateItem;
  @Input() word: SprintWord;
  @Input() isNotPlay: boolean;
  @HostListener('document:keydown.arrowLeft', ['$event'])
  checkAnswerFalse(event: KeyboardEvent) {
    this.checkAnswer(false);
  }
  @HostListener('document:keydown.arrowRight', ['$event'])
  checkAnswerTrue(event: KeyboardEvent) {
    this.checkAnswer(true);
  }
  constructor() {
  }

  ngOnInit(): void {
  }

  public checkAnswer(state: boolean): void {
    this.emitAnswer.emit({gameItem: this.gameItem, answer: state});
  }

}
