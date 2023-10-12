import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import {
  Datum,
  JobSearchResponse,
} from '../shared/types/jobSearchResponse.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  childValue: string = '';
  uiDesignerJobs: Datum[];
  webDevJobs: Datum[];
  dataEngineerJobs: Datum[];

  ngOnInit(): void {
    this.searchService.searchJob('ui designer').subscribe((res) => {
      this.uiDesignerJobs = res.data;
      console.log(this.uiDesignerJobs);
    });
    this.searchService.searchJob('web developer').subscribe((res) => {
      this.webDevJobs = res.data;
      console.log(this.webDevJobs);
    });
    this.searchService.searchJob('data engineer').subscribe((res) => {
      this.dataEngineerJobs = res.data;
      console.log(this.dataEngineerJobs);
    });
  }

  onChildValueChange(newValue: string) {
    this.childValue = newValue;
    console.log(this.childValue);
  }
}
