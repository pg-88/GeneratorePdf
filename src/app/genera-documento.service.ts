import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { autoTable, jsPDFConstructor } from 'jspdf-autotable';
import { ConfigDocumentoService } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';

@Injectable({
  providedIn: 'root'
})
export class GeneraDocumentoService {
  /**Crea l'oggetto jsPDF, configura il foglio e salva o esporta il file
   * 
   */
  doc!: jsPDF;
  nomeDoc: string = '';
  //optionPdf = {};

  constructor(
    private docConf: ConfigDocumentoService,
    private docDati: DatiDocumentoService,
  ){};

  setOption(){
    /**Ritorna l'oggetto da passare al costruttore di jsPDF
     * 
     */
    const conf = this.docConf.getDataConfig();
    this.nomeDoc = conf.nomeFile;

  }

  creaDoc(output: 'save' | 'pdfobjectnewwindow' = 'pdfobjectnewwindow'){
    /**genera il documento usando i parametri che arrivano da Config */
    //this.doc = new jsPDF()
    this.doc.output('pdfjsnewwindow', {filename: this.nomeDoc});
  }

}
