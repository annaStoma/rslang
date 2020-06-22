import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniGamesComponent } from './mini-games.component';
import { SpeakitComponent } from './modules/speakit/components/speakit/speakit.component';
import { AudiocallComponent } from './modules/audiocall/component/audiocall/audiocall.component';
import { EnglishPuzzleComponent } from './modules/english-puzzle/component/english-puzzle/english-puzzle.component';
import { SavannaComponent } from './modules/savanna/component/savanna/savanna.component';
import { OwnGameComponent } from './modules/own-game/component/own-game/own-game.component';
import { SprintComponent } from './modules/sprint/component/sprint/sprint.component';
import { NotFoundPageComponent } from '../../components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: MiniGamesComponent,
    children: [
      {
        path: 'speakit',
        component: SpeakitComponent,
      },
      {
        path: 'savanna',
        component: SavannaComponent,
      },
      {
        path: 'audiocall',
        component: AudiocallComponent,
      },
      {
        path: 'english-puzzle',
        component: EnglishPuzzleComponent,
      },
      {
        path: 'own-game',
        component: OwnGameComponent,
      },
      {
        path: 'sprint',
        component: SprintComponent,
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniGamesRoutingModule {}
