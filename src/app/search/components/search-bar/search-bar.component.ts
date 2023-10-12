import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements AfterViewInit {
  @ViewChild('queryInput') queryInput: ElementRef;

  @Output() valueChange = new EventEmitter<string>();

  constructor(private loadingBar: LoadingBarService) {}

  ngAfterViewInit(): void {
    const jobSearchTerm = fromEvent<any>(
      this.queryInput.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(1000)
    );

    jobSearchTerm.subscribe((res) => {
      this.valueChange.emit(res);
    });
  }
}
