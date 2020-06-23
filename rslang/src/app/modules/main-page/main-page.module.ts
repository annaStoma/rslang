import { NgModule } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardGameComponent } from './components/card-game/card-game.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    CardGameComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class MainPageModule {}
