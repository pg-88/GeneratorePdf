import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';
import { ChiamataDBService, template } from '../chiamata-db.service';
import { ConfigDocumentoService, PdfOption, autoTableOption } from '../config-documento.service';
import { DatiDocumentoService } from '../dati-documento.service';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { AuxiliaryService } from '../auxiliary.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /**inserimento dati per la richiesta al DB, 
   * lancia la richiesta tramite il service dbRequest
   * visualizza sulla pagina il risultato della chiamata
   * permette di configurare qualche opzione di stile 
   * genera il pdf tramite GeneraDocumento service
   * 
   * Args
   *  - input: inizializzato con i campi di input della pagina
   *    (ognuno col suo setter e getter) vengono popolati man mano 
   *     che il form viene compilato dall'utente.
   * 
   *  - showPreview: booleano viene settato a true quando ci sono i dati
   *    da mostrare per la creazione del doc.
   * 
   *  - datiGrezzi: contiene i dati recuperati dal DB, utilizzato dal
   *    template per la preview
   */

  private modello!: any;
  private recordset!: any;


  private listaElementi!: any;
  private listaOggetti!: any;

  private documento!: jsPDF;




  constructor(
    private doc: GeneraDocumentoService,
    private conf: ConfigDocumentoService,
    private dati: DatiDocumentoService,
    private dbRequest: ChiamataDBService,
    private aux: AuxiliaryService
  ) {}


  async generaDoc(templateName: string){
    /**Presi gli input dalla pagina, richiama il servizio Config
     * per generare gli oggetti di configurazione del documento */
    // this.dbRequest.recuperaDati(templateName).then({});
    let prom = Promise.resolve(this.dbRequest.recuperaDati(templateName));
    prom.then(temp => {
      // console.log('promessa mantenuta: ', temp);
      this.modello = temp;

      this.elaboraModello();
    });
  }

  elaboraModello(){
    console.log('elaborazione start', this.modello);
    this.dati.elementList = this.modello;
  }

}