import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CacheService } from '../../services/caching.service';
import { map, takeUntil } from 'rxjs';
import { Unsubscribe } from '../../classes/unsubscribe.class';
import { JobDetailSearchService } from 'src/app/search/services/job-detail-search.service';

export interface JobDetailInterface {
  job_title: string;
  job_description: string;
  jobApplicationLink: string;
  companyLogo: string;
  requiredExperience: number;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
}

@Component({
  selector: 'app-job-description-dialog',
  templateUrl: './job-description-dialog.component.html',
  styleUrls: ['./job-description-dialog.component.scss'],
})
export class JobDescriptionDialogComponent extends Unsubscribe {
  constructor(
    public dialog: MatDialog,
    private cachingService: CacheService,
    private searchService: JobDetailSearchService
  ) {
    super();
  }
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
      this.searchService
        .getJobDetail(this.jobId)
        .pipe(
          map((res) => {
            const data: JobDetailInterface = {
              companyLogo: res.data[0].employer_logo,
              employmentType: res.data[0].job_employment_type,
              job_title: res.data[0].job_title,
              jobApplicationLink: res.data[0].job_apply_link,
              job_description: res.data[0].job_description,
              minSalary: res.data[0].job_min_salary,
              maxSalary: res.data[0].job_max_salary,
              requiredExperience:
                res.data[0].job_required_experience
                  .required_experience_in_months,
            };
            return data;
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe({
          next: (data) => {
            this.cachingService.setItem(this.jobId, data);
            this.openDialogWithJobDetails(data);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  private openDialogWithJobDetails(jobDetails: JobDetailInterface) {
    const dialogRef = this.dialog.open(JobDescriptionDialogContent, {
      data: jobDetails,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
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
