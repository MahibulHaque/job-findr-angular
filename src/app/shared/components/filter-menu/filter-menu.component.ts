import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent extends Unsubscribe implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }
  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formValue) => {
        console.log('Form value changed:', formValue);
      });
  }
  filterForm = this.fb.group({
    sortBy: '1', // Add your form controls here
    salaryRange: [null /* Add your validators here */],
    jobType: this.fb.group({
      fullTime: false,
      partTime: false,
      internship: false,
      contractual: false,
    }),
    experience: this.fb.group({
      freshGraduate: false,
      beginner: false,
      intermediate: false,
      expert: false,
    }),
    position: this.fb.group({
      onSite: false,
      remote: false,
    }),
  });

  getFormControl(name: string) {
    return this.filterForm.get(name) as FormControl;
  }
}
