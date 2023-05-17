import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfigDocumentoService } from './config-documento.service';
import { DatiDocumentoService } from './dati-documento.service';
import { outputAst } from '@angular/compiler';


class Geometria {
  private width: number
  private height: number

  constructor(larghezza?: number, altezza?: number){
    this.height = altezza ?? 1;
    this.width = larghezza ?? 1;
  }

  set larghezza(w: number){
    this.width = w;
  }
  
  set altezza(h: number){
    this.height = h;
  }

  get topLeft() {
    return{
      startX: 0,
      startY: 0,
      endX: (this.width / 3),
      endY: (this.height / 3)
    }
  }

  get topCenter(){
    let tc = this.topLeft;
    tc.startX = tc.endX;
    tc.endX = tc.startX + (this.width / 3);
    return tc;
  }
  
  get topRight(){
    let tr = this.topCenter;
    tr.startX = tr.endX;
    tr.endX = this.width;
    return tr;
  }
}

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
  ){
    this.geom = new Geometria();
  };

  private doc!: jsPDF;
  private geom: Geometria;
  
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

    //configurazione documento
    const tabOption: object = this.docDati.datiTabella;

    autoTable(this.doc, {
      //N.B. head e foot vanno passati come array di array
      //anke se di fatto sono monodimensionali
      head: [Object.values(tabOption)[0]],
      foot: [Object.values(tabOption)[2]],
      body: Object.values(tabOption)[1],
      startY: this.geom.topLeft.endY
    });

    //output test
    this.doc.output('pdfobjectnewwindow');



  }


  creaDoc() {
    const optn: object = this.docConf.docConfig;
    // console.log('questo deve essere passato al jsPDF', optn);

    this.doc = new jsPDF(optn);


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
