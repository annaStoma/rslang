import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakitModule } from './modules/speakit/speakit.module';
import { SavannaModule } from './modules/savanna/savanna.module';
import { AudiocallModule } from './modules/audiocall/audiocall.module';
import { EnglishPuzzleModule } from './modules/english-puzzle/english-puzzle.module';
import { OwnGameModule } from './modules/own-game/own-game.module';
import { SprintModule } from './modules/sprint/sprint.module';
import { MiniGamesComponent } from './mini-games.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MiniGamesComponent],
  imports: [
    CommonModule,
    SpeakitModule,
    SavannaModule,
    AudiocallModule,
    EnglishPuzzleModule,
    OwnGameModule,
    SprintModule,
    RouterModule,
  ],
})
export class MiniGamesModule {}
