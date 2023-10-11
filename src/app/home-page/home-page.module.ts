import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';


@NgModule({
  declarations: [
    HomePageComponent,
    HeroSectionComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
