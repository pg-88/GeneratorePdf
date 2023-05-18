import { Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
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
  /**Recupera dati da inserire nel documento*/
  constructor() { }

  get testaPag(): PagDati{
    //elaborazione dati ricevuti

    
    //oggetto contenente i dati dell'intestazione del doc
    const test: PagDati = {
          titolo: "Hello",
          logo: 'https://ih1.redbubble.net/image.424611934.8062/st,small,507x507-pad,600x600,f8f8f8.jpg'
        }
    return test;
  }

  get piePag(): PagDati{
    /**Contenuti per il piepagina */

    //elaborazione dati ricevuti

    //oggetto contenete dati per il piè pagina
    const footer: PagDati = {
      titolo: "Pagina Finita",
      altro: ["telefono 212 555 554", "indirizzo Evergreen Terrace, 123", "P.IVA 123456789"]
    }
    return footer;
  }

  get datiTabella(): TabDati{
    /**dati per inserimento in tabella */

    //elaborazione dati ricevuti

    //----------------------------------------------------------------|
    //                       Test Area                                |
    //                                                                |
    // let tabella = Object.values(this.testTab);
    // //console.log(tabella);
    // //oggetto che contiene righe colonne e header tabella 
    // const tab: TabDati = {
    //   head: tabella[0],
    //   body: tabella[1],
    //   foot: tabella[2],
    // }
    //console.log(tab);
    //                                                                |
    //----------------------------------------------------------------|
    const tab = this.testTab
    return tab;
  }

  private get testTab(): object {
    //solo per testare funzionalità di generaDocumentoService
    const righe: number = 6;
    const colonne: number = 3;

    let h: string[] = [];
    let f: string[] = [];
    for(let i = 0; i < colonne; i++){
      h.push(`Header Colonna ${i+1}`);
      i == (colonne-1) ? f.push(`Footer Colonna ${i+1}`) : f.push('--');
    }

    let b: string[][] = []; 
    for(let i = 0; i < righe; i++){
      let riga = [];
      for(let j = 0; j < colonne; j++){
        riga.push(`cella riga_${i+1}, colonna_${j+1}`);
      }
      b.push(riga);
    }

    return {
      head: [h],
      body: b,
      foot: [f],
    };
  }

}