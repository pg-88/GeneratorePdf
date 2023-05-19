import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';
import { ChiamataDBService } from '../chiamata-db.service';


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
   *  - showError: booleano viene settato a true quando arriva una risposta
   *    non corretta e non è possibile richiamare i dati.
   * 
   *  -  
   */
  
  input = {
    nome: '',
    tipo: '',
    stile: {
      tema:'',
    },
  }

  showPreview = false;

  datiGrezzi!: any[];

  constructor(
    private doc: GeneraDocumentoService,
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

  //
  set preview(yn: boolean){
    this.showPreview = yn;
  }

  get preview() {
    return this.showPreview;
  }

  recuperaVisualizza(){
    /**Lancia la chiamata al db e fa una prima elaborazione dati per visualizzarli 
     * sulla pagina
     * ##TO DO## 
     * sistemare quando abbiamo la struttura dati in arrivo dal DB.
    */
    console.log('da passare a Chiamata DB: ',this.input.nome, this.input.tipo);
    this.dbRequest.richiestaDati(this.input.nome, {documento: this.input.tipo});

    console.log('dati grezzi dalla chiamata db:',this.dbRequest.datiRaw);
    console.log(Object.keys(this.dbRequest.datiRaw).length != 0 ? `trovati i dati: ${this.dbRequest.datiRaw}` : 'niente')
  
    if(Object.keys(this.dbRequest.datiRaw).length != 0)//controlla se l'oggetto datiRaw è popolato
    {
      this.preview = true;
      this.datiGrezzi = Object.entries(this.dbRequest.datiRaw);
      console.log(this.datiGrezzi)
    } else this.preview = false;
  }

  generaConfig(){
    /**Presi gli input dalla pagina, richiama il servizio Config
     * per generare gli oggetti di configurazione del documento 
    */


  }
}