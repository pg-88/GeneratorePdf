import { Injectable } from '@angular/core';



export interface PdfOption {
  orientation?: string,
  unit?: string,
  format?: string,
  precision?: number,
  userUnit?: number
}

export interface autoTableStyle {
  theme?: string, //'striped'|'grid'|'plain'
  styles?: any,
  headStyles?: any,
  bodyStyle?: any,
  footStyle?: any,
  alternateRowStyles?: any,
  columnStyle?: any
}


@Injectable({
  providedIn: 'root'
})
export class ConfigDocumentoService {
  /** Recupera i dati per la configurazione della tabella
   *  Args: 
   *  ???? serviranno credenziali e indirizzo per il db ????
   */
  private mockResponse: any;


  constructor() { }

  async dbRequest(){
    const response = new Promise((res, rej) => { 
      setTimeout(res, 2000);
      this.mockResponse = {
        orientamento: 'verticale',
        foglio: 'a4',
        font: 'arial',
      }
    });
  }

  getDocConfig(): PdfOption {
    /**Chiamata al DB per recuperare i dati che serviranno a generare il documento
     * Restituisce un oggetto del tipo ConfigDoc che sarà utilizzato per 
     * definire le caratteristiche del documento.
    */

    //chiamata al db
    const request = 'url';

    //elaborazione risposta
    const response = {
      filename: "bolla-xyz-12.vdw",
      verticale: true,
      dimensione: 'a3',
      font: 'Arial'
    }
    return {

    };
  }
}
