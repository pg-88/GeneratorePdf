import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfigDocumentoService, PdfOption } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';
import { GeometriaService, Layout } from './geometria.service';
import { template } from './chiamata-db.service';





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
  //oggetto geometria
  //private geom!: GeometriaService;//serve o mi basta un oggetto layout??
  private layout!: Layout;


  test(){
  
  this.doc.viewerPreferences({
    HideMenubar: true,
    HideToolbar: true,
    HideWindowUI: true,
    CenterWindow: true,
    FitWindow: true,
  }, true);

    return this.doc.output('datauristring');

  }
  
  parseTemplate(templateObj: template){
    /**Legge il template e man mano che estrapola info, richiama le fz per tracciare il doc */
    // let pagConf: PdfOption = {};
    // templateObj.forEach(el => {
    //   el.tipoCampo === 'pagina' ? 
    //     pagConf = {
    //       format: el.formato,
    //       orientation: el.orientamento
    //     }
    //     console.log('creaDoc', key, val);
    //   }
    // });
  }
  
  creaDoc(templateObj: template) {
    /** inizializza l'oggetto jsPDF che poi viene usato da tutti i metodi
     * 
     * args
     *  - configDoc: arriva dal servizio di configurazione del documento
     *    contiene i parametri per inizializzare jsPDF
     * 
     *  - template: stringa che identifica il tipo di documento da 
     *    generare, viene usata per istanziare un oggetto di Geomertia
     *    che definisce le aree del foglio da popolare. */
    
    this.doc = new jsPDF();
    this.doc.setProperties({
      title: 'test',
      subject: 'A jspdf-autotable example pdf ',
      author: 'EmilSoftware'
    });
    

    
  }
  
  private disegnaRettangoli(){
    /**Legge il layout e con i metodi contex2d di jsPDF disegna i rettangoli 
     * nelle aree predisposte per il layout */
  }
  
  titolo(){
    /**Aggiunge il titolo alla pagina */


  }

  logo(){

  }

  tabella(startY: number, dati: any) {
    /** crea tabella con autotable e la posiziona alla ordinata startY */
    autoTable(this.doc, dati)
  }

  piePagina(){


  }

  output(){
    /**genera il file del documento e lo può mostrare/scaricare/salvare come blob */
  }



}
