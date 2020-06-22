import { NgModule } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardGameComponent } from './components/card-game/card-game.component';
import { RouterModule } from '@angular/router';
import { MiniGamesModule } from '../mini-games/mini-games.module';

@NgModule({
  declarations: [
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    CardGameComponent,
  ],
  imports: [
    CommonModule,
    MiniGamesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class MainPageModule {}
