import { TestBed } from '@angular/core/testing';

import { FetchJobsService } from './fetch-jobs.service';

describe('FetchJobsService', () => {
  let service: FetchJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
