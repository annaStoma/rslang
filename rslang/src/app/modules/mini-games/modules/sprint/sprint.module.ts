import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintComponent } from './component/sprint/sprint.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WordCardComponent } from './component/word-card/word-card.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SprintComponent,
    WordCardComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
})
export class SprintModule {}
