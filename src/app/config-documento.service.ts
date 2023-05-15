import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';

export interface ConfigDoc{
  init?:{
    //oggetto da passare al costruttore di jsPDF vedi https://artskydj.github.io/jsPDF/docs/jsPDF.html
    orientation?: orientamentoPag | undefined,
    format?: string | number[] | undefined,
  } | undefined,
  
  page: {
    nomeFile: string | undefined,
    lingua?: string
  } | undefined,
  
  style?: {
    font?: string | undefined
    fontStyle?: string | undefined
  } | undefined,
  tableStyle?: {

  }

}

type orientamentoPag = 'landscape' | 'portrait' | 'l' | 'p';

@Injectable({
  providedIn: 'root'
})
export class ConfigDocumentoService {
  /** Recupera i dati per la configurazione della tabella
   *  Args: 
   *  ???? serviranno credenziali e indirizzo per il db ????
   */

  constructor() { }

  getDataConfig(){
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


    const conf: ConfigDoc = {
      //Ricalca jsPDFOption 
      init: {
        orientation: (response.verticale ? 'p' : 'l'),
        format: response.dimensione,
      },
      page: {
        nomeFile: (
          response.filename.endsWith('.pdf') ? 
          response.filename : 
          response.filename.concat('.pdf')
        ),
      }
    }
    return conf;
  }
}
