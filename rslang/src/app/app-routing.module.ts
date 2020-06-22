import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { MainPageComponent } from './modules/main-page/main-page.component';
import { AuthorizationComponent } from './components/header/authorization/authorization.component';
import { RegisterComponent } from './components/header/register/register.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: '', component: AuthorizationComponent, canActivate: [AuthGuard] },
  { path: '', component: RegisterComponent },
];
=======

const routes: Routes = [];
>>>>>>> origin/develop

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
