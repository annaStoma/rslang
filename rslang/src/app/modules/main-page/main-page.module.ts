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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardGameComponent } from './components/card-game/card-game.component';
import { BgImageDirective } from '../../components/directives/bg-image.directive';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { PromoComponent } from './components/promo/promo.component';
import { DictionariesComponent } from './components/dictionaries/dictionaries.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../shared/interceptors/token.interceptor';


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
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
  ],
    providers: [
    {
      provide: [HTTP_INTERCEPTORS],
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
})
export class MainPageModule {}
