import { Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ChiamataDBService, template } from './chiamata-db.service';
import { GeometriaService, coord } from './geometria.service';


@Injectable({
  providedIn: 'root'
})

export class DatiDocumentoService {
  /** */

  private paginaConfig!: any;
  private arrayDati!: any;

  constructor() { }

  set inputDati(observedData: template){
    for(const [key, val] of Object.entries(observedData)){
      if(key == 'PAGE_FORMAT') console.log(val);
    }
  }

}
