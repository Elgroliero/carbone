import { TestBed } from '@angular/core/testing';

import { TravelRepoService } from './travel-repo.service';

describe('TravelRepoService', () => {
  let service: TravelRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
