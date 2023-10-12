import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Datum } from '../types/jobSearchResponse.interface';

@Injectable()
export abstract class Unsubscribe implements OnDestroy {
  unsubscribe$ = new Subject<void>();
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
