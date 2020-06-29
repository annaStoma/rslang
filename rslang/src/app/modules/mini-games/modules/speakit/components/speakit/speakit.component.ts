import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Word } from '../../../../../../shared/interfaces';
import { ApiService } from '../../../../../../shared/services/api.service';

@Component({
  selector: 'app-speakit',
  templateUrl: './speakit.component.html',
  styleUrls: ['./speakit.component.scss'],
})
export class SpeakitComponent implements OnInit {

  defaultImg = 'english.jpeg';
  words: Word[];
  levels = ['A', 'B', 'C', 'D', 'E', 'F'];
  currentWord: Word;
  cardImg = this.defaultImg;
  isNotPlay = true;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getWords(0, 0).subscribe(data => {
      this.words = data.slice(10);
    });
  }

  setWord(word: Word): void {
    this.cardImg = word?.image || this.defaultImg;
    this.currentWord = word;
  }

  setIsNotPlay(value: boolean): void {
    this.isNotPlay = value;
  }
}
