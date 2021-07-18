import { TestBed } from '@angular/core/testing';

import { CarregaImatgeService } from './carrega-imatge.service';

describe('CarregaImatgeService', () => {
  let service: CarregaImatgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarregaImatgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
