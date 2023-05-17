import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChiamataDBService {
  /**Si occuperà di interfacciarsi con il DB e smistare dati agli altri services*/
  
  //serviranno delle credenziali di accesso
  //forse sarà meglio metterle in environments

  constructor() { }

  get bolla(){

    return {};
  }

  get template(){

    return [];
  }
}


class MokupResponse{
  /**per testare il servizio,
   * usare promesis e async per simulare latenza server
   */
}