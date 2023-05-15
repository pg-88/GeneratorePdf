import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';

export interface ConfigDoc{
  nomeFile: string,
  orientation: 'l' | 'p',
  formato: formatoCarta,
  font: string
}

type formatoCarta = 'a0' |'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6';

@Injectable({
  providedIn: 'root'
})
export class ConfigDocumentoService {
  /** Recupera i dati per la configurazione della tabella
   * 
   *  Arg: 
   *  configDoc: oggetto che definisce parametri di configurazione del documento
   *    di default sarà un foglio a4 in mm con orientazione verticale 
   * 
   * 
   */

  constructor() { }

  getDataConfig(){
    /**Chiamata al DB per recuperare i dati che serviranno a generare il documento*/

    //chiamata al db
    const request = 'url';

    //elaborazione risposta
    const response = {
      filename: "bolla-xyz-12.vdw",
      verticale: true,
      dimensione: 'a4',
      font: 'Arial'
    }
    

    const conf: ConfigDoc = {
      nomeFile: (
        response.filename.endsWith('.pdf') ? 
        response.filename : 
        response.filename.concat('.pdf')),
      orientation: (response.verticale ? 'p' : 'l'),
      formato: 'a4',
      font: response.font
    }
    
    //inizializzazione proprietà configDoc
    return conf;
  }
}
