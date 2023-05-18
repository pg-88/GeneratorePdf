import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selezioneTema: string = '';

  constructor(
    private doc: GeneraDocumentoService
  ) {}

  mostraPdf(){
    /**Chiama la creazione del documento nel servizio
     * mostra il doc creato in una finestra 
     */
    this.doc.creaDoc();
  }

  generaTest(){
    this.doc.test();
  }

  onInput(e: any){
    console.log('Input è successo un ionInput!!!', e);
  }
  onChange(e: any){
    console.log('Change è successo un ionChange!!!', e);
    console.log(e.detail?.value);
  }
}
