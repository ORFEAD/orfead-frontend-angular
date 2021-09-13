import { TestBed } from '@angular/core/testing';

import { UnstructuredTopCompIntService } from './unstructured-top-comp-int.service';

describe('UnstructuredTopCompIntService', () => {
  let service: UnstructuredTopCompIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnstructuredTopCompIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
