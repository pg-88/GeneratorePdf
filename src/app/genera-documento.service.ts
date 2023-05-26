import { Injectable } from '@angular/core';
import { jsPDF, jsPDFOptions } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfigDocumentoService, PdfOption } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';
import { GeometriaService, Layout } from './geometria.service';
import { elemento, template, campo } from './chiamata-db.service';





@Injectable({
  providedIn: 'root'
})
export class GeneraDocumentoService {
  /**Crea l'oggetto jsPDF, configura il foglio e salva o esporta il file
   * 
   * Viene richiamato dal component che crea il pdf (per ora home.page)
   * dal component che lo invoca gli saranno passati gli oggetti per 
   * inizializzare il documento(config doc), creare il layout (geometria),
   * inserire i dati e creare la tabella (dati doc).
   */

  //TO DO: 
  // - Class o interface per gestire le geometrie del documento

  constructor(

  ){};

  //oggetto jsPDF 
  private doc!: jsPDF;
  private layout!: template;

  private canvasElement: elemento[] = []; 
  //estrapolo prima i canvas per tracciarli per primi e non coprire altro (comprese immagini)

  private responseElement: elemento[] = [];
  //elementi che arrivano da una chiamata al recordset e hanno la proprietà response

  private fixElement: elemento[] = [];
  //elementi costanti in template che hanno la proprietà FIXEDVALUE

  private config: elemento[] = [];
  //elementi in template per inizializzare la pagina
  
  test(){
    this.doc.setFontSize(6);

    // console.log(this.doc.internal.scaleFactor);
    //  let c_xy = [
    //   this.doc.internal.pageSize.width/2, 
    //   10, 
    // ];
    // this.mira = c_xy;

    // this.doc.text(str, c_xy[0], c_xy[1], 
    // {
    //   align: 'center'
    // });

    // c_xy = [c_xy[0], c_xy[1]+10]
    // this.mira = [c_xy[0], c_xy[1]];

    // this.doc.text('allineamento sinistra', c_xy[0], c_xy[1], 
    // {
    //   align: 'left'
    // });

    // c_xy = [c_xy[0], c_xy[1]+10]
    // this.mira = [c_xy[0], c_xy[1]];

    // this.doc.text('allineamento destra', c_xy[0], c_xy[1], 
    // {
    //   align: 'right'
    // });

    // c_xy = [c_xy[0], c_xy[1]+10]
    // this.mira = [c_xy[0], c_xy[1]];

    // this.doc.text('allineamento giustificato', c_xy[0], c_xy[1], 
    // {
    //   align: 'justify'
    // });
///2.1166666666666663
    this.doc.setFont('times')
    console.log(this.doc.getFontList());

    //bozza che diventerà una classe
    let margin = 8;
    let yFreeSpace = this.doc.internal.pageSize.height - margin;

    for(let i = 0; i < this.doc.internal.pageSize.height; i += 2){
      this.doc.setCreationDate(new Date());
      let altezzaRiga = this.doc.getTextDimensions(`Riga numero: ${i+1};tipo font ${this.doc.getFont().fontName}; ${this.doc.getFontSize()}`).h;
      this.doc.text(`Riga numero: ${i+1};tipo font ${this.doc.getFont().fontName}; ${this.doc.getFontSize()}`, 0, i, {
        baseline: 'top'
      });
      console.log(this.doc.getTextDimensions(`Riga numero: ${i+1};tipo font ${this.doc.getFont().fontName}; ${this.doc.getFontSize()}`).h)
    }

    let riga = 0;
    while(yFreeSpace > 8){
      let textH = this.doc.getTextDimensions(`Riga numero: ${1};tipo font ${this.doc.getFont().fontName}; ${this.doc.getFontSize()}`).h
      const y = this.doc.internal.pageSize.height - yFreeSpace - textH;
      this.doc.text(`Riga numero: ${riga+1}`, margin, y);
      yFreeSpace -= textH;
      riga++;
      this.doc.setFontSize(this.doc.getFontSize()+1);
    }
    
    return this.doc.output('datauristring');
  }

  set layoutDoc(template: template){
    this.layout = template;
    this.parseTemplate();
  }

