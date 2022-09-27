import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PointCloudComponent } from './components/point-cloud/point-cloud.component';
import { PointCloudDirective } from './directives/point-cloud/point-cloud.directive';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './util/error/error.component';
import { IconsModule } from './icons/icons.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CountryPipe } from './util/pipes/country/country.pipe';
import { PointCloudViewerComponent } from './components/point-cloud/point-cloud-viewer/point-cloud-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PointCloudComponent,
    PointCloudDirective,
    SignupComponent,
    ErrorComponent,
    ProductCardComponent,
    ProductFormComponent,
    CountryPipe,
    PointCloudViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
