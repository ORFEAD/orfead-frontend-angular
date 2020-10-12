import { TestBed } from '@angular/core/testing';

import { DataQualificationService } from './data-qualification.service';

describe('DataQualificationService', () => {
  let service: DataQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataQualificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
