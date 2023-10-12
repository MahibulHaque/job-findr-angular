import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import { Datum } from '../shared/types/jobSearchResponse.interface';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Unsubscribe } from '../shared/class/unsubscribe.class';
import { CacheService } from '../shared/services/caching.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent extends Unsubscribe implements OnInit {


  // TODO: Add Filter Mechanics


  constructor(
    private searchService: SearchService,
    private cacheService: CacheService
  ) {
    super();
  }

  childValue: string = '';
  uiDesignerJobs: Datum[];
  webDevJobs: Datum[];
  dataEngineerJobs: Datum[];
  searchedJobs = [];

  ngOnInit(): void {
    this.loadCachedData('ui designer', 'uiDesignerJobs');
    this.loadCachedData('web developer', 'webDevJobs');
    this.loadCachedData('data engineer', 'dataEngineerJobs');
  }

  loadCachedData(searchTerm: string, cacheKey: string) {
    this.uiDesignerJobs = this.cacheService.getItem<Datum[]>(cacheKey);

    if (!this.uiDesignerJobs) {
      this.fetchDataAndCache(searchTerm, cacheKey);
    }
  }

  fetchDataAndCache(searchTerm: string, cacheKey: string) {
    this.searchService
      .searchJob(searchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.data && res.data.length > 0) {
          this.cacheService.setItem(cacheKey, res.data);
          this[cacheKey] = res.data;
        }
      });
  }

  searchJobs(searchTerm: string) {
    if (searchTerm) {
      const searchResults = this.cacheService.getItem<Datum[]>(searchTerm);

      if (searchResults) {
        this.searchedJobs = searchResults;
      } else {
        this.searchService
          .searchJob(searchTerm)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            if (res.data && res.data.length > 0) {
              this.cacheService.setItem(searchTerm, res.data);
              this.searchedJobs = res.data;
            }
          });
      }
    }
  }

  onChildValueChange(newValue: string) {
    this.childValue = newValue;
    this.searchJobs(newValue);
  }
}
