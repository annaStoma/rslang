import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoComponent } from '../../components/promo/promo.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { StatisticsComponent } from '../statistics/components/statistics/statistics.component';
import { SettingsComponent } from '../learning-mode/components/settings/settings.component';
import { VocabularyComponent } from '../../components/vocabulary/vocabulary.component';
import { LearningModeComponent } from '../learning-mode/learning-mode.component';

const routes: Routes = [
  {
    path: 'promo',
    component: PromoComponent,
    data: { title: 'Promo'}
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { title: 'About Us'}
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../statistics/statistics.module').then(
        (module) => module.StatisticsModule
      ),
    data: { title: 'Statistics'}
  },
  {
    path: 'setting',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../learning-mode/components/settings/setting.module').then(
        (module) => module.SettingsModule
      ),
     data: { title: 'Setting'}
  },
  {
    path: 'vocabulary',
    component: VocabularyComponent,
    canActivate: [AuthGuard],
    data: { title: 'Vocabulary'}
  },
  {
    path: 'learning',
    component: LearningModeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Learning'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
