import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { EnglishPuzzleComponent } from './englishPuzzle/englishPuzzle.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'englishPuzzle', component: EnglishPuzzleComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
