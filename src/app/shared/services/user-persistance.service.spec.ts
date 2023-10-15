import { TestBed } from '@angular/core/testing';

import { UserPersistanceService } from './user-persistance.service';

describe('UserPersistanceService', () => {
  let service: UserPersistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPersistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
