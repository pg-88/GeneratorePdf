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
  /** service da usare nel component che crea il documento.
   * Si occupa di estrapolare dalla risposta del db, i campi che servono 
   * a definire forma e stile del documento.
   * 
   * Args
   *  - pagina: contiene i parametri per inizializzare jsPDF
   *  - stile: contiene info sullo stile tipo font, dimensione caratteri corpo e titoli
   *  - tabella: contiene le opzioni da passare ad autoTable 
   */

  constructor() {}

  private pagina!: PdfOption;
  private tabella!: autoTableOption; 
  


}
