import { Injectable } from '@angular/core';
import { GeometriaService, Layout } from './geometria.service';
import { DatiDocumentoService } from './dati-documento.service';
import { ConfigDocumentoService } from './config-documento.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment_dev';
import { AuxiliaryService } from './auxiliary.service';


export type campo = 
  | 'CANVAS_BOX' //canvas
  | 'CANVAS_LINE' //canvas
  | 'LOGO' //canvas
  | 'COLUMN' //grid
  | 'COLUMNTITLE'//grid
  | 'GRID' //grid
  | 'FIELD' //record
  | 'FIELD_SUBTOT' //record
  | 'FIELD_SUM' // record
  | 'LABEL' //text
  | 'PAGE_FORMAT' 
  | 'PAGE_ORIENTATION'
  | 'PAGNUM'//text
  | 'SUM' //num
  ;

  export type repeatOpt = 'A' | 'F' | 'L';

  export interface elemento {
    ID: number;
    TEMPLATENAME: string;
    FIELDDESCR: string;
    FIELDTYPE: campo;
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
    REPEAT?: repeatOpt;
    COND_FIELD?: string,
    COND_VALUE?: string
  };

  export interface recordSet {
    nomeTemplate: string;
    nomeRecordSet: string;
    sql: string;
    keyName: any;
    keyValue: any;
  };
  
  export type template = elemento[];


@Injectable({
  providedIn: 'root'
})

export class ChiamataDBService {
  /**Si occuperà di interfacciarsi con il DB e smistare dati agli altri services*/

  private response!: any;

  constructor(
    private http: HttpClient,
    private aux: AuxiliaryService,
  ) { }
  
  recuperaDati(p: {
    templateName: string,
    keyName: string,
    keyVal: string}) {
      /**chiamata al db coi parametri:
       *  nome template, nome chiave e valore chiave
       *  ritorna un'array di oggetti risposta*/
      let request = this.http.get(`${environment.baseUrl}/stampe`,
      {
        headers:
        {
          TEMPLATENAME: p.templateName,
          KEYNAME: p.keyName,
          KEYVAL: p.keyVal
        }
      });
          
      request.subscribe({
        next: data => {
          console.log(data);
          this.response = data;
        },
        error: e => {
          console.warn("non arriva risposta");
          this.assignFakeResponse();
        }
      })
      
    }


    assignFakeResponse(){
      console.log('qui si assegna la risposta generata artificialmente');
      this.response = this.aux.fakeResponse;
    }

    get responseData(){
      return this.response;
    } 
  }