import { TestBed } from '@angular/core/testing';

import { RedirectToGuard } from './redirect-to.guard';

describe('RedirectToGuard', () => {
  let guard: RedirectToGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectToGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
