import { TestBed } from '@angular/core/testing';

import { AuthUrlService } from './auth-url.service';

describe('AuthUrlService', () => {
  let service: AuthUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
