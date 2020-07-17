import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './modules/main-page/components/main-page/main-page.component';
import { LoginComponent } from './modules/main-page/components/login/login.component';
import { RegisterComponent } from './modules/main-page/components/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'register', component: RegisterComponent, data: { title: 'Registration'} },
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
