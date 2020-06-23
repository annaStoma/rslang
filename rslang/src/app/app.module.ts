import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MainPageModule } from './modules/main-page/main-page.module';
import { MainPageRoutingModule } from './modules/main-page/main-page-routing.module';
import { MiniGamesRoutingModule } from './modules/mini-games/mini-games.routing.module';
import { MiniGamesModule } from './modules/mini-games/mini-games.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PromoComponent } from './components/promo/promo.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { TokenInterceptor } from './shared/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PromoComponent,
    AboutUsComponent,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
