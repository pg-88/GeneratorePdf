import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';
import { ChiamataDBService, template } from '../chiamata-db.service';
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
  
  public input = {
    nome: '',
    tipo: '',
    stile: {
      tema:'',
    },
  }
  private showPreview = false;

  
  public datiPagina!: PagDati; //configurazione della pagina
  public datiTesto!: PagDati;
  public datiTab!: TabDati; //dati per la creazione tabella
  

  public paginaConf!: PdfOption; //configurazione pagina estrapolata dai dati
  public paginaStile!: PdfStyle; //configurazioni stile estrapolata dai dati
  public tabellaOption!: autoTableOption; //opzioni per la creazione della tabella




  constructor(
    private doc: GeneraDocumentoService,
    //private conf: ConfigDocumentoService,
    // private dati: DatiDocumentoService,
    private dbRequest: ChiamataDBService,
  ) {}


  ngOnInit(){
    
    this.recuperaVisualizza()
  }

//############################input frontend###################################
  // //input nome setter
  // set nome(n:string){
  //   console.log('setter nome')
  //   this.input.nome = n;
  // }
  // //input nome getter
  // get nome(){
  //   return this.input.nome
  // }
  // //input nome eventHandler
  // changeName(e: any){
  //   const inNome: string = e.target.value;
  //   this.nome = (inNome === '' ?
  //  '' : 
  // (inNome[0].toLocaleUpperCase() + inNome.substring(1)));
  // }

  // //input tipo doc setter
  // set tipo(t:string){
  //   this.input.tipo = t;
  // }
  // //input tipo doc getter
  // get tipo(){
  //   return this.input.tipo;
  // }
  // //input tipo doc eventHandler
  // changeTipo(e: any){
  //   const tipoDoc = e.target.value;
  //   this.input.tipo = tipoDoc;
  // }
  // //input stile - tema setter
  // set tema(i: string){
  //   this.input.stile.tema = i;
  // }

  // //input stile - tema getter
  // get tema(){
  //   return this.input.stile.tema;
  // }

  // //input stile - tema change handler
  // changeTema(e: any){
  //   this.tema = e.target.value;
  // }

  // //preview -> true; mostra l'anteprima nella pagina false non 
  // set preview(yn: boolean){
  //   this.showPreview = yn;
  // }

  // get preview() {
  //   return this.showPreview;
  // }
//############################fine input frontend##############################


  recuperaVisualizza(){
    /**Lancia la chiamata al DB, quindi smista la risposta tra i vari servizi
     * per inizializzare le proprietà */
    //chiamata DB: 
    //passo nome, nome della chiave e valore
    this.dbRequest.templateParams = {
      templateName: 'Offerta',
      keyName: 'numPre',
      keyVal: 103
    }

    let template = this.dbRequest.templateDoc;
    this.doc.layoutDoc = this.dbRequest.templateDoc;

    let htmlObj: HTMLObjectElement = document.getElementsByTagName('object')[0]; 
    
    // htmlObj.data = this.doc.output()!
    htmlObj.data = this.doc.test()
  }

  generaDoc(t: template){
    /**Presi gli input dalla pagina, richiama il servizio Config
     * per generare gli oggetti di configurazione del documento */
    

  }

}