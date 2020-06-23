import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromoComponent } from '../../components/promo/promo.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';

const routes: Routes = [
  {
    path: 'promo',
    component: PromoComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
