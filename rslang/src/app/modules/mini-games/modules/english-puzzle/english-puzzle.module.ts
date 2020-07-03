import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPuzzleComponent } from './component/english-puzzle/english-puzzle.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [EnglishPuzzleComponent],
  imports: [CommonModule, DragDropModule],
})
export class EnglishPuzzleModule {}
