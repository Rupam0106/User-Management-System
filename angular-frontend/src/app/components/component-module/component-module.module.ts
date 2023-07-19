import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../pages/home/home.component';
import { HeaderComponent } from '../partials/header/header.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { LoadingComponent } from '../partials/loading/loading.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SignUpComponent,
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SignUpComponent,
  ],
  imports: [CommonModule],
})
export class ComponentModuleModule {}
