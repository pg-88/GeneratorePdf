import { Injectable } from '@angular/core';
import { GeometriaService, Layout } from './geometria.service';
import { DatiDocumentoService, PagDati } from './dati-documento.service';
import { ConfigDocumentoService } from './config-documento.service';

@Injectable({
  providedIn: 'root'
})

export class ChiamataDBService {
  /**Si occuperà di interfacciarsi con il DB e smistare dati agli altri services*/
  
  //serviranno delle credenziali di accesso
  //forse sarà meglio metterle in environments

  constructor() { }


  private risposta!: object;

  richiestaDati(nome: string, info?: object){
    //chiamata al DB la risposta viene mandata alla proprietà risposta
    //console.log(`Parte chiamata al server con parametri: ${nome} e ${Object.entries(info ?? {})}`)
    const r = {status: 'ok'}//status: 'ok' per simulare risposta avvenuta correttamente
    r.status == 'ok' ? this.risposta = r : this.risposta = {Errore: 'errore tipo..'}    
  }

  get datiRaw(){
    //elabora la risposta e restituisce dati per il doc
    let elaboratedResponse: object = {}
    if(this.risposta.hasOwnProperty('Errore')){
      console.error('Qualcosa è andato storto!');
    }else {
      elaboratedResponse = {
        cliente: {
          id: 0,
          nome: "Pippo", 
          pIva: 39898559054,
          logo: 'https://ih1.redbubble.net/image.424611934.8062/st,small,507x507-pad,600x600,f8f8f8.jpg'
        },
        voci: [
          {
            prodotto: "wd40",
            quantita: 300,
            importo: 600
          },
          {
            prodotto: "parrucche",
            quantita: 6,
            importo: 80
          },
        ]
      };
    }
    return elaboratedResponse;
  };

  get configRaw(){
    //elabora la risposta e restituisce le configurazioni documento
    //prima scrematura dei dati, poi c'è config documento che 
    //si occupa di rendere totalmente digeribili i dati a genera documento

    const response = {
      tipo: 'DDT',
      data: '13/06/2022',
      font: 'arial',
      fontSize: 14,
      titleSize: 24,
      stileTabella: 'striped',
      headerColor: 'lightgreen',
    };

    return response;
  };


}