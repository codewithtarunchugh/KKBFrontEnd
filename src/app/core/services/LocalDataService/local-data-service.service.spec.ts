import { TestBed } from '@angular/core/testing';

import { LocalDataServiceService } from './local-data-service.service';

describe('LocalDataServiceService', () => {
  let service: LocalDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
