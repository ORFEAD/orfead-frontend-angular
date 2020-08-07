import { TestBed } from '@angular/core/testing';

import { AccessCheckService } from './access-check.service';

describe('AccessCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessCheckService = TestBed.get(AccessCheckService);
    expect(service).toBeTruthy();
  });
});
