import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';
import { ChiamataDBService } from '../chiamata-db.service';
import { ConfigDocumentoService, PdfOption, PdfStyle, autoTableOption } from '../config-documento.service';
import { DatiDocumentoService, PagDati, TabDati } from '../dati-documento.service';
import { autoTable } from 'jspdf-autotable';


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

  public datiTesta!: PagDati; //dati filtrati per l'intestazione del documento
  public datiTab!: TabDati; //dati filtrati per il corpo del documento (tabella)
  public datiPie!: PagDati; //dati filtrati per il piede del documento

  public paginaConf!: PdfOption; //configurazione pagina estrapolata dai dati
  public paginaStile!: PdfStyle; //configurazioni stile estrapolata dai dati
  public tabellaOption!: autoTableOption; //opzioni per la creazione della tabella




  constructor(
    private doc: GeneraDocumentoService,
    private conf: ConfigDocumentoService,
    private dati: DatiDocumentoService,
    private dbRequest: ChiamataDBService,
  ) {}



  generaDoc(){
    /**Presi gli input dalla pagina, richiama il servizio Config
     * per generare gli oggetti di configurazione del documento */
    let tmpl: string = this.dbRequest.configRaw.tipo.toLocaleLowerCase();
    
    this.doc.creaDoc(this.paginaConf, tmpl);

    let obj: HTMLObjectElement = document.getElementsByTagName('object')[0];
    obj.data = this.doc.test();
    console.log('location hash', obj)
  }

}