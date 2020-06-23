import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { GameComponent } from './modules/main-page/components/game/game.component';
import { DictionariesComponent } from './modules/main-page/components/dictionaries/dictionaries.component';
import { MatButtonModule } from '@angular/material/button';
import { StatisticCardComponent } from './modules/main-page/components/statistic-card/statistic-card.component';
import { MatTableModule } from '@angular/material/table';
import { PromoComponent } from './modules/main-page/components/promo/promo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BgImageDirective } from './directives/bg-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GameComponent,
    DictionariesComponent,
    StatisticCardComponent,
    PromoComponent,
    HeaderComponent,
    FooterComponent,
    BgImageDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
