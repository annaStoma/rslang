import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config } from '../../../../../../common/config';
import { WordSpeakit } from '../../shared/interfaces';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  @Output() currentWord = new EventEmitter<WordSpeakit>();
  @Output() setIsNotPlay = new EventEmitter<boolean>();

  soundOffImg = '/assets/images/speakit/sound.png';
  soundOnImg = '/assets/images/speakit/sound-green.png';
  imgSrc = this.soundOffImg;
  audio = new Audio();

  @Input() word: WordSpeakit;
  @Input() isNotPlay: boolean;
  @Input() speech: SpeechRecognition;
  isPlay = false;

  constructor(private config: Config) { }

  ngOnInit(): void {
  }

  playSound(): void {
    if (this.isNotPlay && !this.speech) {
      this.isPlay = true;
      this.currentWord.emit(this.word);
      this.imgSrc = this.soundOnImg;
      this.setIsNotPlay.emit(false);
      this.audio.src = `${this.config.dataUrl()}${this.word.audio}`;
      this.audio.play();

      this.audio.onended = () => {
        this.setIsNotPlay.emit(true);
        this.imgSrc = this.soundOffImg;
        this.isPlay = false;
      };

      this.audio.onerror = () => {
        this.setIsNotPlay.emit(true);
        this.imgSrc = this.soundOffImg;
        this.isPlay = false;
      };
    }
  }
}
