import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent implements OnInit {
  @Input() logoLink: string;
  @Input() jobTitle: string;
  @Input() jobLocation: string;
  @Input() jobType: string;
  @Input() jobDescription: string;
  @Input() jobId: string;
  @Input() jobPostedTimeStamp: number;
  jobPosted: string;
  constructor(private datePipe: DatePipe) {}
  formatTimestamp(timestamp: number): string {
    const currentDate = new Date();
    const postedDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds

    const timeDifference = currentDate.getTime() - postedDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else {
      return 'posted ' + daysDifference + ' Days Ago';
    }
  }
  ngOnInit(): void {
    
  }
}
