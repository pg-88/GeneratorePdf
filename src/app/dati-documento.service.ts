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
  /**Digerisce i dati arrivati dal DB per poterli inserire nel documento.
   * 
   * Property: 
   *  datiIntestazione tipo PagDati contiene elementi da mettere
   *    in cima alla pagina.
   *  datiTabella tipo TabDati contiene intestazione tabella, righe,
   *    piede della tabella.
   *  datiPiede tipo PagDati contiene le info da mettere al piè pagina
   * 
   * Tutte le property vengono settate tramite setter dal service chiamataDb
   * -----------------------------------------------------------------------*/
  private datiIntestazione!: PagDati;
  private datiTabella!: TabDati;
  private datiPiede!: PagDati;

  constructor() { }

  //setter intestazione documento
  set intestazione(o: object){
    //prende oggetto in arrivo dal DB estrapola e assegna i dati
    //da mettere in intestazione
    let testaDoc: PagDati = {};

    for(const [key, val] of Object.entries(o)){
      //quando trovo qualcosa lo metto in testaDoc
      console.log(key, val);
    };

    this.datiIntestazione = testaDoc;

    //##########TEST#######################
    this.datiIntestazione = {
      titolo: 'Pippo DDT 420',
      logo: 'https://ih1.redbubble.net/image.424611934.8062/st,small,507x507-pad,600x600,f8f8f8.jpg',
      altro: 'documento di trasporto'
    }
  };

  //getter intestazione documento
  get intestazione(){
    if(Object.values(this.datiIntestazione).length == 0) console.warn("non c'è intestazione");
    return this.datiIntestazione;
  }

  //setter dati tabella
  set tabella(o: object){
    //prende oggetto in arrivo dal DB estrapola e assegna i dati
    //da mettere in tabella
    let tab: TabDati = {};

    for(const [key, val] of Object.entries(o)){
      //quando trovo qualcosa lo metto in tab
      console.log(key, val);
    };

    this.datiTabella = tab;
  }

  //getter dati tabella
  get tabella(){
    if(Object.values(this.datiTabella).length == 0) console.warn(
      "non ci sono dati per la tabella"
      );
    return this.datiTabella;
  };

  //setter piè pag
  set piepagina(o: object){
    //prende oggetto in arrivo dal DB estrapola e assegna i dati
    //da mettere in calce alla pagina
    let pie: PagDati = {};
    for(const [key, val] of Object.entries(o)){
      //quando trovo qualcosa lo metto in tab
      console.log(key, val);
    };

    this.datiPiede = pie;
  }

  //getter piè pag
  get piepagina(){
    if(Object.values(this.datiPiede).length == 0) console.warn(
      "non ci sono dati per il piè pagina"
      );
    return this.datiPiede;
  }

}