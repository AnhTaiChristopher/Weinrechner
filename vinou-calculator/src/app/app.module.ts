import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { Calculation3Component } from './tab_3/calculation3/calculation3.component';
import { Calculation1Component } from './tab_1/calculation1/calculation1.component';
import { Calculation2Component } from './tab_2/calculation2/calculation2.component';
import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Calculation3Component,
    Calculation1Component,
    Calculation2Component,
    HomeComponent,
    HomeContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxHideOnScrollModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
