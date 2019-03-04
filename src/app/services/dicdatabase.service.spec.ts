import { TestBed } from '@angular/core/testing';

import { DicdatabaseService } from './dicdatabase.service';

describe('DicdatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DicdatabaseService = TestBed.get(DicdatabaseService);
    expect(service).toBeTruthy();
  });
});
