import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Config } from '../../../../../../common/config';
import { SpeechRecognitionService } from '../../shared/services/speech-recognition.service';
import { ResultList, StatsWords, WordSpeakit } from '../../shared/interfaces';
import { ScrollService } from '../../shared/services/scroll.service';
import { timer } from 'rxjs';
import { Group, Page } from '../../../../../../shared/types';
import { GetWordsService } from '../../shared/services/get-words.service';
import { UserStatistic } from '../../../../../../shared/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  statistics: StatsWords[] = null;
  repairStatistics: StatsWords[] = null;
  group: Group = 0;
  page: Page;
  date = Date.now();
  isGuessed = false;
  isShowGameStats = false;

  constructor(private apiService: ApiService,
              private config: Config,
              private recognitionService: SpeechRecognitionService,
              private scroll: ScrollService,
              private getWordsService: GetWordsService,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.scroll.off();
    this.getWords();
  }

  ngOnDestroy(): void {
    this.scroll.on();
    this.resetGame();
    this.snackBar.dismiss();
  }

  getWords(): void {
    const page = Math.round(Math.random() * 29) as Page;
    this.page = page;
    this.apiService.getWords(this.group, page).subscribe(data => {
      this.words = this.getWordsService.getMix(data);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackBar.open(error.error, 'Connection error', {
        duration: 5000,
      });
      this.resetGame();
    });

    this.apiService.getUserStatistics().subscribe((stats: UserStatistic) => {
      this.statistics = JSON.parse(stats.optional.speakit);
    }, () => {
      this.isLoading = false;
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

    let coincidence = false;

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
                if (coincidence === false) {
                  coincidence = true;
                  percent = Math.round(result[key] * 100);
                  this.spokenWord = `${word.word} (${percent ? percent : '<5'})%`;
                  this.cardImg = word.image;
                  word.learned = true;
                  this.countLearnedWords++;
                  if (this.repairStatistics) {
                    this.statistics = this.repairStatistics;
                    this.repairStatistics = null;
                    this.date = Date.now();
                  }
                  this.saveStats();
                  this.isGuessed = true;
                }
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
    this.stopActions();
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

  hideStats(repairGame: StatsWords) {
    this.isShowGameStats = false;

    if (this.recognition) {
      this.recognition.start();
    }


    if (repairGame) {
      this.isLoading = true;
      this.date = repairGame.date;
      this.group = repairGame.group as Group;
      this.page = repairGame.page as Page;
      this.resetGame();
      this.apiService.getWords(this.group, this.page).subscribe(data => {
        this.words = this.getWordsService.filter(repairGame.words, data);
        this.repairStatistics = this.statistics.filter(s => s.date !== this.date);
        this.isLoading = false;
      });
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

    this.statistics = this.statistics.slice(-10);

    const updateStats: UserStatistic = {
      learnedWords: 0,
      optional: {
        speakit: JSON.stringify(this.statistics)
      }
    };

    this.apiService.updateUserStatistics(updateStats).subscribe(() => {
      if (this.countLearnedWords >= this.cardsCount) {
        this.recordWait = false;
        this.recordOn = false;
        this.showResults();
      } else {
        this.record();
      }
    }, error => {
      this.snackBar.open(error.error, 'Connection error', {
        duration: 5000,
      });
      this.resetGame();
    });

  }

  showGameStats(): void {
    this.scroll.off();
    this.stopActions();
    this.isShowGameStats = true;
  }

  private stopActions(): void {
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
  }

  changeLevel(level: Group): void {
    this.group = level;
    this.newGame();
  }
}
