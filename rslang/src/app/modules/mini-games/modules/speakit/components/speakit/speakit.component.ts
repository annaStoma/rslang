import { Component, OnInit } from '@angular/core';
import { Word } from '../../../../../../shared/interfaces';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';
import { SpeechRecognitionService } from '../../shared/services/speech-recognition.service';

@Component({
  selector: 'app-speakit',
  templateUrl: './speakit.component.html',
  styleUrls: ['./speakit.component.scss'],
  providers: [SpeechRecognitionService]
})
export class SpeakitComponent implements OnInit {

  defaultImg = 'english.jpeg';
  words: Word[];
  levels = ['A', 'B', 'C', 'D', 'E', 'F'];
  currentWord: Word;
  cardImg = this.defaultImg;
  isNotPlay = true;
  isPlayExample = false;
  isPlayMeaning = false;
  audio: HTMLAudioElement;

  constructor(private apiService: ApiService,
              private config: Config,
              private recognitionService: SpeechRecognitionService) {
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

  playAudio(isPlay: string, audio: string): void {
    if (this.isNotPlay) {
      this[isPlay] = true;
      this.isNotPlay = false;
      this.audio = new Audio();
      this.audio.src = `${this.config.dataUrl()}${this.currentWord[audio]}`;
      this.audio.play();
      this.audio.onended = () => {
        this.isNotPlay = true;
        this[isPlay] = false;
      };
    }
  }

  newGame(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.isNotPlay = true;
    this.isPlayExample = false;
    this.isPlayMeaning = false;
    this.currentWord = null;
    this.cardImg = this.defaultImg;
  }

  record(): void {
    this.recognitionService.listen((res) => {
      console.log(res);
      this.record();
    }, () => {
      console.log('start');
    });
  }
}
