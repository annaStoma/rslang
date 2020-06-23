import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoComponent } from '../../components/promo/promo.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { StatisticsComponent } from '../statistics/components/statistics/statistics.component';
import { SettingComponent } from '../setting/components/setting/setting.component';

const routes: Routes = [
  {
    path: 'promo',
    component: PromoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistic',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../statistics/statistics.module').then(
        (module) => module.StatisticsModule
      ),
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../setting/setting.module').then(
        (module) => module.SettingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
