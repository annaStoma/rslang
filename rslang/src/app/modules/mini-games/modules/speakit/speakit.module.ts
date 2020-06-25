import { NgModule } from '@angular/core';
import { SpeakitComponent } from './components/speakit/speakit.component';
import { CommonModule } from '@angular/common';
import { WordCardComponent } from './components/word-card/word-card.component';

@NgModule({
  declarations: [SpeakitComponent, WordCardComponent],
  imports: [CommonModule],
})
export class SpeakitModule {}
