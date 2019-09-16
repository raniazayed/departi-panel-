import { TestBed } from '@angular/core/testing';

import { EnvironmentalUrlService } from './environmental-url.service';

describe('EnvironmentalUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentalUrlService = TestBed.get(EnvironmentalUrlService);
    expect(service).toBeTruthy();
  });
});
