import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PopularJobsCardComponent } from './components/popular-jobs-card/popular-jobs-card.component';
import { LucideAngularModule, PenTool, Monitor, Database, MapPin } from 'lucide-angular';
import { JobCardComponent } from './components/job-card/job-card.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchComponent,
    SearchResultsComponent,
    PopularJobsCardComponent,
    JobCardComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    LucideAngularModule.pick({PenTool, Monitor, Database, MapPin}),
  ],
})
export class SearchModule {}
