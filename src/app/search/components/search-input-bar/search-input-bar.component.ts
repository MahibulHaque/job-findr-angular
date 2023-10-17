import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
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
  constructor() {
    super();
  }
  @ViewChild('queryInput') queryInput: ElementRef;

  @Output() valueChange = new EventEmitter<string>();

  ngAfterViewInit(): void {
    const jobSearchTerm = fromEvent<any>(
      this.queryInput.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),

    );

    jobSearchTerm.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.valueChange.emit(res);
    });
  }
}
