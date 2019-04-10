import { TestBed } from '@angular/core/testing';

import { LtComponentsService } from './lt-components.service';

describe('LtComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LtComponentsService = TestBed.get(LtComponentsService);
    expect(service).toBeTruthy();
  });
});
