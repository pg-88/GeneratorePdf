import { Injectable } from '@angular/core';
//import { URL } from 'url';


export interface Contenuti {
  pagina: {
    intestazione: {
      titolo: string,
      logo?: Blob | string,
    },
    piepagina?: string,
  }
  tab:{
    header: {[key:string]: string[] | string },
    contenuto: {[key:string]: string[] | string }[],
  }
}

export interface PagDati {
  titolo?: string | string[],
  logo?: Blob | string
}

export interface tabDati {
  body: {[key:string]: string[] | string }[],
  //TO DO Completa interfaccia tabDati
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

  get pagDati(): Contenuti {
    //richiesta al DB

    //elaborazione risposta
    const test: Contenuti = {
      pagina: {
        intestazione: {
          titolo: "Hello",
          logo: 'https://ih1.redbubble.net/image.424611934.8062/st,small,507x507-pad,600x600,f8f8f8.jpg'
        }
      },
      tab: {
        contenuto: [
          {col1: 'col1-riga1', col2: 'col2-riga1', col3: 'col3-riga1'},
          {col1: 'col1-riga2', col2: 'col2-riga2', col3: 'col3-riga2'},
        ],
        header:{col1: 'Colonna 1', col2: 'Colonna 2', col3: 'Colonna 3'},
      }
    }
    return test;
  }


}
