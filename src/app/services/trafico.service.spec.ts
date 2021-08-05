import { TestBed } from '@angular/core/testing';

import { TraficoService } from './trafico.service';

describe('TraficoService', () => {
  let service: TraficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
