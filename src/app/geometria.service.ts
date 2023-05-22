import { Injectable, createEnvironmentInjector } from '@angular/core';
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

  bollaTrasporto(doc: jsPDF): Layout{
    /**ritorna un layout da utilizzare nel component per creare il doc*/
    this.dimensioniPagna = doc;
    let ddt: Layout = {
      intestazione:{
        logo: {
          dimensione: [
            this.topRight.startX, 
            this.topRight.startY, 
            this.larghezza/3, 
            this.altezza/3],
          posizione: 'dx'
        },
        titolo: {
          dimensione: [
            0, 0, this.topLeft.endX * 2, this.topLeft.endY
          ],
          posizione: 'cent'
        },
      },
      contenuto: {
        tabella: {
          dimensione: [
            0, this.topLeft.endY, this.larghezza, this.altezza/2
          ],
          posizione: 'cent',
        }
      }
    }
    return ddt
  }
}
