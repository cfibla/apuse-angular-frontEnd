import { TestBed } from '@angular/core/testing';

import { CerquesService } from './cerques.service';

describe('CerquesService', () => {
  let service: CerquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CerquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
