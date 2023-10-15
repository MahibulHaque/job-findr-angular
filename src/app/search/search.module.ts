import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { MatCardModule } from '@angular/material/card';
import {
  LucideAngularModule,
  PenTool,
  Monitor,
  Database,
  MapPin,
  SearchCode,
  Star
} from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SearchPageComponent, JobCardComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatCardModule,
    MatIconModule,
    LucideAngularModule.pick({
      PenTool,
      Monitor,
      Database,
      MapPin,
      SearchCode,
      Star
    }),
  ],
})
export class SearchModule {}
