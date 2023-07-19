import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: LoginPageComponent,
    path: 'login',
  },
  {
    component: SignUpComponent,
    path: 'sign-up',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
