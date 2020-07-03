import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { WordSpeakit } from '../../shared/interfaces';
import { ScrollService } from '../../shared/services/scroll.service';
import { Config } from '../../../../../../common/config';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent implements OnInit, OnDestroy {

  @Output() hideResult = new EventEmitter();
  @Input() words: WordSpeakit[];

  isHideResult = false;
  knowWords: WordSpeakit[];
  dontKnowWords: WordSpeakit[];
  isNotPlay = true;
  private audio: HTMLAudioElement;

  constructor(private scroll: ScrollService,
              private config: Config) {
  }

  ngOnInit(): void {
    this.knowWords = this.words.filter(word => word.learned);
    this.dontKnowWords = this.words.filter(word => !word.learned);
    this.scroll.off();
  }

  ngOnDestroy(): void {
    this.scroll.on();
  }

  close(newGame = false) {
    this.scroll.on();
    this.isHideResult = true;
    timer(350)
      .subscribe(() => { this.hideResult.emit(newGame); });
  }

  play(word: WordSpeakit): void {
    if (this.isNotPlay) {
      this.isNotPlay = false;
      this.audio = new Audio();
      this.audio.src = `${this.config.dataUrl()}${word.audio}`;
      this.audio.play();
      this.audio.onended = () => {
        this.isNotPlay = true;
      };
    }
  }

  newGame() {
    this.close(true);
  }
}
