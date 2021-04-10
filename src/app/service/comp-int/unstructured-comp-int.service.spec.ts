import { TestBed } from '@angular/core/testing';

import { UnstructuredCompIntService } from './unstructured-comp-int.service';

describe('UnstructuredCompIntService', () => {
  let service: UnstructuredCompIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnstructuredCompIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
