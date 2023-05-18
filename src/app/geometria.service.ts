import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';


type rect = [ x:number, y:number, width:number, height:number];
type pos = 'sx' | 'cent' | 'dx';

type sezionePag = {
  [nome: string]: {
    dimensione?: rect,
    posizione?: pos
  }
}

export interface Layout {
  intestazione: sezionePag | sezionePag[]
  contenuto: sezionePag | sezionePag[]
  piePag: sezionePag | sezionePag[]
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
   */
  private width!: number;
  private height!: number;
  layout!: Layout;

  constructor(
  ) { }

  set larghezza(w: number){
    this.width = w;
  }
  
  set altezza(h: number){
    this.height = h;
  }

  set dimensioniPagna(doc: jsPDF){
    /**assegna automaticamente altezza e larghezza leggendo proprietà di jsPDF
     * 
    */
    this.larghezza = doc.internal.pageSize.width;
    this.altezza = doc.internal.pageSize.height;
  }

  // set layoutPagina(){
  //   /**inizializza o modifica il layout pagina
  //    * 
  //    */
  //   console.log(this.request.template);
  // }


  get topLeft() {
    return{
      startX: 0,
      startY: 0,
      endX: (this.width / 3),
      endY: (this.height / 3)
    }
  }

  get topCenter(){
    let tc = this.topLeft;
    tc.startX = tc.endX;
    tc.endX = tc.startX + (this.width / 3);
    return tc;
  }
  
  get topRight(){
    let tr = this.topCenter;
    tr.startX = tr.endX;
    tr.endX = this.width;
    return tr;
  }
}
