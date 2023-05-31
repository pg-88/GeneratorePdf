import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ParametriElemento } from './dati-documento.service';

export type Coord = [x: number, y: number];
export type Area = [initialX: number, initialY: number, width: number, height: number];


@Injectable({
  providedIn: 'root'
})
export class GeometriaDocumentoService {
  /**Crea l'oggetto jsPDF, configura il foglio e salva o esporta il file
   * 
   * Viene richiamato dal component che crea il pdf (per ora home.page)
   * dal component che lo invoca gli saranno passati gli oggetti per 
   * inizializzare il documento(config doc), creare il layout (geometria),
   * inserire i dati e creare la tabella (dati doc).
   */

  private freeArea: Area = [0,0,0,0];
  private arrayStampa: ParametriElemento[] = [];
  
  //distanza minima dal bordo del foglio per tutti gli elementi
  MARGIN_H = 10;
  MARGIN_W = 10;

  constructor(){}

  set pagArea(doc: jsPDF){
    const w = (doc.internal.pageSize.width - this.MARGIN_W).toPrecision(5);
    const h = (doc.internal.pageSize.height - this.MARGIN_H).toPrecision(5);
    this.freeArea = [this.MARGIN_W, this.MARGIN_H, Number(w), Number(h)];
  }

  set listaStampa(lst: ParametriElemento[]){
    this.arrayStampa
  }




}
