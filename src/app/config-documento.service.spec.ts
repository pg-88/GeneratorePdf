import { TestBed } from '@angular/core/testing';

import { ConfigDocumentoService } from './config-documento.service';

describe('ConfigDocumentoService', () => {
  let service: ConfigDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
