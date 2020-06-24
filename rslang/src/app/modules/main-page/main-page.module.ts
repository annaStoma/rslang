import { NgModule } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardGameComponent } from './components/card-game/card-game.component';
import { BgImageDirective } from '../../components/directives/bg-image.directive';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { PromoComponent } from './components/promo/promo.component';
import { DictionariesComponent } from './components/dictionaries/dictionaries.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    CardGameComponent,
    BgImageDirective,
    StatisticCardComponent,
    PromoComponent,
    DictionariesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
  ],
})
export class MainPageModule {}
