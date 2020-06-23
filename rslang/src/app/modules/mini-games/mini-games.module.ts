import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniGamesComponent } from './mini-games.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MiniGamesComponent],
  imports: [CommonModule, RouterModule],
})
export class MiniGamesModule {}
