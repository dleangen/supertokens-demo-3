import { TestBed } from '@angular/core/testing';

import { RedirectToSigninGuard } from './redirect-to-signin.guard';

describe('RedirectToSigninGuard', () => {
  let guard: RedirectToSigninGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectToSigninGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
