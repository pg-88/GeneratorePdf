import { Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ChiamataDBService, elemento, template } from './chiamata-db.service';
import { GeometriaService, coord } from './geometria.service';

export interface OrdineElemento {
    'index': number,
    'element': elemento
};

export type ElementiLista = OrdineElemento[];

@Injectable({
  providedIn: 'root'
})

export class DatiDocumentoService {
  /** */

  private paginaConfig: any = [];
  private arrayDati!: any;

  constructor() { }

  pagFormat(e: elemento){
    
  }

  pagOrientation(e: elemento){

  }

  // set inputDati(observedData: template){
  //   let tmpPag: any[] = [];
  //   for(const [key, val] of Object.entries(observedData)){
  //     //da sistemare quando arriva il backend
  //     val.FIELDTYPE.toString() == `'PAGE_FORMAT'` ? 
  //     this.pagFormat(val) :
  //     val.FIELDTYPE.toString() == 'PAGE_ORIENTATION' ??
  //     this.pagOrientation(val);
  //   }

  // }

  get elmentList(){
    return this.arrayDati;
  }

  generaLista(tem: template){
    let lista: ElementiLista = [];
    // console.log('generazione lista', tem);
    for(const i in tem){
      if(tem[i].FIELDORDER != null){
        console.log(tem[i], tem[i].FIELDORDER);
        lista.push({
          'index': tem[i].FIELDORDER, 
          'element': tem[i]
        });
      }
    };
    console.log(lista);
    return lista;
  }
}
