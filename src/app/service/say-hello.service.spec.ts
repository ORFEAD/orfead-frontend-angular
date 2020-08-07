import { TestBed } from '@angular/core/testing';

import { SayHelloService } from './say-hello.service';

describe('SayHelloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SayHelloService = TestBed.get(SayHelloService);
    expect(service).toBeTruthy();
  });
});
