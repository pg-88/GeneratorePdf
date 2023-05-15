import { TestBed } from '@angular/core/testing';

import { DatiDocumentoService } from './dati-documento.service';

describe('DatiDocumentoService', () => {
  let service: DatiDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatiDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
