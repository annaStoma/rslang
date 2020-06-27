import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniGamesComponent } from './mini-games.component';
import { SpeakitComponent } from './modules/speakit/components/speakit/speakit.component';
import { AudiocallComponent } from './modules/audiocall/component/audiocall/audiocall.component';
import { EnglishPuzzleComponent } from './modules/english-puzzle/component/english-puzzle/english-puzzle.component';
import { SavannahComponent } from './modules/savannah/component/savannah/savannah.component';
import { OwnGameComponent } from './modules/own-game/component/own-game/own-game.component';
import { SprintComponent } from './modules/sprint/component/sprint/sprint.component';
import { NotFoundPageComponent } from '../../components/not-found-page/not-found-page.component';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MiniGamesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'speakit',
        component: SpeakitComponent,
        loadChildren: () =>
          import('./modules/speakit/speakit.module').then(
            (module) => module.SpeakitModule
          ),
      },
      {
        path: 'savannah',
        component: SavannahComponent,
        loadChildren: () =>
          import('./modules/savannah/savannah.module').then(
            (module) => module.SavannahModule
          ),
      },
      {
        path: 'audiocall',
        component: AudiocallComponent,
        loadChildren: () =>
          import('./modules/audiocall/audiocall.module').then(
            (module) => module.AudiocallModule
          ),
      },
      {
        path: 'english-puzzle',
        component: EnglishPuzzleComponent,
        loadChildren: () =>
          import('./modules/english-puzzle/english-puzzle.module').then(
            (module) => module.EnglishPuzzleModule
          ),
      },
      {
        path: 'own-game',
        component: OwnGameComponent,
        loadChildren: () =>
          import('./modules/own-game/own-game.module').then(
            (module) => module.OwnGameModule
          ),
      },
      {
        path: 'sprint',
        component: SprintComponent,
        loadChildren: () =>
          import('./modules/sprint/sprint.module').then(
            (module) => module.SprintModule
          ),
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
