import { Injectable } from '@angular/core';
import { template } from './chiamata-db.service';

export interface ParametriElemento {
  id: number;
  templateName: string;
  fieldDescr: string;
  fieldType: Campo | string;
  fieldOrder: number,
  groupBox?: string,
  groupRif?: string,
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
  fixValue?: string;
  gridName?: string;
  gridOrder?: number;
  fontName?: string;
  fontSize?: number;
  fontStyle?: string;
  fontColor?: string;
  fontAlign?: string;
  backColor?: string;
  border?: string;
  borderColor?: string;
  recordsetName?: string;
  fieldName?: string;
  fieldStyle?: string;
  repeat?: Repeat;
  condField?: string,
  condValue?: string
};

export enum Campo {
  'CANVAS_BOX',
  'CANVAS_LINE',
  'LOGO',
  'COLUMN',
  'COLUMNTITLE',
  'GRID',
  'FIELD',
  'FIELD_SUBTOT',
  'FIELD_SUM',
  'LABEL',
  'PAGE_FORMAT',
  'PAGE_ORIENTATION',
  'PAGNUM',
  'SUM',
}

export enum Repeat {
  A = "A",
  F = "F",
}

@Injectable({
  providedIn: 'root'
})

export class DatiDocumentoService {
  /**Viene richiamato dopo aver ricevuto i dati dal DB e li ripulisce e ordina*/

  private arrayDati!: ParametriElemento[]; //array con elementi stampabili
  private arrayConf!: ParametriElemento[]; //elementi tipo pagina e grid

  constructor() { }

  get arrayStampa(){
    return this.arrayDati;
  }

  get arrayConfig(){
    return this.arrayConf;
  }

  generaLista(tem: template): ParametriElemento[] {
    /**Converte i dati per inserirli nell'interfaccia ParametriElemento
     * ############################### ???????? ########################################
     * conviene usare enum per campi tipo fieldType, TemplateName, repeat, group*... ???
     *##################################################################################*/

    let u: ParametriElemento[] = []; 
    this.arrayDati = [];
    // console.log('generazione lista', tem);
    tem.forEach(el => {
      let p: ParametriElemento = {
        id:            el.ID,
        templateName:  el.TEMPLATENAME.trim(),
        fieldDescr:    el.FIELDDESCR.trim(),
        fieldType:     el.FIELDTYPE.trim(),
        fieldOrder:    el.FIELDORDER,
        groupBox:      el.GROUPBOX?.trim(),
        groupRif:      el.GROUPRIF?.trim(),
        posX:          el.POSX,
        posY:          el.POSY,
        width:         el.WIDTH,
        height:        el.HEIGHT,
        fixValue:      el.FIXVALUE?.trim(),
        gridName:      el.GRIDNAME?.trim(),
        gridOrder:     el.GRIDORDER,
        fontName:      el.FONTNAME?.trim(),
        fontSize:      el.FONTSIZE,
        fontStyle:     el.FONTSTYLE?.trim(),
        fontColor:     el.FONTCOLOR?.trim(),
        fontAlign:     el.FONTALIGN?.trim(),
        backColor:     el.BACKCOLOR?.trim(),
        border:        el.BORDER?.trim(),
        borderColor:   el.BORDERCOLOR?.trim(),
        recordsetName: el.RECORDSETNAME?.trim(),
        fieldName:     el.FIELDNAME?.trim(),
        fieldStyle:    el.FIELDSTYLE?.trim(),
        repeat:        el.REPEAT,
        condField:     el.COND_FIELD?.trim(),
        condValue:     el.COND_VALUE?.trim(),
      }
      u.push(p);
    });
    // console.log('unsorted data: ', unsorted)
    return u;
  }

  set elementList(tem: template){
    /**Invocato passando i dati in arrivo dal DB
     * invoca genera lista quindi
     * separa i parametri degli elementi da stampare dai
     * parametri per la configurazione */

    let unsortedData: ParametriElemento[] = this.generaLista(tem);
    let unsorted: ParametriElemento[] = [];
    let noOrder: ParametriElemento[] = [];
    //sorting secondo il field order (campi senza field order vanno alla fine)
    let tmp, j, i : any;
    let swap = false;

    //creo una lista senza gli elementi che non hanno il fieldOrder
    unsortedData.forEach(el => {
      if(el.fieldOrder != null) unsorted.push(el);
      else noOrder.push(el);
    });
    this.arrayConf = noOrder;
    //bubble sort    
    for(i = 0; i < unsorted.length; i++){
      swap = false;
      for(j = i +1; j < unsorted.length; j++){
        if(unsorted[i].fieldOrder > unsorted[j].fieldOrder){
          tmp = unsorted[i];
          unsorted[i] = unsorted[j];
          unsorted[j] = tmp;
          swap = true
        }
        if(swap) break;
      }
    }
    this.arrayDati = unsorted;
  }
}