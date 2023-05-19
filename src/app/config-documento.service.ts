import { Injectable } from '@angular/core';
import { ChiamataDBService } from './chiamata-db.service';


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
  font?: string
  fontStyle?: 'normal'|'bold'|'italic'|'bolditalic'
  overflow?: 'linebreak'|'ellipsize'|'visible'|'hidden'
  fillColor?: number | number[] | string
  textColor?: number | number[] | string
  fontSize?: number
  cellWidth?: 'auto'|'wrap'|number
  minCellWidth?: number
  minCellHeight?: number 
  halign?: 'left'|'center'|'right'
  valign?: 'top'|'middle'|'bottom'
  lineColor?: any
  lineWidth?: number // If 0, no border is drawn
}


@Injectable({
  providedIn: 'root'
})
export class ConfigDocumentoService {
  /** Recupera i dati per la configurazione della tabella
   *  Args: 
   *  ???? serviranno credenziali e indirizzo per il db ????
   */

  constructor() {
   }

  get docConfig(): PdfOption {
    /**Documento -> Configurazione
     * Genera e ritorna un oggetto con i parametri per la creazione del pdf*/
  
    const conf = {
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    }
    console.log('option pdf', conf);
    return conf;
  }

  get docStyle(): PdfStyle{
    /**Documento -> Stile
     * Genera e ritorna un oggetto per la definizione dello stile generale del pdf,
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
    /**Tabella -> Opzioni
     * Genera e ritorna un oggetto per la definizione dello stile generale della tabella
     * 
    */

    //elaborazione 
    let parametriInArrivo = {
      tema: 'grid',
    };
    let assigned = Object.keys(parametriInArrivo);
    console.log('Fine elaboazione risposta: ', assigned);
    let tableOption: autoTableOption = {
      theme: 'grid',
      headStyles: this.testStyleHead,
      alternateRowStyles: this.testStyleBody
    }

    return tableOption;
  }

  private testStyleHead: autoTableStyle = {
    fillColor: 'coral',
    fontStyle: 'bold',
    textColor: '#000066'
  }
  private testStyleBody: autoTableStyle = {
    fillColor: '#ffffb3',
    halign: 'right',
    textColor: '#000066'
  }
}
