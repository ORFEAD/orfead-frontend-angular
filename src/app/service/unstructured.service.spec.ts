import { TestBed } from '@angular/core/testing';

import { UnstructuredService } from './unstructured.service';

describe('UnstructuredService', () => {
  let service: UnstructuredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnstructuredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
