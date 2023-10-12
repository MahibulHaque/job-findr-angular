import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-jobs-card',
  templateUrl: './popular-jobs-card.component.html',
  styleUrls: ['./popular-jobs-card.component.css'],
})
export class PopularJobsCardComponent implements OnInit {
  constructor() {}

  @Input() iconName: string;
  @Input() jobType: string;
  @Input() minSalary: number;
  @Input() maxSalary: number;
  @Input() rating: number;
  @Input() iconBg: string;

  ngOnInit(): void {}
}
