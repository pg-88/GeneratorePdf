import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TemplateHtmlService {

  private root: HTMLDivElement;
  constructor() { 
    this.root = document.createElement('div');
  }

  
}
