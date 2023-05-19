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

  constructor(
    private dati: DatiDocumentoService,
    private config: ConfigDocumentoService,
    private geom: GeometriaService,
  ) { }
  
  //inizializzo con dei campi inventati per testare i service
  // private configurazione: object;

  //inizializzo con campi inventati per testare i service
  //private contenuti: object = this.datiDocumento;

  get datiRaw(){
    //chiama DB per scaricare i dati da inserire nel documento
    const response = {
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
    return response;
  };

  get configRaw(){
    //chiama DB per scaricare le configurazioni documento
    const response = {
      tipo: 'DDT',
      data: '13/06/2022',
      font: 'arial',
      fontSize: 14,
      titleSize:24,
      stileTabella: 'striped',
      headerColor: 'lightgreen',
    };

    return response;
  };

  datiDocumento(){
    const raw = this.datiRaw;
    let d: PagDati = {
      logo: raw.cliente.logo,
      titolo: `${raw.cliente.nome.toLocaleUpperCase()} ${this.configRaw.tipo} del ${this.configRaw.data}`,

    }
    this.dati.intestazione = d;//assegna la variabile intestazione in dati service
  }
}