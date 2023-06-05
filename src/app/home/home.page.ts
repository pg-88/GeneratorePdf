import { Component } from '@angular/core';
import { GeometriaDocumentoService } from '../geometria-documento.service';
import { DatiDocumentoService } from '../dati-documento.service';
import { jsPDF, jsPDFOptions } from 'jspdf';
import { autoTable } from 'jspdf-autotable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /** */

  private modello!: any;
  private documento!: jsPDF;

  constructor(
    private geom: GeometriaDocumentoService,
    private dati: DatiDocumentoService,
    // private aux: AuxiliaryService
  ) {}


  async generaDoc(templateName: string){
    /**Chiamata al DB per recuperare i parametri per la generazione del documento.
     * Una volta ottenuta la risposta innesca a catena i metodi che portano alla
     * generazione del documento.*/

    this.dati.recuperaDati(templateName).then(async temp => {
      this.modello = temp;
      this.elaboraModello();
    });
  }

  elaboraModello(){
    /**Inizializza elementList, che ordina e pulisce i dati, 
     * e defineGeom che pre imposta gli spazi delle pagine*/

    // console.log('elaborazione start', this.modello);

    this.dati.setElementList = this.modello;
    let optn: jsPDFOptions = {}
    
    this.dati.arrayConfig.forEach(el => {
      //assegno il formato del foglio se lo trovo
      if(el.fieldType == "PAGE_FORMAT") {
        optn.format = el.fixValue?.toLowerCase();
      }
      //assegno l'orientamento pagina se lo trovo
      if(el.fieldType == 'PAGE_ORIENTATION'){
        optn.orientation = el.fixValue?.toLowerCase() == 'l' ? 'landscape': 'portrait';
      }
    });

    //Genera oggetto jsPDF da passare a GeometriaDocumento
    this.documento = new jsPDF(optn);
    this.ottimizazionePagina()
  }
  
  ottimizazionePagina(){
    /**Rimanda a GeometriaDocumento l'oggetto di jsPDF e l'array degli elementi
     * da stampare */

    console.log('roba da stampare: ',this.dati.arrayStampa);
    this.geom.setPagArea = this.documento;
    this.geom.setListaStampa = this.dati.arrayStampa; 
    //###########################test documento#################
    console.log(this.documento.output('datauristring'));
    //##########################################################
  }
}