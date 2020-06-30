import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MainPageModule } from './modules/main-page/main-page.module';
import { MainPageRoutingModule } from './modules/main-page/main-page-routing.module';
import { MiniGamesRoutingModule } from './modules/mini-games/mini-games.routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PromoComponent } from './components/promo/promo.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { MiniGamesModule } from './modules/mini-games/mini-games.module';
import { LearningModeComponent } from './modules/learning-mode/learning-mode.component';
import { WordCardComponent } from './components/word-card/word-card.component';
import { LearningModeModule } from './modules/learning-mode/learning-mode.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PromoComponent,
    AboutUsComponent,
    LearningModeComponent,
    WordCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainPageModule,
    MainPageRoutingModule,
    MiniGamesRoutingModule,
    MiniGamesModule,
    HttpClientModule,
    LearningModeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
