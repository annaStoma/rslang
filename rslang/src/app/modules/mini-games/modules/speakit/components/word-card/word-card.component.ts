import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../../../../../../shared/interfaces';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  @Input() word: Word;

  constructor() { }

  ngOnInit(): void {
  }

}
