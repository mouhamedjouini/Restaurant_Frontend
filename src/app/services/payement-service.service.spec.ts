import { TestBed } from '@angular/core/testing';

import { PayementServiceService } from './payement-service.service';

describe('PayementServiceService', () => {
  let service: PayementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
