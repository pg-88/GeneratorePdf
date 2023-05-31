import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatiDocumentoService } from './dati-documento.service';





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

  //TO DO: 
  // - Class o interface per gestire le geometrie del documento

  constructor(

  ){};

  //oggetto jsPDF 
  private doc!: jsPDF;
  //oggetto geometria
  //private geom!: GeometriaService;//serve o mi basta un oggetto layout??


  test(){

    this.disegnaRettangoli();
    this.doc.setProperties({
      title: 'test',
      subject: 'A jspdf-autotable example pdf ',
  });

    return this.doc.output('datauristring');

  }

  private disegnaRettangoli(){
    /**Legge il layout e con i metodi contex2d di jsPDF disegna i rettangoli 
     * nelle aree predisposte per il layout */

    console.clear();
    // console.log('come si vede il layout da disegna rettangolo: ',this.layout);
    // Object.values(this.layout).forEach(section => {
    //   for(let field in section){
    //     console.log(field, section[`${field}`]?.dimensione);
    //     const geom = section[`${field}`]?.dimensione;
    //     let c = this.doc.canvas.getContext('2d');
    //     // let ctx = this.doc.context2d
    //     c.strokeStyle = "#FF9430";
    //     c.strokeRect(geom[0], geom[1], geom[2], geom[3]);
    //     c.fillStyle = '#990000';
    //     c.textAlign = 'center';
    //     c.font = '14px Arial'
    //     // c.fillText(
    //     //   field.toString(), 
    //     //   (geom[0] + geom[2]/3), (geom[1] + geom[3] / 2)
    //     // );
    //     if(field.toString() == 'tabella'){
          
    //     }
    //   }
    // });
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
    // this.geom.dimensioniPagna = this.doc;
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
