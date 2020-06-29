import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LearningModeComponent } from './modules/learning-mode/learning-mode.component';
import { LearningModeModule } from './modules/learning-mode/learning-mode.module';
import { MainPageModule } from './modules/main-page/main-page.module';
import { MainPageRoutingModule } from './modules/main-page/main-page-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MiniGamesModule } from './modules/mini-games/mini-games.module';
import { MiniGamesRoutingModule } from './modules/mini-games/mini-games.routing.module';
import { NgModule } from '@angular/core';
import { PromoComponent } from './components/promo/promo.component';
import { SavannahService } from './modules/mini-games/modules/savannah/component/savannah/savannah.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { WordCardComponent } from './components/word-card/word-card.component';

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
    SavannahService
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
