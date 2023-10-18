import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from '../../classes/unsubscribe.class';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterMenuToggleService } from '../../services/filter-menu-toggle.service';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent extends Unsubscribe implements OnInit {
  @Output() filterFormValueChange = new EventEmitter<any>();

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private fb: FormBuilder,
    private filterMenuToggleService: FilterMenuToggleService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.filterMenuToggleService.setSidenav(this.sidenav);
  }
  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formValue) => {
        this.filterFormValueChange.emit(formValue); // Emit form value changes
      });
  }
  filterForm = this.fb.group({
    sortBy: null, // Add your form controls here
    salaryRange: [0],
    jobType: null,
    experience: null,
    position: this.fb.group({
      remote_jobs_only: false,
    }),
  });

  getFormControl(name: string) {
    return this.filterForm.get(name) as FormControl;
  }

  resetFilterForm() {
    this.filterForm.reset();
  }
}
