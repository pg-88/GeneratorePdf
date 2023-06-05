import { Injectable } from '@angular/core';
import { jsPDF, TextOptionsLight } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ParametriElemento } from './dati-documento.service';


export type Coord = [x: number, y: number];

export interface TextConfig{
//contiene i parametri per il testo che non sono in TextOptionLight
//e richiedono un metodo a parte per il settaggio
  fontName?: string,
  fontStyle?: string | TextStyle,
  fontSize?: number,
  fontColor?: string
}

export type TextStyle = 'bold' | 'italic' | 'normal'


//#############################################################################|
//                                                                             |
//                   Gestione degli spazi nella pagina                         |
//                                                                             |
//#############################################################################|

export class Area{
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

  get getDiagonalePrinc() {return[this.x, this.y, this.x + this.w, this.y + this.h]}
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


//#############################################################################|
//                                                                             |
//                      Classificazione in gruppi                              |
//                                                                             |
//#############################################################################|

type Gruppo = {nome: string, maxXY: Coord};

class Gruppi{
  /**Tiene traccia della suddivisione in gruppi e della coordinata massima
   * occupata dall'ultimo elemento inserito nel gruppo.*/
  lista: Array<Gruppo> = [];

  inserisci(nomeGruppo: string, massimaX: number, massimaY: number){
    let aggiornato = false;
    for(let i = 0; i < this.lista.length; i++){
      if(this.lista[i].nome === nomeGruppo) {
        this.lista[i].maxXY = [massimaX, massimaY]
        aggiornato = true;
      }
    }
    if(!aggiornato) this.lista.push({
      nome: nomeGruppo,
      maxXY: [massimaX, massimaY]
    })
  }
}

//#############################################################################|
//                                                                             |
//                Classi per la gestione dei field types                       |
//                                                                             |
//#############################################################################|

class FieldType{
  protected spazio: Area;
  protected doc: jsPDF;
  public gruppo?: string;
  public rif?: string; //rappresenta il vincolo (sulla posizione) a un altro gruppo.
  constructor(
    spazio: Area, 
    doc: jsPDF, 
    gruppo?: string,
    rif?: string,
    ){
    this.spazio = spazio;
    this.doc = doc;
    this.gruppo = gruppo;
    this.rif = rif;
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
    //torna true se non c'è compenetrazione tra l'area dell'oggetto 
    //e l'area passata come parametro
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

//#############################################################################|
//                                                                             |
//                field type LABEL etichetta con valore fisso                  |
//                                                                             |
//#############################################################################|

class Label extends FieldType {
  private text: string;
  private conf?: TextConfig;
  private option?: TextOptionsLight;

  constructor(
    pos: Coord,
    doc: jsPDF,
    testo: string,
    txtConf?: TextConfig,
    opt?: TextOptionsLight,
    group?: string,
    rif?: string){
    //ottenere altezza del testo: jsPDFobject.getTextDimensions()
    let area: Area = new Area(pos[0], pos[1], doc.getTextDimensions(testo, opt).w, doc.getTextDimensions(testo, opt).h);
    super(area, doc, group, rif);
    this.text = testo;
    this.conf = txtConf;
    this.option = opt;
  }

  scrivi(){
    /**Scrive sul doc passato al costruttore usando text*/
    this.conf?.fontName ?? this.doc.addFont(this.conf!.fontName!, this.conf!.fontName!, (this.conf!.fontStyle !== undefined ? this.conf?.fontStyle! : 'normal'));
    this.doc.setFont('Helvetica', 'italic');
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////--- RISOLVERE IL PROBLEMA DEI FONT DA INSERIRE ---////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(this.conf?.fontSize !== null && this.conf?.fontSize !== undefined){
      // console.log(`Dimensione attuale: ${this.doc.getFont().postScriptName} - ${this.doc.getFontSize()}`)
      // console.log('dimensione da settare: ', this.conf.fontSize)
      this.doc.setFontSize(this.conf!.fontSize!);
    }
    // console.log(`Parametri per la stampa del testo: font ${this.doc.getFont().fontName}, dimensione carattere: ${this.doc.getFontSize()}`)
    this.doc.text(this.text, this.spazio.getStartX, this.spazio.getStartY, this.option);
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

  private pdf!: jsPDF;
  private freeArea!: Area;
  private arrayStampa!: Array<any>;
  private gruppi!: Gruppi;
  private usedArea!: Array<Area>; //array che contiene tutte le aree occupate dagli elementi
  //per aggiornare la usedArea bisogna prima controllare che ci sia spazio nella pagina e
  //che non ci sia sovrapposizione con le aree già inserite
  
  //distanza minima dal bordo del foglio per tutti gli elementi
  MARGIN_H = 5;
  MARGIN_W = 10;

  constructor(){}

  set setPagArea(doc: jsPDF){
    const w = (doc.internal.pageSize.width - this.MARGIN_W).toPrecision(5);
    const h = (doc.internal.pageSize.height - this.MARGIN_H).toPrecision(5);
    this.freeArea = new Area(this.MARGIN_W, this.MARGIN_H, Number(w), Number(h));
    this.pdf = doc;
  }

  set setListaStampa(lst: ParametriElemento[]){
    /**Popola array stampa con oggetti del tipo consono*/
    this.arrayStampa = [];
    lst.forEach(el => {
      switch (el.fieldType) {
        case 'LABEL':

          let pos: Coord = [
            el.posX!,
            el.posY != null ? el.posY : 0
            //se non definita dipende da un rif a gruppo
            //viene aggiornata quando la lista è completa
          ]
          let txtConf: TextConfig = {
            fontName: el.fontName?.toLowerCase(),
            fontSize: el.fontSize,
            fontStyle: el.fontStyle?.toLowerCase(),
            fontColor: el.fontColor
          }

          let opt: TextOptionsLight = {
            align: el.fontAlign == 'center'  ?
             'center' : 
             el.fontAlign == 'right' ? 
             'right' :
             el.fontAlign == 'justify' ? 
             'justify' : undefined,
            maxWidth: el.width != null ? el.width : undefined,
            baseline: 'top'
          }
          this.arrayStampa.push(
            new Label(
              pos, 
              this.pdf, 
              el.fixValue!,
              txtConf,
              opt,
              el.groupBox,
              el.groupRif
              )
          )
          break;
      
        default:
          break;
      }
    });
    console.log('Array oggetti da stampare: ', this.arrayStampa);
    this.ottimizzaSpazi();
  }

  ottimizzaSpazi(){
    this.usedArea = [];
    for(let i = 0; i < this.arrayStampa.length - 1; i++){
      // console.log('punti del rettangolo elemento ', this.arrayStampa[i], ':', this.arrayStampa[i].spazio.getPoints);
      // console.log('punti del rettangolo elemento successivo', i+1, this.arrayStampa[i+1].spazio.getPoints);
      if(!this.arrayStampa[i+1].inseribile(this.arrayStampa[i])){
        console.log(this.arrayStampa[i+1], 'è da spostare');
        if(this.arrayStampa[i].spazio.getDiagonalePrinc[2] <= this.arrayStampa[i+1].spazio.startX){
          // sposto verticalmente
        }
        this.arrayStampa[i+1].spazio.setStartY = this.arrayStampa[i].spazio.getPoints[3][1];
      }
      this.usedArea.push(this.arrayStampa[i].spazio);
      this.usedArea.forEach(area => {
        this.pdf.rect(area.getStartX, area.getStartY, area.getWidth, area.getHeigth);
      })
    }
    console.log('area occupata', this.usedArea);
    this.inizializzaGruppi();
  }
  
  inizializzaGruppi(){
    this.gruppi = new Gruppi;
    this.arrayStampa.forEach(el => {
      this.gruppi.inserisci(el.gruppo, el.spazio.getPoints[2][0], el.spazio.getPoints[2][1]);
    });
    console.log(this.gruppi);
    this.testDoc();
  }

  testDoc(){
    this.arrayStampa.forEach(el => {
      el.scrivi();   
    });
  // //disegno rettangoli per debug
  //   this.usedArea.forEach(a => {
  //     this.pdf.setDrawColor(100);
  //     console.log('area già occupata',a);
  //     this.pdf.rect(a.getStartX, a.getStartY, a.getWidth, a.getHeigth);
  //   });
  //   console.log('test scrittura documento ', this.pdf);
  }
}