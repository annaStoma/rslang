import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Word } from '../../../../../../shared/interfaces';
import { Config } from '../../../../../../common/config';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  @Output() currentWord = new EventEmitter<Word>();
  @Output() setIsNotPlay = new EventEmitter<boolean>();

  soundOffImg = '/assets/images/speakit/sound.png';
  soundOnImg = '/assets/images/speakit/sound-green.png';
  imgSrc = this.soundOffImg;
  audio = new Audio();

  @Input() word: Word;
  @Input() isNotPlay: boolean;

  constructor(private config: Config) { }

  ngOnInit(): void {
  }

  playSound(): void {

    if (this.isNotPlay) {
      this.currentWord.emit(this.word);
      this.imgSrc = this.soundOnImg;
      this.setIsNotPlay.emit(false);
      this.audio.src = `${this.config.dataUrl()}${this.word.audio}`;
      this.audio.play();

      this.audio.onended = () => {
        this.setIsNotPlay.emit(true);
        this.imgSrc = this.soundOffImg;
      };
    }
  }
}
