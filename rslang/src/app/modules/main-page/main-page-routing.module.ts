import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoComponent } from '../../components/promo/promo.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { StatisticsComponent } from '../statistics/components/statistics/statistics.component';
import { SettingsComponent } from '../learning-mode/components/settings/settings.component';

const routes: Routes = [
  {
    path: 'promo',
    component: PromoComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'statistic',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../statistics/statistics.module').then(
        (module) => module.StatisticsModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
