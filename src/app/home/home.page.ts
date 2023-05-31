import { Component } from '@angular/core';
import { GeometriaDocumentoService } from '../geometria-documento.service';
import { ChiamataDBService, template } from '../chiamata-db.service';
import { Campo, DatiDocumentoService } from '../dati-documento.service';
import { jsPDF, jsPDFOptions } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
// import { AuxiliaryService } from '../auxiliary.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /** */

  private modello!: any;
  private recordset!: any;

  private documento!: jsPDF;

  constructor(
    private geom: GeometriaDocumentoService,
    private dati: DatiDocumentoService,
    private dbRequest: ChiamataDBService,
    // private aux: AuxiliaryService
  ) {}


  async generaDoc(templateName: string){
    /**Chiamata al DB per recuperare i parametri per la generazione del documento.
     * Una volta ottenuta la risposta innesca a catena i metodi che portano alla
     * generazione del documento.*/

    let prom = Promise.resolve(this.dbRequest.recuperaDati(templateName));
    prom.then(temp => {
      this.modello = temp;
      this.elaboraModello();
    });
  }

  elaboraModello(){
    /**Inizializza elementList, che ordina e pulisce i dati, 
     * e defineGeom che pre imposta gli spazi delle pagine*/

    // console.log('elaborazione start', this.modello);
    this.dati.elementList = this.modello;
    let config = this.dati.arrayConfig;
    let optn: jsPDFOptions = {
      unit: 'mm', 
      compress: false,
    }
    config.forEach(el => {
      //assegno il formato del foglio se lo trovo
      el.fieldType == Campo.PAGE_FORMAT ? 
      (optn.format = el.fixValue?.toLocaleLowerCase()) :
      el.fieldType == 'PAGE_FORMAT' ? 
      optn.format = el.fixValue?.toLocaleLowerCase() : 
      optn.format = 'a4';

      // console.log(el.fieldType, typeof(el.fieldType), el.fixValue?.toLocaleLowerCase());

      el.fieldType == Campo.PAGE_ORIENTATION ?? 
      el.fixValue?.toLocaleLowerCase() == 'l' ? 
      //se il campo è 'L' o 'l' assegna 'l'
      optn.orientation = 'l' :
      //se è P, p o qualsiasi altra cosa, assegna 'p'
      optn.orientation = 'p';
    })
    
    //Genera oggetto jsPDF da passare a GeometriaDocumento
    this.documento = new jsPDF(optn);

  }
}