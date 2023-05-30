import { Injectable } from '@angular/core';
import { GeometriaService, Layout } from './geometria.service';
import { DatiDocumentoService } from './dati-documento.service';
import { ConfigDocumentoService } from './config-documento.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment_dev';
// import { AuxiliaryService } from './auxiliary.service';


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

export interface Response {
    Status: Status;
    Result: template | [];
}
export type template = elemento[];

export interface elemento {
  ID: number;
  TEMPLATENAME: string;
  FIELDDESCR: string;
  FIELDTYPE: campo | string;
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
  REPEAT?: Repeat;
  COND_FIELD?: string,
  COND_VALUE?: string
};

export enum Fontalign {
    Center = "center",
    Left = "left",
}

export enum Group {
    CLIFisc = "CLI_FISC",
    Cliente = "CLIENTE",
    Logo = "LOGO",
}

export enum Repeat {
    A = "A",
    F = "F",
}

export interface Status {
    errorCode:        string;
    errorDescription: string;
}


@Injectable({
  providedIn: 'root'
})

export class ChiamataDBService {
  /**Si occuperà di interfacciarsi con il DB e smistare dati agli altri services*/

  private docTemplate!: template;

  constructor(
    private http: HttpClient,
    // private aux: AuxiliaryService,
  ) { }

  get template(){
    return this.docTemplate;
  }

  recuperaDati(p: string){
      /**chiamata al db coi parametri:
       *  nome template, nome chiave e valore chiave
       *  ritorna un'array di oggetti risposta*/
      return new Promise(resolve => {
        
      }, 
      reject)
      let request = this.http.post(`${environment.baseUrl}/stampe/getlayout`,
      {
        templateName: p
      });
         
      request.subscribe({
        next: (data: any)=> {
          // console.log('MY SUBSCRIPTION',data.Result);
          this.docTemplate = data.Result;
        },
        error: e => {
          console.warn("non arriva risposta");
        }
      });
    }

  }