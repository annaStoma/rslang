import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { EnglishPuzzleComponent } from './englishPuzzle/englishPuzzle.component';
import { BaseComponent } from './base/base.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'englishPuzzle', component: EnglishPuzzleComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule],
  bootstrap: [BaseComponent],
})
export class AppRoutingModule {}
