import { TestBed } from '@angular/core/testing';

import { BlockLoggedUserGuard } from './block-logged-user.guard';

describe('BlockLoggedUserGuard', () => {
  let guard: BlockLoggedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockLoggedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
