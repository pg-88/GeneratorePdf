import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private doc: GeneraDocumentoService
  ) {}

  mostraPdf(){
    /**Chiama la creazione del documento nel servizio
     * mostra il doc creato in una finestra 
     */
    this.doc.test();
  }
}
