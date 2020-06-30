import { Component, OnInit } from '@angular/core';
import { Word } from '../../../../../../shared/interfaces';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';
import { SpeechRecognitionService } from '../../shared/services/speech-recognition.service';
import { ResultList, WordSpeakit } from '../../shared/interfaces';

@Component({
  selector: 'app-speakit',
  templateUrl: './speakit.component.html',
  styleUrls: ['./speakit.component.scss'],
  providers: [SpeechRecognitionService]
})
export class SpeakitComponent implements OnInit {

  defaultImg = 'english.jpeg';
  words: WordSpeakit[];
  levels = ['A', 'B', 'C', 'D', 'E', 'F'];
  currentWord: WordSpeakit;
  cardImg = this.defaultImg;
  isNotPlay = true;
  isPlayExample = false;
  isPlayMeaning = false;
  audio: HTMLAudioElement;
  isLoading = true;
  countLearnedWords = 0;
  cardsCount = 10;
  spokenWord = '';
  stopListen = false;
  recognition: SpeechRecognition = null;
  heardAs = '';
  recordWait = false;
  recordOn = false;

  constructor(private apiService: ApiService,
              private config: Config,
              private recognitionService: SpeechRecognitionService) {
  }

  ngOnInit(): void {
    this.apiService.getWords(0, 0).subscribe(data => {
      this.words = data.slice(10).map((w: Word) => ({...w, learned: false}));
      this.isLoading = false;
    });
  }

  setWord(word: WordSpeakit): void {
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
    this.resetGame();
  }

  startStopRecord() {
    this.resetGame();

    if (!this.stopListen) {
      this.record();
    }
  }

  record(): void {
    this.recordWait = true;
    this.recordOn = false;
    this.recognition = this.recognitionService.listen((result: ResultList) => {
      this.heardAs = '';
      this.spokenWord = '';
      let isRecognized = true;

      if (this.stopListen) {
        this.stopListen = false;
      } else {
        const keys = Object.keys(result);
        let percent: number;
        keys.forEach(key => {
          this.words.forEach(word => {
            if (key.toLowerCase() === word.word.toLowerCase()) {
              if (word.learned) {
                isRecognized = false;
              } else {
                percent = Math.round(result[key] * 100);
                this.spokenWord = `${word.word} (${percent ? percent : '<5'})%`;
                this.cardImg = word.image;
                word.learned = true;
                this.countLearnedWords++;
              }
            }
          });
        });

        if (isRecognized) {
          let tempKey = 0;
          let tempValue;
          for (const [key, value] of Object.entries(result)) {
            const curPercent = Math.round(value * 100);
            if (curPercent > tempKey) {
              tempKey = curPercent;
              tempValue = key;
            }
          }

          this.spokenWord = this.spokenWord || 'not recognized';

          if (!percent || percent < tempKey) {
            this.heardAs = tempValue ? `heard as "${tempValue}" (${Math.round(tempKey)})%` : '';
          }
        }
        if (this.countLearnedWords >= this.cardsCount) {
          console.log('learned');
          this.recordWait = false;
          this.recordOn = false;
        } else {
          this.record();
        }
      }
    }, () => {
      this.recordWait = false;
      this.recordOn = true;
    });
  }

  resetGame(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    this.words.forEach(word => {
      word.learned = false;
    });

    if (this.recognition) {
      this.stopListen = true;
      this.recognition.abort();
      this.recognition = null;
    }

    this.spokenWord = '';
    this.isNotPlay = true;
    this.isPlayExample = false;
    this.isPlayMeaning = false;
    this.currentWord = null;
    this.cardImg = this.defaultImg;
    this.countLearnedWords = 0;
    this.heardAs = '';
  }
}
