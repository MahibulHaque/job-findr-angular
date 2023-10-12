import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
=======
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> feat-search

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
<<<<<<< HEAD
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
=======
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
>>>>>>> feat-search
  bootstrap: [AppComponent],
})
export class AppModule {}
