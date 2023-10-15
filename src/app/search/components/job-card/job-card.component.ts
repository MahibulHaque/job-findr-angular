import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {
  @Input() jobType: string = '';
  @Input() minSalary: number = 0;
  @Input() maxSalary: number = 0;
  @Input() peopleApplied: number = 0;
  @Input() rating: number;
  @Input() iconName: string;
  @Input() iconContainerBg: string = 'red';
  constructor() {}

  ngOnInit(): void {}
}
