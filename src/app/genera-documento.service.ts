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
  this.doc.viewerPreferences({
    HideMenubar: true,
    HideToolbar: true,
    HideWindowUI: true,
    CenterWindow: true,
    FitWindow: true,
  }, false);

    return this.doc.output('datauristring');

  }

  set layoutDoc(template: template){
    this.layout = template;
    this.parseTemplate();
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
        console.log(el)  
        this.canvasElement.push(el)
      }
      else if(
        campo == 'PAGE_FORMAT' || 
        campo == 'PAGE_ORIENTATION'
        ) {
          this.config.push(el);
        }
      });
    this.creaDoc()
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
    console.clear()
    let pdfConf: jsPDFOptions = {};

    this.config.forEach(el =>{
      if(el.FIELDTYPE == 'PAGE_FORMAT') {
        console.log('formato: ', el); 
        pdfConf.format = el.FIXVALUE
      } else if (el.FIELDTYPE == 'PAGE_ORIENTATION') {
        let val = el.FIXVALUE?.toLowerCase()
        console.log('val',val);
        pdfConf.orientation = val == 'p' ? 'p' : val == 'l' ? 'l' : 'p'; //se input non accettato prende portrait
      }
    })

    console.log('inizializzazione doc con configurazione di pag:', pdfConf);
  
    this.doc = new jsPDF(pdfConf);
    this.doc.setProperties({
      title: 'test',
      subject: 'A jspdf-autotable example pdf ',
      author: 'EmilSoftware'
    });
    console.log('altezza: ', this.doc.internal.pageSize.height, 'larghezza: ', this.doc.internal.pageSize.width);

    this.disegnaCanvas();
    this.testiFissi(); 
    this.tabella();
  }
  
  private disegnaCanvas(){
    /**Legge il layout e con i metodi contex2d di jsPDF disegna i rettangoli 
     * nelle aree predisposte per il layout */
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

  output(){
    /**genera il file del documento e lo può mostrare/scaricare/salvare come blob */
  }



}
