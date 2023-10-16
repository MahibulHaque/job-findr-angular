import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CacheService } from '../../services/caching.service';
import {
  JobDetailSearchService,
  SearchService,
} from 'src/app/search/services/search-job.service';

export interface JobDetailInterface {
  job_title: string;
  job_description: string;
  companyLogo: string;
  requiredExperience: string;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
}

@Component({
  selector: 'app-job-description-dialog',
  templateUrl: './job-description-dialog.component.html',
  styleUrls: ['./job-description-dialog.component.scss'],
})
export class JobDescriptionDialogComponent {
  constructor(
    public dialog: MatDialog,
    private cachingService: CacheService,
    private searchService: JobDetailSearchService
  ) {}
  @Input() jobId: string = '';

  jobTitle: string = '';
  jobDesc: string = '';
  logo: string = '';
  jobEmploymentType: string = '';
  jobApplicationLink: string = '';
  jobPostedAt: string = '';
  jobExperience: string = '';
  requiredSkill: string[] = [];
  minSalary: number = 90;
  maxSalary: number = 110;
  openDialog() {
    // Check if the data is already in the cache
    const cachedData: JobDetailInterface = this.cachingService.getItem(
      this.jobId
    );

    if (cachedData) {
      this.openDialogWithJobDetails(cachedData);
    } else {
      // Fetch data from the API if it's not in the cache
      this.searchService.getJobDetail(this.jobId).subscribe(
        (res) => {
          // Cache the data
          this.cachingService.setItem(this.jobId, res.data);

          // Open the dialog with the fetched jobDetails
          this.openDialogWithJobDetails(res.data);
        },
        (error) => {
          console.error('Error fetching job details:', error);
        }
      );
    }
  }

  private openDialogWithJobDetails(jobDetails: JobDetailInterface) {
    const dialogRef = this.dialog.open(JobDescriptionDialogContent, {
      data: jobDetails,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'job-description-dialog-content',
  templateUrl: './job-description-dialog-content.component.html',
  styleUrls: ['./job-description-dialog.component.scss'],
})
export class JobDescriptionDialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: JobDetailInterface) {}
}