  set mira(coord: number[]){
    if(coord.length != 2){
      console.error('INPUT NON CONGRUENTE servono 2 numeri per un punto nel piano.');
    } else {
      const [x, y] = coord;
      this.doc.setDrawColor(100, 0, 0);
      this.doc.line(x, y+4, x, y-4);
      this.doc.line(x-4, y, x+4, y);
      this.doc.circle(x, y, 2);
      this.doc.setDrawColor(100);
    }
  }
  set miraLabel(coord: number[]){
    if(coord.length != 2){
      console.error('INPUT NON CONGRUENTE servono 2 numeri per un punto nel piano.');
    } else {
      const [x, y] = coord;
      this.doc.setDrawColor(100, 0, 0);
      this.doc.line(x, y+4, x, y-4);
      this.doc.line(x-4, y, x+4, y);
      this.doc.circle(x, y, 2);
      this.doc.setTextColor(100,0,3);
      this.doc.setFontSize(9);
      this.doc.text(`x:${x.toFixed(2)}; y:${y.toFixed(2)}`,x+3,y+1);
    }
  }
  
  parseTemplate(){
    /**Legge il template e man mano che estrapola info, richiama le fz per tracciare il doc */
    let elemArr = this.layout;
    elemArr?.forEach(el => {
      let campo = el.FIELDTYPE
    if(
      campo == 'CANVAS_BOX' ||
      campo ==  'CANVAS_LINE' ||
      campo == 'LOGO'){
        this.canvasElement.push(el);
      }
      else if(
        campo == 'PAGE_FORMAT' || 
        campo == 'PAGE_ORIENTATION'
        ) {
          this.config.push(el);
        }
      });
    this.creaDoc();
  }

  
  creaDoc() {
    /** inizializza l'oggetto jsPDF che poi viene usato da tutti i metodi
     * 
     * args
     *  - configDoc: arriva dal servizio di configurazione del documento
     *    contiene i parametri per inizializzare jsPDF
     * 
     *  - template: stringa che identifica il tipo di documento da 
     *    generare, viene usata per istanziare un oggetto di Geomertia
     *    che definisce le aree del foglio da popolare. */

    let pdfConf: jsPDFOptions = {};

    this.config.forEach(el =>{
      if(el.FIELDTYPE == 'PAGE_FORMAT') {
        //console.log('formato: ', el); 
        pdfConf.format = el.FIXVALUE
      } else if (el.FIELDTYPE == 'PAGE_ORIENTATION') {
        let val = el.FIXVALUE?.toLowerCase()
        //console.log('val',val);
        pdfConf.orientation = val == 'p' ? 'p' : val == 'l' ? 'l' : 'p'; //se input non accettato prende portrait
      }
    })

    //console.log('inizializzazione doc con configurazione di pag:', pdfConf);
  
    this.doc = new jsPDF(pdfConf);
    this.doc.setProperties({
      title: 'test',
      subject: 'A jspdf-autotable example pdf ',
      author: 'EmilSoftware'
    });
    //console.log('altezza: ', this.doc.internal.pageSize.height, 'larghezza: ', this.doc.internal.pageSize.width);

    this.disegnaCanvas();
    this.testiFissi(); 
    this.tabella();
  }
  
  private disegnaCanvas(){
    /**Legge il layout e con i metodi contex2d di jsPDF disegna i rettangoli 
     * nelle aree predisposte per il layout */
    let ctx = this.doc.canvas.getContext('2d');
    this.canvasElement.forEach(el => {
      el.FIELDTYPE == 'CANVAS_LINE' ??
        this.doc.line(el.POSX!, el.POSY!, el.POSX!, (el.POSY! + el.WIDTH!), 'F');

      el.FIELDTYPE == 'CANVAS_BOX' ?? 
        this.doc.rect(el.POSX!, el.POSY!, el.POSX! + el.HEIGHT!, el.POSY! + el.WIDTH!);

      el.FIELDTYPE == 'LOGO' ?? 
        this.doc.addImage(`src/assets/icon/${el.FIXVALUE!}`, el.FIXVALUE!.split('.')[1], el.POSX!, el.POSY!, el.WIDTH!, el.HEIGHT!)
    });


  }
  
  private testiFissi(){
    /**Aggiunge campi testuali alla pagina */
    let elementiTxt = this.fixElement
    console.log(elementiTxt);
  }

  private testiRecordSet(){
    /**aggiunge i campi arrivati dal recordset */
  
  }

  private tabella() {
    /** crea tabella con autotable e la posiziona alla ordinata startY */

  }

  output(fileName?: string){
    /**genera il file del documento e lo può mostrare/scaricare/salvare come blob */
    let pdfUri = this.doc.output('datauristring');
    fileName != '' ?? this.doc.save(fileName);

    return pdfUri;
  }



}
