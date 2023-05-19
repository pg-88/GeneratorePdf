import { Component } from '@angular/core';
import { GeneraDocumentoService } from '../genera-documento.service';
import { ChiamataDBService } from '../chiamata-db.service';


type templates = 'ddt' | 'fattura' | 'altro'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  input = {
    nome: '',
    tipo: '',
    stile: {
      tema:'',
    },

  }

  constructor(
    private doc: GeneraDocumentoService,
    private dbRequest: ChiamataDBService,
  ) {}

  set nome(n:string){
    console.log('setter nome')
    this.input.nome = n;
  }
  get nome(){
    return this.input.nome
  }

  changeName(e: any){
    const inNome: string = e.target.value;
    this.nome = (inNome === '' ? '' : (inNome[0].toLocaleUpperCase() + inNome.substring(1)));
  }

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
    console.log('Questo evento: ', e.detail);
    console.log(this.input.nome);
  }

  mostraInput(){
    console.log(this.input);
  }
}