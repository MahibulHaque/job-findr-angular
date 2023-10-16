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
import { SearchInputBarComponent } from './components/search-input-bar/search-input-bar.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SearchPageComponent, JobCardComponent, SearchInputBarComponent],
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
  ],
})
export class SearchModule {}
