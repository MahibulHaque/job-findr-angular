import { TestBed } from '@angular/core/testing';

import { FilterMenuToggleService } from './filter-menu-toggle.service';

describe('FilterMenuToggleService', () => {
  let service: FilterMenuToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterMenuToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
