import { Component, OnInit } from '@angular/core';
import { JobsDataSource } from '../../services/job.dataSource';
import { FetchJobsService } from '../../services/fetch-jobs.service';
import { PageEvent } from '@angular/material/paginator';
import { CacheService } from 'src/app/shared/services/caching.service';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  constructor(
    private fetchJobsService: FetchJobsService,
    private cacheService: CacheService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.dataSource.loadJobs();
  }

  displayedColumns: string[] = [
    'Employer Name',
    'job title',
    'Job Location',
    'Rating',
    'Details',
  ];
  dataSource = new JobsDataSource(this.fetchJobsService, this.cacheService);

  onPageChange(event: PageEvent) {
    // Calculate the actual page number based on API constraints
    const actualPage = Math.min(event.pageIndex + 1, 10);
    this.dataSource.page = actualPage;
    this.dataSource.loadJobs();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  nameFilter: string = '';
}
