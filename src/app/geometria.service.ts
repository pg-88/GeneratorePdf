import { Injectable, createEnvironmentInjector } from '@angular/core';
import { jsPDF } from 'jspdf';


export type coord = [number, number]; 
type rect = [ x:number, y:number, width:number, height:number];
type pos = 'sx' | 'cent' | 'dx';

type sezionePag = {
  [nome: string]: {
    dimensione?: rect,
    posizione?: pos
  }
}

export interface Layout {
  intestazione?: sezionePag | sezionePag[]
  contenuto?: sezionePag | sezionePag[]
  piePag?: sezionePag | sezionePag[]
}

@Injectable({
  providedIn: 'root'
})

export class GeometriaService {
  /**Gestisce gli spazi della pagina 
   * Pagina strutturata in 3 zone principali:
   *  - intestazinone con titolo, logo (eventualmente altro testo)
   *  - contenuto, di norma tabella
   *  - pié pagina con info, testo, num pagina
   * 
   * viene utilizzato da genera documento per scrivere il pdf */
  private width!: number;
  private height!: number;
  layout!: Layout;

  constructor(
  ) { }

  //setter larghezza (richiede numero)
  set larghezza(w: number){
    this.width = w;
  }
  
  //setter altezza (richiede numero)
  set altezza(h: number){
    this.height = h;
  }

  //setter per larghezza e altezza prendendoli da jsPDF
  set dimensioniPagna(doc: jsPDF){
    /**assegna automaticamente altezza e larghezza leggendo proprietà di jsPDF
     * 
    */
    this.larghezza = doc.internal.pageSize.width;
    this.altezza = doc.internal.pageSize.height;
  }
}
