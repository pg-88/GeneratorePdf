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
   */

  //TO DO: 
  // - Class o interface per gestire le geometrie del documento

  constructor(
    private docConf: ConfigDocumentoService,
    private docDati: DatiDocumentoService,
    private geom: GeometriaService
  ){};

  //
  private doc!: jsPDF;
  
  test(){
    this.creaDoc();
    // //verifico che sia creata la variabile doc
    // console.log('page info pag1', this.doc.getPageInfo(1));
    console.log('obj jspdf', this.doc);
    // console.log('obj jspdf', this.doc.getFontList());
  
    //testo la classe Geometria
    this.geom.altezza = this.doc.internal.pageSize.height;
    this.geom.larghezza = this.doc.internal.pageSize.width;
    
    // console.log('top center', this.geom.topCenter);
    
    //provo a scrivere sul doc
    //this.doc.setFont('ZapfDingbats');
    this.doc.setFontSize(this.docConf.docStyle.titleSize ?? 21);
    this.doc.text("Hello World!", this.geom.topCenter.endX, this.geom.topCenter.endY/2);
  
    // this.doc.output('pdfobjectnewwindow');

    //Test tabella()
    let optn = this.tabella();
    autoTable(this.doc, optn);

    //output test
    this.doc.output('pdfobjectnewwindow');
  }


  creaDoc() {
    const optn: object = this.docConf.docConfig;
    // console.log('questo deve essere passato al jsPDF', optn);
    
    //inizializzo l'oggetto jsPDF:
    this.doc = new jsPDF(optn);
    //inizializzo l'oggetto geometria:
    //this.geom = new Geometria(this.doc.internal.pageSize.width, this.doc.internal.pageSize.height);
  }

  titolo(){
    /**Aggiunge il titolo alla pagina */


  }

  logo(){


  }

  tabella() {
    /**Genera l'oggetto UserOption da passare ad autoTable
     * Prende dai servizi docConfig e da docData, lo stile 
     * e i dati rispettivamente; quindi compone in un unico
     * oggetto.
    */
    let userOption: object = new Object();
    //Dati
     let data = {
      //Dati
      head: this.docDati.datiTabella.head,
      body: this.docDati.datiTabella.body,
      foot: this.docDati.datiTabella.foot,      
    };

    
    //Stile
    
    //Geometria
    let geom = {
      tableWidth: 100,
      margin: 5,
      startY: this.geom.topLeft.endY
    }
    
    Object.assign(userOption, data, this.docConf.tabOption, geom);
    
    return userOption;
  }

  piePagina(){


  }

  output(){

  }



}
