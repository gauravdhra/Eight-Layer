import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseDataService } from './enterprise-data.service';

describe('EnterpriseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseDataService]
    });
  });

  it('should be created', inject([EnterpriseDataService], (service: EnterpriseDataService) => {
    expect(service).toBeTruthy();
  }));
});
