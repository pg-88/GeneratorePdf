import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfigDocumentoService } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';
import { GeometriaService } from './geometria.service';





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
    private geometria: GeometriaService
  ){};

  //oggetto jsPDF 
  private doc!: jsPDF;
  //oggetto geometria
  private geom!: GeometriaService;
  test(){
  }



  creaDoc(configDoc: any) {
    /** inizializza l'oggetto jsPDF che poi viene usato da tutti i metodi
     * 
     */
    this.doc = new jsPDF(configDoc);
    this.geom = new GeometriaService();
    this.geom.dimensioniPagna = this.doc;
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
