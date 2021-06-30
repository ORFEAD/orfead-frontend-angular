import { TestBed } from '@angular/core/testing';

import { ExportCompIntServiceService } from './export-comp-int-service.service';

describe('ExportCompIntServiceService', () => {
  let service: ExportCompIntServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportCompIntServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
