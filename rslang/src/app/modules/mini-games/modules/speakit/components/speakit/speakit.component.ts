import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';
import { SpeechRecognitionService } from '../../shared/services/speech-recognition.service';
import { ResultList, StatsWords, WordSpeakit } from '../../shared/interfaces';
import { ScrollService } from '../../shared/services/scroll.service';
import { timer } from 'rxjs';
import { Group, Page } from '../../../../../../shared/services/types';
import { GetWordsService } from '../../shared/services/get-words.service';
import { UserStatistic } from '../../../../../../shared/interfaces';

@Component({
  selector: 'app-speakit',
  templateUrl: './speakit.component.html',
  styleUrls: ['./speakit.component.scss'],
  providers: [SpeechRecognitionService, ScrollService, GetWordsService]
})
export class SpeakitComponent implements OnInit, OnDestroy {

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
  startScreen = true;
  closeStartScreen = false;
  isShowResults = false;
  group: Group = 0;
  statistics: StatsWords[];
  date = Date.now();
  page: number;
  isGuessed = false;

  constructor(private apiService: ApiService,
              private config: Config,
              private recognitionService: SpeechRecognitionService,
              private scroll: ScrollService,
              private getWordsService: GetWordsService) {
  }

  ngOnInit(): void {
    this.scroll.off();
    this.getWords();
  }

  ngOnDestroy(): void {
    this.resetGame();
  }

  getWords(): void {
    const page = Math.round(Math.random() * 29) as Page;
    this.page = page;
    this.apiService.getWords(this.group, page).subscribe(data => {
      this.words = this.getWordsService.getMix(data);
      this.isLoading = false;
    });

    this.apiService.getUserStatistics().subscribe((stats: UserStatistic) => {
      this.statistics = JSON.parse(stats.optional.speakit);
      console.log(this.statistics);
    }, () => {
      this.statistics = [];
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
    this.isLoading = true;
    this.date = Date.now();
    this.resetGame();
    this.getWords();
  }

  startStopRecord(): void {
    this.resetGame();

    if (!this.stopListen) {
      this.record();
    }
  }

  record(): void {
    if (this.countLearnedWords >= this.cardsCount) {
      return;
    }

    this.recordWait = true;
    this.recordOn = false;
    this.isGuessed = false;
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
                this.saveStats();
                this.isGuessed = true;
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

        if (!this.isGuessed && this.countLearnedWords < this.cardsCount) {
          this.record();
        }
      }
    }, () => {
      if (this.countLearnedWords < this.cardsCount) {
        this.recordWait = false;
        this.recordOn = true;
      }
    });
  }

  resetGame(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    if (this.words) {
      this.words.forEach(word => {
        word.learned = false;
      });
    }

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
    this.recordWait = false;
    this.recordOn = false;
  }

  startGame(): void {
    this.scroll.on();
    this.closeStartScreen = true;
    timer(350).subscribe(() => {
      this.startScreen = false;
    });
  }

  showResults(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
      this.isNotPlay = true;
      this.isPlayExample = false;
      this.isPlayMeaning = false;
    }

    if (this.recognition) {
      this.stopListen = true;
      this.recognition.abort();
    }

    this.isShowResults = true;
  }

  hideResults(newGame): void {
    this.isShowResults = false;

    if (this.recognition) {
      this.recognition.start();
    }

    if (newGame) {
      this.newGame();
    }
  }

  private saveStats() {

    const isData = this.statistics.find(w => w?.date === this.date);

    if (isData) {
      this.statistics.forEach(s => {
        if (s.date === this.date) {
          s.progress = this.countLearnedWords;
        }
      });
    } else {
      const newStats: StatsWords = {
        date: this.date,
        words: this.words.map(w => w.word),
        group: this.group,
        page: this.page,
        progress: this.countLearnedWords,
      };
      this.statistics.push(newStats);
    }

    const updateStats: UserStatistic = {
      learnedWords: 1,
      optional: {
       speakit: JSON.stringify(this.statistics)
      }
    };

    this.apiService.updateUserStatistics(updateStats).subscribe(res => {
      if (this.countLearnedWords >= this.cardsCount) {
        this.recordWait = false;
        this.recordOn = false;
        this.showResults();
      } else {
        this.record();
      }
    }, () => {
      console.log('something went wrong');
    });

  }
}
