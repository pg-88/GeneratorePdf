import { Injectable } from '@angular/core';
import { GeometriaService, Layout } from './geometria.service';
import { DatiDocumentoService, PagDati } from './dati-documento.service';
import { ConfigDocumentoService } from './config-documento.service';

type campo = 'logo' | 'label' | 'grid' | 'columnTitle' | 'column' | 'pagina' ;

export interface elemento {
  nome: string;
  tipoCampo: string | campo;
  formato?: string,
  orientamento?: string,
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
  value?: any;
  gridName?: string;
  index?: number;
  font?: string;
  fontSize?: number;
  fontStyle?: 'italic' | 'bold' | 'underline';
  fontColor?: number | string;
  fontAlign?: string;
  backgroundColor?: number | string;
  border?: number;
  borderColor?: number | string;
  recordSet?: string | recordSet;
  fieldAlias?: string;
  autoShrink?: boolean;
};

export type template = elemento[];

export interface recordSet {
  nomeTemplate: string;
  nomeRecordSet: string;
  sql: string;
  keyName: any;
  keyValue: any;
};



//######## costanti test ######################################################
const OFFERTA_RECORDSET: recordSet = {
  nomeTemplate: 'Offerta',
  nomeRecordSet: 'OffertaSql',
  sql: `SELECT t.numpre, r.codart, a.desart1, c.codcli, c.ragsoc1, c.cap || ' ' || c.locali || ' (' || c.provin || ')' AS cap_locali_provin,
  r.prezzo, r.qtapre, r.qtapre*r.prezzo AS totale, r.sconto
  FROM preventivites t
  LEFT JOIN preventivirig r ON r.numpre = t.numpre
  LEFT JOIN clienti c ON c.codcli = t.codcli
  LEFT JOIN articoli a ON a.codart = r.codart
  WHERE t.numpre =  103`,
  keyName: 'numPre',
  keyValue: 103
};

const TEMPLATE_OFFERTA: template = [
  {
    nome: 'Offerta',
    tipoCampo: 'pagina',
    orientamento: 'a4',
  },
  {
    nome: 'Offerta',
    tipoCampo: 'logo',
    posX: 10,
    posY: 10,
    width: 82,
    height: 16,
    value: './assets/template/logo.jpg',
    autoShrink: true
  },
  {
    nome: 'Offerta',
    tipoCampo: 'label',
    posX: 10,
    posY: 27,
    width: 82,
    height: 3,
    value: 'Via delle Nazioni, 75 - 41122 MODENA',
    font: 'Tahoma 8px',
    fontSize: 8,
    fontColor: '#000000',
    fontAlign: 'left',
    autoShrink: true
  },
  {
    nome: 'Offerta',
    tipoCampo: 'label',
    posX: 10,
    posY: 31,
    width: 82,
    height: 3,
    value: 'Tel: 059-310386 Fax: 059-314450',
    font: 'Tahoma 8px',
    fontSize: 8,
    fontColor: '#000000',
    fontAlign: 'left',
    autoShrink: true
  },
  {
    nome: 'Offerta',
    tipoCampo: 'label',
    posX: 10,
    posY: 35,
    width: 82,
    height: 3,
    value: 'Cap. Soc. 10.400 i.v. R.E.A. Modena n.309897',
    font: 'Tahoma 8px',
    fontSize: 8,
    fontColor: '#000000',
    fontAlign: 'left',
    autoShrink: true
  },
  {
    nome: 'Offerta',
    tipoCampo: 'label',
    posX: 10,
    posY: 35,
    width: 82,
    height: 3,
    value: 'Reg. Imprese Modena - C.F e P.IVA 02532170368',
    font: 'Tahoma 8px',
    fontSize: 8,
    fontColor: '#000000',
    fontAlign: 'left',
    autoShrink: true
  },
];

//#############################################################################
@Injectable({
  providedIn: 'root'
})

export class ChiamataDBService {
  /**Si occuperà di interfacciarsi con il DB e smistare dati agli altri services*/
  
  //serviranno delle credenziali di accesso
  //forse sarà meglio metterle in environments

  constructor() { }

  private template!: template;
  private recordSet!: object;

  richiestaDati(nomeTemplate: string){
    /**chiama la tabella record set recupera la query sql e la esegue
     * per la tabella template, controlla lo status risposta e
     * inizializza la variabile template
     * 
     * arg
     *  - nomeTemplate: il nome con cui cercare il recordset */

    //inserire qui chiamata a recordset

  }
  
  //prende il nome template e inizializza 
  set templateParams(params: {
    templateName: string,
    keyName: string,
    keyVal: any
  }){
    /**riceve un oggetto dal component e chiama la tabella per  */
    this.recordSet = this.recordSetRequest(params.templateName, params.keyName, params.keyVal);
    for(const [key, val] of Object.entries(this.recordSet)){
      if(key == 'sql') this.templateRequest(val);

    }

  }

  private recordSetRequest(templateName: string, keyName: string, keyValue: any){
    //inserire qui la chiamata alla tabella dei recordSet
    console.log(`richiama i valori del recordset 
      ${templateName} nella chiave ${keyName} 
      che ha valore ${keyValue}`);
    return OFFERTA_RECORDSET;
  }

  private templateRequest(sqlQuery: string){
    //chiamata a template e controlla lo status della risposta
    //se status 'ok' inizializza template, altrimenti manda errore
    try{
      this.template = TEMPLATE_OFFERTA;
    } catch (err){
      //console.error(Response.status)
    }
  }


  get templateDoc(){
    //controlla se lo status della risposta è corretto
    //quindi e passa il result 
    return this.template;
  }
}