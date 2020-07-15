import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { CardImgDirective } from './shared/directives/card-img.directive';

import { SpeakitComponent } from './components/speakit/speakit.component';
import { WordCardComponent } from './components/word-card/word-card.component';
import { CheckLevelRadioButtonComponent } from './components/check-level-radio-button/check-level-radio-button.component';
import { ShowResultsComponent } from './components/show-results/show-results.component';
import { GamesStatsComponent } from './components/games-stats/games-stats.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SpeakitComponent,
    WordCardComponent,
    CheckLevelRadioButtonComponent,
    CardImgDirective,
    ShowResultsComponent,
    GamesStatsComponent
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  exports: [
    WordCardComponent
  ]
})
export class SpeakitModule {}
