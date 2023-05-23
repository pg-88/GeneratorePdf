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
  private stile!: PdfStyle;
  private tabella!: autoTableOption; 
  

  //---------------------------pagina------------------------------------------
  // setter
  set paginaConfig(response: object){
    /**parametro: oggetto di risposta del DB
     * recupera dentro alla risposta i campi che riguardano
     * formato pagina, orientamento e unità di misura.
     */
    let conf: PdfOption = {};

    //controlla i campi di response
    for(const [key, val] of Object.entries(response)){
      console.log('chiave:', key, '\nvalore:', val);
      //quando trova i campi utili alla config pagina
      //li inserisce nella proprietà pagina.

      // serve sapere come arrivano i campi in 'response'
    }

    this.pagina = conf;

    //#################TEST######################
    // this.pagina = {
    //   orientation: 'l',
    //   format: 'a3'
    // }
    //###########################################
  }
  // getter
  get paginaConfig(): PdfOption {
    /**Documento -> Configurazione
     * 
    */
    console.log('option pdf', this.pagina);
    if(Object.keys(this.pagina).length == 0) console.warn('pagina config è vuoto')
    return this.pagina;
  }
  //---------------------------stile-------------------------------------------
  //setter
  set docStyle(response: object){
    /**parametro: oggetto di risposta del DB
     * recupera dentro alla risposta i campi che riguardano
     * formato pagina, orientamento e unità di misura.
     */
    let conf: PdfStyle = {};

    //controlla i campi di response
    for(const [key, val] of Object.entries(response)){
      console.log('chiave:', key, '\nvalore:', val);
      //quando trova i campi utili alla config pagina
      //li inserisce nella proprietà pagina.

      // serve sapere come arrivano i campi in 'response'
    }

    this.stile = conf;

    //#############TEST##########################
    this.stile = {
      font: 'Arial', 
      titleSize: 24,
      textSize: 12
    }
    //###########################################

  }

  // getter
  get docStyle(): PdfStyle{
    /**Documento -> Stile
     * Genera e ritorna un oggetto per la definizione dello stile generale
     * del pdf, per lo stile della tabella c'è un oggetto più specifico*/

    //elaborazione response

    return this.stile; 
  }

  //--------------------------------Tabella------------------------------------
  //setter
  set tabOption(response: object){
    /** parametro è la risposta del DB
     * filtra i dati e assegna alla proprietà tabella i valori utili alla 
     * configurazione della tabella */
    let tab: autoTableOption = {}

    
    //controlla i campi di response
    for(const [key, val] of Object.entries(response)){
      console.log('chiave:', key, '\nvalore:', val);
      //quando trova i campi utili alla config pagina
      //li inserisce nella proprietà pagina.
      
      // serve sapere come arrivano i campi in 'response'
    }
    
    this.tabella = tab;
    
    //#############TEST##########################
    this.tabella = {
      theme: 'grid',
      headStyles: this.testStyleHead,
      alternateRowStyles: this.testStyleBody
    }
    //###########################################
  }
  
  
  // getter
  get tabOption(): autoTableOption {
    /**Tabella -> Opzioni
     * ritorna un oggetto per la definizione dello stile
     * generale della tabella
     * Avvisa nel caso l'oggetto sia vuoto*/
    if(Object.values(this.tabella).length == 0) console.warn('config Tabella non presente')
    return this.tabella
  }



  //#################Test########################
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
  //#############################################
}
