import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../pages/home/home.component';
import { HeaderComponent } from '../partials/header/header.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { LoadingComponent } from '../partials/loading/loading.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SignUpComponent,
    LoginPageComponent
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SignUpComponent,
    LoginPageComponent
  ],
  imports: [CommonModule],
})
export class ComponentModuleModule {}
