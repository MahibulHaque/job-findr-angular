import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchBarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule
  ]
})
export class SearchModule { }
