import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../shared/services/api.service';
import { UsersWords, Word } from '../../shared/interfaces';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: ['./learning-mode.component.scss'],
})

export class LearningModeComponent implements OnInit {
  wordsToLearn: Array<Word>;
  public customOptions: OwlOptions = {
    loop: true,
    center: true,
    dots: true,
    freeDrag: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoHeight: false,
    autoWidth: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      }
    }
  };
  isSpinnerVisible = false;

  maxWords: number;
  wordsPerDay: number;
  translation: boolean;
  explanation: boolean;
  exampleText: boolean;
  transcription: boolean;
  association: boolean;
  textExampleTranslate: boolean;
  textMeaningTranslate: boolean;
  autoPlay: boolean;
  group: number;

  constructor(private readonly http: HttpClient, private apiService: ApiService) {
  }

  ngOnInit() {
    this.isSpinnerVisible = true;
    this.apiService.getUserSettings()
      .subscribe(settings => {
        this.maxWords = settings.optional.maxWords;
        this.wordsPerDay = settings.wordsPerDay;
        this.translation = settings.optional.translation;
        this.explanation = settings.optional.explanation;
        this.exampleText = settings.optional.exampleText;
        this.transcription = settings.optional.transcription;
        this.association = settings.optional.association;
        this.textExampleTranslate = settings.optional.textExampleTranslate;
        this.textMeaningTranslate = settings.optional.textMeaningTranslate;
        this.autoPlay = settings.optional.autoPlay;
        this.group = settings.optional.group;
        this.getWordsToLearn();
      });
  }

  getWordsToLearn(): void {
    this.apiService.getUserAggregatedWords({'userWord.difficulty': 'hard'})
      .subscribe(data => {
        this.apiService.getUserAggregatedWords({'userWord.difficulty': null}, this.maxWords, this.group)
          .subscribe(words => {
            this.wordsToLearn = [...data[0].paginatedResults, ...words[0].paginatedResults];
            this.wordsToLearn.length = this.maxWords;
            this.isSpinnerVisible = false;
          });
      });
  }

  deleteSlide(id: string): void {
    this.wordsToLearn = this.wordsToLearn.filter(n => n._id !== id);
    const body: UsersWords = {
      difficulty: 'easy',
      optional: {
        deleted: true
      }
    };
    this.apiService.updateUserWordByWordId(id, body)
      .pipe(first())
      .subscribe(data => data);
  }

  addToHard(id: string): void {
    this.wordsToLearn = this.wordsToLearn.filter(n => n._id !== id);
    const body: UsersWords = {
      difficulty: 'hard',
      optional: {
        hard: true
      }
    };
    this.apiService.updateUserWordByWordId(id, body)
      .pipe(first())
      .subscribe(data => data);
  }

  addToLearned(id: string): void {
    this.wordsToLearn = this.wordsToLearn.filter(n => n._id !== id);
    const body: UsersWords = {
      difficulty: 'easy',
      optional: {
        learned: true
      }
    };
    this.apiService.createUserWordByWordId(id, body).subscribe(_ => {
      return this.apiService.updateUserWordByWordId(id, body).subscribe(data => data);
    });
  }

}
