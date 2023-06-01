import { Injectable } from '@angular/core';
import { jsPDF, TextOptionsLight } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ParametriElemento } from './dati-documento.service';
import { JsonPipe } from '@angular/common';

export type Coord = [x: number, y: number];

class Area{
  private x: number;
  private y: number;
  private w: number;
  private h: number;

  constructor(startX: number, startY: number, width: number, height: number){
    this.x = startX;
    this.y = startY;
    this.w = width;
    this.h = height;
  }

  get diagonalePrinc() {return[this.x, this.y, this.x + this.w, this.y + this.h]}
  get getStartX() {return this.x}
  get getStartY() {return this.y}
  get getWidth() {return this.w}
  get getHeigth() {return this.h}
  get getSup() {return (this.w * this.h)}
  get getPoints(): Array<Coord> {
    /**ritorna le coordinate dei 4 punti partendo da alto sx in senso orario*/
    return [[this.x, this.y], [this.x + this.w, this.y], 
    [this.x + this.w, this.y + this.h], [this.x, this.y + this.h]]}

  set setStartX(nuovaX: number) {this.x = nuovaX}
  set setStartY(nuovaY: number) {this.y = nuovaY}
  set setWidth(nuovaW: number) {this.w = nuovaW}
  set setHeight(nuovaH: number) {this.h = nuovaH}

  puntoInternoArea(c: Coord): boolean{
    //torna true se il punto passato è interno all'area, altrimenti falso
    let ascisse : boolean = false;
    let ordinate : boolean = false;
    
    if(c[0] >= this.x && c[0] <= (this.x + this.w)) ascisse = true;
    if(c[1] >= this.y && c[1] <= (this.y + this.h)) ordinate = true;

    return (ascisse && ordinate);
  }

}

class FieldType{
  private spazio: Area;
  protected doc: jsPDF;
  private gruppo!: string;
  private rif?: string; //rappresenta il vincolo (sulla posizione) a un altro gruppo.
  constructor(pos: Area, doc: jsPDF){
    this.spazio = pos;
    this.doc = doc;
  }

  sposta(x?: number, y?:number){
    if(x != undefined) this.spazio.setStartX = x;
    if(y != undefined) this.spazio.setStartY = y;
    console.log(`oggetto spostato alle coordinate ${x != undefined ?'x = ' + x : ' '}${y != undefined ? ' y = ' + y : ''}`);
  }

  ridimensiona(w?: number, h?: number){
    if(w != undefined) this.spazio.setWidth = w;
    if(h != undefined) this.spazio.setHeight = h;
    console.log(`oggetto spostato alle coordinate ${w != undefined ?
      'Larghezza = ' + w : ' '}
      ${h != undefined ? ' Altezza = ' + h : ''}`);
  }

  ridimensionaSposta(pos: Area){
    this.spazio = pos;
  }

  inseribile(esistente: Area): boolean{
    let check = true;
    let bigBox: Area = this.spazio.getSup < esistente.getSup ? esistente : this.spazio;
    let smallBox: Area = esistente.getSup < this.spazio.getSup ? esistente : this.spazio;
    const pointSmall = smallBox.getPoints;

    pointSmall.forEach(pnt => {
      if(bigBox.puntoInternoArea(pnt)) check = false;
    });
    return check;
  }
}

class Label extends FieldType {
  private text: string;
  private option: TextOptionsLight;

  constructor(pos: Area, doc: jsPDF, testo: string, opt: TextOptionsLight){
    //ottenere altezza del testo: jsPDFobject.getTextDimensions()
    super(pos, doc);
    this.text = testo;
    this.option = opt;
  }

  scrivi(){
    //calcolo lo spazio occupato dal testo
    const w = this.doc.getTextDimensions(this.text, this.option).w
    const h = this.doc.getTextDimensions(this.text, this.option).h
    // let txtArea: Area = 
  }
}


@Injectable({
  providedIn: 'root'
})
export class GeometriaDocumentoService {
  /**Crea l'oggetto jsPDF, configura il foglio e salva o esporta il file
   * 
   * Viene richiamato dal component che crea il pdf (per ora home.page)
   * dal component che lo invoca gli saranno passati gli oggetti per 
   * inizializzare il documento(config doc), creare il layout (geometria),
   * inserire i dati e creare la tabella (dati doc).
   */

  private freeArea!: Area;
  private arrayStampa: ParametriElemento[] = [];
  private usedArea!: Array<Area>; //array che contiene tutte le aree occupate dagli elementi
  //per aggiornare la usedArea bisogna prima controllare che ci sia spazio nella pagina e
  //che non ci sia sovrapposizione con le aree già inserite
  
  //distanza minima dal bordo del foglio per tutti gli elementi
  MARGIN_H = 10;
  MARGIN_W = 10;

  constructor(){}

  set setPagArea(doc: jsPDF){
    const w = (doc.internal.pageSize.width - this.MARGIN_W).toPrecision(5);
    const h = (doc.internal.pageSize.height - this.MARGIN_H).toPrecision(5);
    this.freeArea = new Area(this.MARGIN_W, this.MARGIN_H, Number(w), Number(h));
  }

  set listaStampa(lst: ParametriElemento[]){
    this.arrayStampa
  }

}