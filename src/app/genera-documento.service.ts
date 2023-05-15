import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { autoTable, jsPDFConstructor } from 'jspdf-autotable';
import { ConfigDoc, ConfigDocumentoService } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';

@Injectable({
  providedIn: 'root'
})
export class GeneraDocumentoService {
  /**Crea l'oggetto jsPDF, configura il foglio e salva o esporta il file
   * 
   */

  //TO DO: 
  // - Class o interface per gestire le geometrie del documento

  constructor(
    private docConf: ConfigDocumentoService,
    private docDati: DatiDocumentoService,
  ){};

  creaDoc(){
    const conf = this.docConf.getDataConfig();
    const dati = this.docDati.getDati();
    
    let doc = (conf.init != null ? new jsPDF(conf.init) : new jsPDF());

    //console.log(doc);
    console.log(Object.keys(conf), Object.values(conf));
    console.log(Object.keys(dati), Object.values(dati));
    console.log('page info',doc.getPageInfo(1));
    console.log('Font', doc.getFontList());

    //inserire titolo pagina
    doc.setFont('Times');
    
    doc.text(dati.pagina.intestazione.titolo,10 ,10)

    //generare il pdf e mostra in nuova tab
    //doc.output('pdfobjectnewwindow', {filename: conf.page?.nomeFile});
    console.log(conf.page?.nomeFile);
    const n: string = (conf.page?.nomeFile != undefined ? conf.page?.nomeFile : 'Documento.pdf');
    doc.output('pdfobjectnewwindow');
  }
}
