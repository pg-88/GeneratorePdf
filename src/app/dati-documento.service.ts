import { Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ChiamataDBService } from './chiamata-db.service';
//import { URL } from 'url';


export interface PagDati {
  titolo?: string | string[],
  logo?: Blob | string
  altro?: string | string[] | object
}

export interface TabDati {
  head?: string [][],
  body?: string [][],
  foot?: string [][],
  columns?:  string [] | object[],
}

@Injectable({
  providedIn: 'root'
})

export class DatiDocumentoService {
  /**Recupera dati da inserire nel documento
   * 
   * Property: 
   *  datiIntestazione tipo PagDati contiene elementi da mettere
   *    in cima alla pagina.
   *  datiTabella tipo TabDati contiene intestazione tabella, righe,
   *    piede della tabella.
   *  datiPiede tipo PagDati contiene le info da mettere al piè pagina
   * 
   * Tutte le property vengono settate tramite setter dal service chiamataDb
  */
  private datiIntestazione!: PagDati;
  private datiTabella!: TabDati;
  private datiPiede!: PagDati;

  constructor() { }

  set intestazione(o: PagDati){
    for(const [key, val] of Object.entries(o)){
      console.log(key, val);
    };
  };

}