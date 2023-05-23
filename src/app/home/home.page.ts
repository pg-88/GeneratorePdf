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
  
  public input = {
    nome: '',
    tipo: '',
    stile: {
      tema:'',
    },
  }
  private showPreview = false;

  
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
  //input nome setter
  set nome(n:string){
    console.log('setter nome')
    this.input.nome = n;
  }
  //input nome getter
  get nome(){
    return this.input.nome
  }
  //input nome eventHandler
  changeName(e: any){
    const inNome: string = e.target.value;
    this.nome = (inNome === '' ? '' : (inNome[0].toLocaleUpperCase() + inNome.substring(1)));
  }

  //input tipo doc setter
  set tipo(t:string){
    this.input.tipo = t;
  }
  //input tipo doc getter
  get tipo(){
    return this.input.tipo;
  }
  //input tipo doc eventHandler
  changeTipo(e: any){
    const tipoDoc = e.target.value;
    this.input.tipo = tipoDoc;
  }
  //input stile - tema setter
  set tema(i: string){
    this.input.stile.tema = i;
  }

  //input stile - tema getter
  get tema(){
    return this.input.stile.tema;
  }

  //input stile - tema change handler
  changeTema(e: any){
    this.tema = e.target.value;
  }

  //preview -> true; mostra l'anteprima nella pagina false non 
  set preview(yn: boolean){
    this.showPreview = yn;
  }

  get preview() {
    return this.showPreview;
  }

  recuperaVisualizza(){
    /**Lancia la chiamata al DB, quindi smista la risposta tra i vari servizi
     * per inizializzare le proprietà */
    //chiamata DB
    this.dbRequest.richiestaDati(this.input.nome);
    const resConf = this.dbRequest.configRaw;
    const resDati = this.dbRequest.datiRaw;

    //filtro e assegno dati di config alle proprietà di questa classe
    this.conf.paginaConfig = resConf;
    this.paginaConf = this.conf.paginaConfig;
    
    this.conf.docStyle = resConf;
    this.paginaStile = this.conf.docStyle;

    this.conf.tabOption = resConf;
    this.tabellaOption = this.conf.tabOption;

        
    //filtro e assegno dati del contenuto doc alle proprietà di questa classe
    this.dati.intestazione = resDati;
    this.datiTesta = this.dati.intestazione;

    this.dati.tabella = resDati;
    this.datiTab = this.dati.tabella;

    this.dati.piepagina = resDati;
    this.datiPie = this.dati.piepagina;

    // console.log(
    //   'Dati documento:',
    //   this.datiTesta,
    //   this.datiTab,
    //   this.datiPie,
    // );
    // console.log(
    //   '\nDati Configurazione: ',
    //   this.paginaConf,
    //   this.paginaStile,
    //   this.tabellaOption
    // );

    this.preview = true;
  }

  generaDoc(){
    /**Presi gli input dalla pagina, richiama il servizio Config
     * per generare gli oggetti di configurazione del documento */
    let tmpl: string = this.input.tipo != '' ?
      this.input.tipo :
      this.dbRequest.configRaw.tipo.toLocaleLowerCase();
    
    this.doc.creaDoc(this.paginaConf, tmpl);
    this.doc.test()
    
  }

}