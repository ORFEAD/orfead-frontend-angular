import { TestBed } from '@angular/core/testing';

import { DatasetUnstructuredConfService } from './dataset-unstructured-conf.service';

describe('DatasetUnstructuredConfService', () => {
  let service: DatasetUnstructuredConfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetUnstructuredConfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
