import { TestBed } from '@angular/core/testing';

import { AlumneService } from './alumne.service';

describe('AlumneService', () => {
  let service: AlumneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
