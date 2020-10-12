import { TestBed } from '@angular/core/testing';

import { DataCheckService } from './data-check.service';

describe('DataCheckService', () => {
  let service: DataCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
