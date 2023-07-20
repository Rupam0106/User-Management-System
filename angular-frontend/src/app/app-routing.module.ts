import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
  },
  {
    component: LoginPageComponent,
    path: '',
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
