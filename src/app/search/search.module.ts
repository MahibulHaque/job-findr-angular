import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PopularJobsCardComponent } from './components/popular-jobs-card/popular-jobs-card.component';
import { LucideAngularModule, PenTool, Monitor, Database } from 'lucide-angular';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchComponent,
    SearchResultsComponent,
    PopularJobsCardComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    LoadingBarModule,
    LucideAngularModule.pick({PenTool, Monitor, Database}),
  ],
})
export class SearchModule {}
