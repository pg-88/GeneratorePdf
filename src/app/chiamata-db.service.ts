import { Injectable } from '@angular/core';
import { GeometriaService, Layout } from './geometria.service';
import { DatiDocumentoService, PagDati } from './dati-documento.service';
import { ConfigDocumentoService } from './config-documento.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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
};

export type template = elemento[] | undefined;

export interface recordSet {
  nomeTemplate: string;
  nomeRecordSet: string;
  sql: string;
  keyName: any;
  keyValue: any;
};



//######## costanti test ######################################################
// const OFFERTA_RECORDSET: recordSet = {
//   nomeTemplate: 'Offerta',
//   nomeRecordSet: 'OffertaSql',
//   sql: `SELECT t.numpre, r.codart, a.desart1, c.codcli, c.ragsoc1, c.cap || ' ' || c.locali || ' (' || c.provin || ')' AS cap_locali_provin,
//   r.prezzo, r.qtapre, r.qtapre*r.prezzo AS totale, r.sconto
//   FROM preventivites t
//   LEFT JOIN preventivirig r ON r.numpre = t.numpre
//   LEFT JOIN clienti c ON c.codcli = t.codcli
//   LEFT JOIN articoli a ON a.codart = r.codart
//   WHERE t.numpre =  103`,
//   keyName: 'numPre',
//   keyValue: 103
// };

const TEMPLATE_PREVENTIVO_TEST: template = [
  {
    ID: 0,
    FIELDTYPE:'PAGE_FORMAT',
    TEMPLATENAME: 'PREVENTIVI1',
    FIELDDESCR: 'pagina',
    FIXVALUE: 'a4',
  },
  {
    ID: 1,
    FIELDTYPE:'LOGO',
    TEMPLATENAME: 'PREVENTIVI1',
    FIELDDESCR: 'logo',
    POSX: 10,
    POSY: 10,
    WIDTH: 82,
    HEIGHT: 16,
    FIXVALUE: './assets/template/logo.jpg',
    FIELDSTYLE: 'auto',
  },
  {
    ID: 2,
    FIELDTYPE:'LABEL',
    TEMPLATENAME: 'PREVENTIVI1',
    FIELDDESCR: 'label',
    POSX: 10,
    POSY: 27,
    WIDTH: 82,
    HEIGHT: 3,
    FIXVALUE: 'Via delle Nazioni, 75 - 41122 MODENA',
    FONTNAME: 'Tahoma',
    FONTSIZE: 8,
    FONTCOLOR: '#000000',
    FONTALIGN: 'left',
    FIELDSTYLE: 'auto'
  },
  {
    ID: 3,
    FIELDTYPE:'LABEL',
    TEMPLATENAME: 'PREVENTIVI1',
    FIELDDESCR: 'label',
    POSX: 10,
    POSY: 31,
    WIDTH: 82,
    HEIGHT: 3,
    FIXVALUE: 'Tel: 059-310386 Fax: 059-314450',
    FONTNAME: 'Tahoma',
    FONTSIZE: 8,
    FONTCOLOR: '#000000',
    FONTALIGN: 'left',
    FIELDSTYLE: 'auto'
  },
  {
    ID: 4,
    FIELDTYPE:'LABEL',
    TEMPLATENAME: 'PREVENTIVI1',
    FIELDDESCR: 'label',
    POSX: 10,
    POSY: 35,
    WIDTH: 82,
    HEIGHT: 3,
    FIXVALUE: 'Cap. Soc. 10.400 i.v. R.E.A. Modena n.309897',
    FONTNAME: 'Tahoma',
    FONTSIZE: 8,
    FONTCOLOR: '#000000',
    FONTALIGN: 'left',
    FONTSTYLE: 'auto'
  },
  {
    ID: 5,
    FIELDTYPE:'LABEL',
    TEMPLATENAME: 'PREVENTIVI1',
    FIELDDESCR: 'label',
    POSX: 10,
    POSY: 35,
    WIDTH: 82,
    HEIGHT: 3,
    FIXVALUE: 'Reg. Imprese Modena - C.F e P.IVA 02532170368',
    FONTNAME: 'Tahoma',
    FONTSIZE: 8,
    FONTCOLOR: '#000000',
    FONTALIGN: 'left',
    FIELDSTYLE: 'auto'
  },
  {
    ID:9,
    TEMPLATENAME:'PREVENTIVI1',
    FIELDDESCR: 'cliente',
    FIELDTYPE: 'FIELD',
    POSX: 115,
    POSY:	67,
    WIDTH: 105,
  	FONTNAME: 'Arial',
    FONTSIZE: 10,	
    FONTSTYLE: 'bold',
    FONTALIGN: 'left',
    RECORDSETNAME: 'SQLPREVENTIVO',
    FIELDNAME: 'RAGSOC1',
    FIELDSTYLE: 'SHRINK',
    REPEAT: 'F',
  },
  {
    ID: 42,
    FIELDTYPE: "PAGE_ORIENTATION",
    TEMPLATENAME: "PREVENTIVI1",
    FIELDDESCR: "pagina",
    FIXVALUE: "p"
  }
];


//#############################################################################
@Injectable({
  providedIn: 'root'
})

export class ChiamataDBService {
  /**Si occuperà di interfacciarsi con il DB e smistare dati agli altri services*/
  
  constructor(
    private http: HttpClient,
  ) { }

  private template!: any;
  // private recordSet!: object;

  //prende il nome template e inizializza 
  set templateParams(params: {
    templateName: string,
    keyName: string,
    keyVal: any
  }){
    /**riceve un oggetto dal component e chiama la tabella per ottenere 
     * i dati dal db in formato template, da usare per inizializzare 
     * la proprietà template*/
    let chiamata = this.http.get(`${environment.baseUrl}/stampe/getLayout`, {
      headers: {
        TEMPLATENAME: params.templateName,
        RECORDSETNAME: params.keyName,
        KEYNAME: params.keyVal
      }
    });

    // chiamata.subscribe(
    //   (data) => {
    //   this.template = data;
    //   //console.log('dati in arrivo: ', data);
    // });
  
    this.template = TEMPLATE_PREVENTIVO_TEST;
  }

  // private recordSetRequest(templateName: string, keyName: string, keyValue: any){
  //   //inserire qui la chiamata alla tabella dei recordSet
  //   console.log(`richiama i valori del recordset 
  //     ${templateName} nella chiave ${keyName} 
  //     che ha valore ${keyValue}`);
  //   return OFFERTA_RECORDSET;
  // }

  // private templateRequest(sqlQuery: string){
  //   //chiamata a template e controlla lo status della risposta
  //   //se status 'ok' inizializza template, altrimenti manda errore
  //   try{
  //     this.template = TEMPLATE_OFFERTA;
  //   } catch (err){
  //     //console.error(Response.status)
  //   }
  // }


  get templateDoc(){
    //controlla se lo status della risposta è corretto
    //quindi e passa il result

    return this.template;
  }
}

