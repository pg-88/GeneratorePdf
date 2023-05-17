import { Injectable } from '@angular/core';


export interface PdfOption {
  //per essere passato al constructor di jsPDF
  orientation?: string,
  unit?: string,
  format?: string,
  precision?: number,
  userUnit?: number
}

export interface PdfStyle {
  //Per generare elementi della pagina non in tabella
  font?: string,
  titleSize?: number,
  textSize?: number,
  logo?: string
}

export interface autoTableOption {
  //per essere passato come option di autoTable
  theme?: string, //'striped'|'grid'|'plain'
  styles?: autoTableStyle,
  headStyles?: any,
  bodyStyle?: any,
  footStyle?: any,
  alternateRowStyles?: any,
  columnStyle?: any
}

export interface autoTableStyle{
  //per essere passato dentro a style o headStyle o footStyle
  //in option di autoTable
  font?: string,
  fontStyle?: 'normal'|'bold'|'italic'|'bolditalic',
  overflow?: 'linebreak'|'ellipsize'|'visible'|'hidden',
  fillColor?: number | number[] | string,
  textColor?: number | number[] | string,
  fontSize?: number
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


  constructor() {
    this.dbRequest();
   }

  async dbRequest(){
    //chiamata al db
    const request = 'url';

    const response = new Promise((res, rej) => { 
      /**Chiamata al DB per recuperare i dati che serviranno a generare il documento
       * Restituisce un oggetto del tipo ConfigDoc che sarà utilizzato per 
       * definire le caratteristiche del documento.
      */
      setTimeout(res, 2000);
      this.mockResponse = {
        orientamento: 'verticale',
        foglio: 'a4',
        font: 'arial',
      }
    });
    response.then((val) => {
      this.mockResponse = val
    })

    console.log('response',response,'\nmockResponse ',  this.mockResponse)
  }

  get docConfig(): PdfOption {
    /**Genera e ritorna un oggetto con i parametri per la creazione del pdf*/
    
    const conf = {
      orientation: this.mockResponse.orientamento,
      format: this.mockResponse.foglio
    }
    console.log('option pdf', conf);
    return {};
  }

  get docStyle(): PdfStyle{
    /**Genera e ritorna un oggetto per la definizione dello stile generale del pdf,
     * per lo stile della tabella c'è un oggetto più specifico
    */

    //elaborazione response
    const style = {
      font: 'Arial', 
      titleSize: 24,
      textSize: 12
    }
    console.log('pdf style ',style);
    return style; 
  }

  get tabOption(): autoTableOption {
    /**Genera e ritorna un oggetto per la definizione dello stile generale della tabella
     * 
    */

    //elaborazione 
    const tabOption = {
      theme: 'grid',

    }
    console.log('table option', tabOption);
    return tabOption;
  }

  get tabStyle(): autoTableStyle{
    /**Genera e ritorna oggetto per lo stile genrale della tabella.
     */
    
    const tabStyle: autoTableStyle = {
      font: 'Arial',
      textColor: '#0f0f0f'
    }
    console.log('table style', tabStyle);
    return tabStyle;
  }
}
