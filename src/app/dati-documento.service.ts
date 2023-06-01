import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment_dev';

export interface Response {
  Status: Status;
  Result: template | [];
}

export interface Status {
  errorCode:        string;
  errorDescription: string;
}
export type template = elemento[];

export interface elemento {
ID: number;
TEMPLATENAME: string;
FIELDDESCR: string;
FIELDTYPE: string ;
FIELDORDER: number,
GROUPBOX?: string,
GROUPRIF?: string,
POSX?: number;
POSY?: number;
WIDTH?: number;
HEIGHT?: number;
FIXVALUE?: string;
GRIDNAME?: string;
GRIDORDER?: number;
FONTNAME?: string;
FONTSIZE?: number;
FONTSTYLE?: string;
FONTCOLOR?: string;
FONTALIGN?: string;
BACKCOLOR?: string;
BORDER?: string;
BORDERCOLOR?: string;
RECORDSETNAME?: string;
FIELDNAME?: string;
FIELDSTYLE?: string;
REPEAT?: string;
COND_FIELD?: string,
COND_VALUE?: string
};


export interface ParametriElemento {
  id: number;
  templateName: string;
  fieldDescr: string;
  fieldType: string;
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
  repeat?: string;
  condField?: string;
  condValue?: string;
};

@Injectable({
  providedIn: 'root'
})

export class DatiDocumentoService {
  /**Viene richiamato dopo aver ricevuto i dati dal DB e li ripulisce e ordina*/

  private docTemplate!: template; //dati grezzi in arrivo dal DB
  private arrayDati!: ParametriElemento[]; //array con elementi stampabili
  private arrayConf!: ParametriElemento[]; //elementi tipo pagina e grid

  constructor(
    private http: HttpClient,
  ) { }

  get template(){
    return this.docTemplate;
  }

  async recuperaDati(p: string): Promise<template>{
    /**chiamata al db coi parametri:
     *  nome template, nome chiave e valore chiave
     *  ritorna un'array di oggetti risposta*/
    return new Promise((resolve, reject)=> {
      let url = `${environment.baseUrl}/stampe/getlayout`;
      let header = {
        "templateName": "PREVENTIVI1",
      };
      this.docTemplate = [];
      this.http.post(url, header, {observe: 'body'}).subscribe({  
        next: ((data) => {
          Object.entries(data).forEach(v => {
            if(v[0] == 'Result'){
              resolve(v[1]);
            }
          });
        }),
        error: (err => {
          console.warn(err)
          reject(err);
        }),
      });
    });
  }


  get arrayStampa(){
    return this.arrayDati;
  }

  get arrayConfig(){
    return this.arrayConf;
  }

  generaLista(tem: template): ParametriElemento[] {
    /**Converte i dati per inserirli nell'interfaccia ParametriElemento
     *
     */

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

  set setElementList(tem: template){
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