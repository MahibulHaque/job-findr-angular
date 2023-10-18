import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JobSearchResponseData } from 'src/app/shared/types/jobSearchResponse.interface';
import { FetchJobsService } from './fetch-jobs.service';
import { CacheService } from 'src/app/shared/services/caching.service';

@Injectable()
export class JobsDataSource extends DataSource<JobSearchResponseData> {
  jobs$ = new BehaviorSubject<JobSearchResponseData[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  page: number = 1;
  pageSize: number = 1; // Initial page size
  totalCount: number = 0;
  constructor(
    private fetchJobsService: FetchJobsService,
    private cacheService: CacheService
  ) {
    super();
  }

  connect(): Observable<JobSearchResponseData[]> {
    return this.jobs$.asObservable();
  }

  disconnect(): void {
    this.jobs$.complete();
  }

  // loadJobs(): void {
  //   this.isLoading$.next(true);
  //   this.fetchJobsService
  //     .fetchJobs('Software Engineer', this.page)
  //     .subscribe((res) => {
  //       this.jobs$.next(res.data);
  //       this.isLoading$.next(false);
  //       this.totalCount = res.data.length;
  //     });
  // }
  

  loadJobs(): void {
    // Check if data is available in the cache
    const cachedData =
      this.cacheService.getItem<JobSearchResponseData[]>(`cachedJobsData-${this.page}`);
    if (cachedData) {
      this.jobs$.next(cachedData);
      this.isLoading$.next(false);
      this.totalCount = cachedData.length;
      return;
    }

    this.isLoading$.next(true);
    this.fetchJobsService.fetchJobs('Software Engineer', this.page).subscribe((res) => {
      this.jobs$.next(res.data);
      this.cacheService.setItem(`cachedJobsData-${this.page}`, res.data);
      this.isLoading$.next(false);
      this.totalCount = res.data.length;
    });
  }
}
