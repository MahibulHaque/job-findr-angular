import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { SearchService } from '../../services/search-job.service';
import { CacheService } from 'src/app/shared/services/caching.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';
import { JobSearchResponseData } from 'src/app/shared/types/jobSearchResponse.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent extends Unsubscribe implements OnInit {
  constructor(
    private searchService: SearchService,
    private cacheService: CacheService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  childValue: string = '';
  uiDesignerJobs: JobSearchResponseData[];
  webDevJobs: JobSearchResponseData[];
  dataEngineerJobs: JobSearchResponseData[];
  searchedJobs: JobSearchResponseData[] = [];

  showProgressSpinner: boolean = false;
  ngOnInit(): void {
    this.loadCachedData('ui designer', 'uiDesignerJobs');
    this.loadCachedData('web developer', 'webDevJobs');
    this.loadCachedData('data engineer', 'dataEngineerJobs');
  }

  loadCachedData(searchTerm: string, cacheKey: string) {
    this.uiDesignerJobs =
      this.cacheService.getItem<JobSearchResponseData[]>(cacheKey);

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
      const searchResults =
        this.cacheService.getItem<JobSearchResponseData[]>(searchTerm);

      if (searchResults) {
        this.searchedJobs = searchResults;
      } else {
        this.showProgressSpinner = true;
        this.searchService
          .searchJob(searchTerm)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (res) => {
              if (res.data && res.data.length > 0) {
                this.cacheService.setItem(searchTerm, res.data);
                this.searchedJobs = res.data;
              }
              this.showProgressSpinner = false;
            },
            error: (err) => {
              this.showProgressSpinner = false;
              this.showSnackbarError(err.error.message);
            },
          });
      }
    }
  }

  onChildValueChange(newValue: string) {
    this.childValue = newValue;
    this.searchJobs(newValue);
  }

  showSnackbarError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'end', // Position at the right
      verticalPosition: 'bottom', // Position at the bottom
    });
  }
}
