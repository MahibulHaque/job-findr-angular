import { TestBed } from '@angular/core/testing';

import { JobDetailSearchService } from './job-detail-search.service';

describe('JobDetailSearchService', () => {
  let service: JobDetailSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobDetailSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
