import { TestBed } from '@angular/core/testing';

import { YoohooService } from './yoohoo.service';

describe('YoohooService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoohooService = TestBed.get(YoohooService);
    expect(service).toBeTruthy();
  });
});
