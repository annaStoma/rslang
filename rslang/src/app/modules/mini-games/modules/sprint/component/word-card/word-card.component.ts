import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameTranslateItem, Word } from '../../../../../../shared/interfaces';


@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {
  @Output() currentWord = new EventEmitter<Word>();
  @Output() setIsNotPlay = new EventEmitter<boolean>();
  @Output() emitAnswer: EventEmitter<object> = new EventEmitter<object>();



  @Input() gameItem: GameTranslateItem;
  @Input() word: Word;
  @Input() isNotPlay: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  public checkAnswer(state: boolean): void {
    this.emitAnswer.emit({gameItem: this.gameItem, answer: state});
  }

}
