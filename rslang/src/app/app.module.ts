import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { GameComponent } from './game/game.component';
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { MatButtonModule } from '@angular/material/button';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { MatTableModule } from '@angular/material/table';
import { PromoComponent } from './promo/promo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PuzzleComponent,
    GameComponent,
    DictionariesComponent,
    StatisticCardComponent,
    PromoComponent,
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
