import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { EnglishPuzzleComponent } from './englishPuzzle/englishPuzzle.component';
import { BaseComponent } from './base/base.component';
import { BrowserModule } from '@angular/platform-browser';


import { MainPageComponent } from './modules/main-page/components/main-page/main-page.component';
import { LoginComponent } from './modules/main-page/components/login/login.component';
import { RegisterComponent } from './modules/main-page/components/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'englishPuzzle', component: EnglishPuzzleComponent },
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule],
  bootstrap: [BaseComponent],
})
export class AppRoutingModule {}
