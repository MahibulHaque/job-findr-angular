import { Component, OnInit } from '@angular/core';
import { debounceTime, map, takeUntil } from 'rxjs';
import { SearchService } from '../../services/search-job.service';
import { CacheService } from 'src/app/shared/services/caching.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';
import { JobSearchResponseData } from 'src/app/shared/types/jobSearchResponse.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterMenuToggleService } from 'src/app/shared/services/filter-menu-toggle.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent extends Unsubscribe implements OnInit {
  constructor(
    private searchService: SearchService,
    private cacheService: CacheService,
    private filterMenuToggleService: FilterMenuToggleService,
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
  experience: string;
  employment_types: string;
  remote_jobs_only: boolean = false;
  onFilterFormValueChange(formValue: any) {
    console.log('Form value changed in parent component:', formValue);

    // Check if experience filter has changed
    if (formValue.experience !== this.experience) {
      this.experience = formValue.experience;
      this.searchJobsWithFilters(
        this.childValue,
        this.employment_types,
        this.experience,
        this.remote_jobs_only
      );
    }

    // Check if jobType filter has changed
    if (formValue.jobType !== this.employment_types) {
      this.employment_types = formValue.jobType;
      this.searchJobsWithFilters(
        this.childValue,
        this.employment_types,
        this.experience,
        this.remote_jobs_only
      );
    }

    // Check if remote_jobs_only filter has changed
    if (formValue.position.remote_jobs_only !== this.remote_jobs_only) {
      this.remote_jobs_only = formValue.position.remote_jobs_only;
      this.searchJobsWithFilters(
        this.childValue,
        this.employment_types,
        this.experience,
        this.remote_jobs_only
      );
    }
  }

  searchJobsWithFilters(
    searchTerm: string,
    employment_types?: string,
    experience?: string,
    remote_jobs_only?: boolean
  ) {
    if (searchTerm) {
      const searchResults = this.cacheService.getItem<JobSearchResponseData[]>(
        `${searchTerm}+${employment_types}+${experience}+${remote_jobs_only}`
      );

      if (searchResults) {
        this.searchedJobs = searchResults;
      } else {
        this.showProgressSpinner = true;
        this.searchService
          .searchJob(searchTerm, employment_types, experience, remote_jobs_only)
          .pipe(debounceTime(1000), takeUntil(this.unsubscribe$))
          .subscribe({
            next: (res) => {
              if (res.data && res.data.length > 0) {
                this.cacheService.setItem(
                  `${searchTerm}+${employment_types}+${experience}+${remote_jobs_only}`,
                  res.data
                );
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
    this.searchJobsWithFilters(
      this.childValue,
      this.employment_types,
      this.experience,
      this.remote_jobs_only
    );
  }

  showSnackbarError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'end', // Position at the right
      verticalPosition: 'bottom', // Position at the bottom
    });
  }

  toggleSidenav() {
    this.filterMenuToggleService.toggle();
  }
}
