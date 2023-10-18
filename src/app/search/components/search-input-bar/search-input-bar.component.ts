import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, fromEvent, map, takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-search-input-bar',
  templateUrl: './search-input-bar.component.html',
  styleUrls: ['./search-input-bar.component.scss'],
})
export class SearchInputBarComponent
  extends Unsubscribe
  implements AfterViewInit
{
  constructor(private fb: FormBuilder) {
    super();
  }

  @Output() valueChange = new EventEmitter<string>();

  searchForm = this.fb.group({
    search: [''],
  });

  ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe$))
      .subscribe((formValue) => {
        this.valueChange.emit(formValue.search);
      });

    // const jobSearchTerm = fromEvent<any>(
    //   this.queryInput.nativeElement,
    //   'keyup'
    // ).pipe(
    //   map((event) => event.target.value),
    //   debounceTime(1000)
    // );
    // jobSearchTerm.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
    //   this.valueChange.emit(res);
    // });
  }
}
