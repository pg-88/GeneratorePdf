import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfigDocumentoService } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';
import { GeometriaService, Layout } from './geometria.service';





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

    this.disegnaRettangoli()
    //this.doc.output('pdfobjectnewwindow', {filename: 'testing.pdf'})
  }

  private disegnaRettangoli(){
    /**Legge il layout e con i metodi contex2d di jsPDF disegna i rettangoli 
     * nelle aree predisposte per il layout */

    console.clear();
    // console.log('come si vede il layout da disegna rettangolo: ',this.layout);
    Object.values(this.layout).forEach(section => {
      for(let field in section){
        console.log(field, section[`${field}`]?.dimensione);
        this.doc.context2d
      }
    });
  }


  creaDoc(configDoc: any, template: string) {
    /** inizializza l'oggetto jsPDF che poi viene usato da tutti i metodi
     * 
     * args
     *  - configDoc: arriva dal servizio di configurazione del documento
     *    contiene i parametri per inizializzare jsPDF
     * 
     *  - template: stringa che identifica il tipo di documento da 
     *    generare, viene usata per istanziare un oggetto di Geomertia
     *    che definisce le aree del foglio da popolare. */
    
    this.doc = new jsPDF(configDoc);
    let geom = new GeometriaService();
    // this.geom.dimensioniPagna = this.doc;
    switch (template){
      case 'ddt':
        this.layout = geom.bollaTrasporto(this.doc);
        break;
      default:
        console.log('default')
        break;
    }
  }

  titolo(){
    /**Aggiunge il titolo alla pagina */


  }

  logo(){

  }

  tabella() {

  }

  piePagina(){


  }

  output(){

  }



}
