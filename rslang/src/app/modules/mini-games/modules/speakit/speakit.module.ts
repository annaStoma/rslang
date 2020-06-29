import { NgModule } from '@angular/core';
import { SpeakitComponent } from './components/speakit/speakit.component';
import { CommonModule } from '@angular/common';
import { WordCardComponent } from './components/word-card/word-card.component';
import { CheckLevelRadioButtonComponent } from './components/check-level-radio-button/check-level-radio-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CardImgDirective } from './components/directives/card-img.directive';

@NgModule({
  declarations: [SpeakitComponent, WordCardComponent, CheckLevelRadioButtonComponent, CardImgDirective],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class SpeakitModule {}
