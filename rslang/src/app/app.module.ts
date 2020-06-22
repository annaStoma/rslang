import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/header/authorization/authorization.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MainPageComponent } from './modules/main-page/main-page.component';
import { GameComponent } from './modules/main-page/components/game/game.component';
import { DictionariesComponent } from './modules/main-page/components/dictionaries/dictionaries.component';
import { MatButtonModule } from '@angular/material/button';
import { StatisticCardComponent } from './modules/main-page/components/statistic-card/statistic-card.component';
import { MatTableModule } from '@angular/material/table';
import { PromoComponent } from './modules/main-page/components/promo/promo.component';
import { RegisterComponent } from './components/header/register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {
  JwtInterceptor,
  ErrorInterceptor,
  fakeBackendProvider,
} from './_helpers';
import { RegisteredComponent } from './components/header/registered/registered.component';
import { AlertComponent } from './components/header/alert/alert.component';

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
    AuthorizationComponent,
    RegisterComponent,
    RegisteredComponent,
    AlertComponent,
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
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
=======

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
>>>>>>> origin/develop
  bootstrap: [AppComponent],
})
export class AppModule {}
