import { Injectable } from '@angular/core';

export interface Contenuti {
  intestazione: {[key:string]: string[] | string},
  piepagina: {[key:string]: string[] | string},
  contenuto: {[key:string]: string[] | string }[],
  header: {[key:string]: string[] | string },
}
/*-------------------------------------------------------------------------------
 *  Contenuti è pensato per ricalcare gli attributi da passare a 'autoTable'
 *  vedi documentazione https://github.com/simonbengtsson/jsPDF-AutoTable#usage
 *  In particolare con la sintassi:
 *  
 * autoTable(doc, {
      columnStyles: { europe: { halign: 'center' } }, // European countries centered
      body: [
        { europe: 'Sweden', america: 'Canada', asia: 'China' },
        { europe: 'Norway', america: 'Mexico', asia: 'Japan' },
      ],
      columns: [
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Asia', dataKey: 'asia' },
      ],
    })
 *  Quindi utilizzo gli attributi body e column per passare i dati e da columnStyles
 *  posso richiamare il nome delle colonne per assegnare lo stile.*/


@Injectable({
  providedIn: 'root'
})

export class DatiDocumentoService {
  /**Recupera dati da inserire nel documento*/
  constructor() { }

  getDati(): Contenuti {
    //richiesta al DB

    //elaborazione risposta
    
    const test: Contenuti = {
      intestazione: {col1: 'Colonna 1', col2: 'Colonna 2', col3: 'Colonna 3'},
      piepagina: {indirizzo: 'Azienda Pippo, Via Pluto, 42', totale: 'TOT: 1000'},
      contenuto: [
        {col1: 'col1-riga1', col2: 'col2-riga1', col3: 'col3-riga1'},
        {col1: 'col1-riga2', col2: 'col2-riga2', col3: 'col3-riga2'},
      ],
      header:{col1: 'Colonna 1', col2: 'Colonna 2', col3: 'Colonna 3'},
    }

    return test;
  }


}
