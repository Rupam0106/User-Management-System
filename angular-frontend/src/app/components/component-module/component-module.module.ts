import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../partials/header/header.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { LoadingComponent } from '../partials/loading/loading.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SignUpComponent,
    LoginPageComponent,
  ],
  exports: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SignUpComponent,
    LoginPageComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
})
export class ComponentModuleModule {}
