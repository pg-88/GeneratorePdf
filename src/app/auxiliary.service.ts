import { Injectable } from '@angular/core';
import { template } from './chiamata-db.service';
import { map } from 'rxjs';

//stringa esportata con export script su file
var sqlString = `2, PREVENTIVI1, orientamento, PAGE_ORIENTATION, NULL, NULL, NULL, NULL, NULL, NULL, NULL, P, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, A, NULL, NULL);
1, 'PREVENTIVI1', 'pagina', 'PAGE_FORMAT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A4', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A', NULL, NULL);
16, 'PREVENTIVI1', 'tabella', 'GRID', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
3, 'PREVENTIVI1', 'logo azienda', 'LOGO', 1, 'LOGO', NULL, 10, 10, 70, 15, 'logo.jpg', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
4, 'PREVENTIVI1', 'logo_intest_1', 'LABEL', 2, 'LOGO', NULL, 10, 5, NULL, NULL, 'Via delle Nazioni, 75 - 41122 MODENA', NULL, NULL, 'Arial', 8, NULL, NULL, 'left', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
5, 'PREVENTIVI1', 'logo_intest_2', 'LABEL', 3, 'LOGO', NULL, 10, 5, NULL, NULL, 'tel: 059-310386 Fax 059-314450', NULL, NULL, 'Arial', 8, NULL, NULL, 'left', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
6, 'PREVENTIVI1', 'logo_intest_3', 'LABEL', 4, 'LOGO', NULL, 10, 5, NULL, NULL, 'Cap.Soc. 10.400 i.v. R.E.A. Modena n. 309897', NULL, NULL, 'Arial', 8, NULL, NULL, 'left', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
7, 'PREVENTIVI1', 'logo_intest_4', 'LABEL', 5, 'LOGO', NULL, 10, 5, NULL, NULL, 'Reg.Imprese Modena - C.F. e P.IVA 02532170368', NULL, NULL, 'Arial', 8, NULL, NULL, 'left', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
8, 'PREVENTIVI1', 'intest_cli', 'LABEL', 6, 'CLIENTE', 'LOGO', 115, 18, NULL, NULL, 'Spett.le', NULL, NULL, 'Arial', 10, NULL, NULL, 'left', NULL, NULL, NULL, NULL, NULL, NULL, 'F', NULL, NULL);
9, 'PREVENTIVI1', 'cliente', 'FIELD', 7, 'CLIENTE', 'LOGO', 115, 4, 105, NULL, NULL, NULL, NULL, 'Arial', 10, 'bold', NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'RAGSOC1', 'SHRINK', 'F', NULL, NULL);
10, 'PREVENTIVI1', 'cliente2', 'FIELD', 8, 'CLIENTE', 'LOGO', 115, 4, 105, NULL, NULL, NULL, NULL, 'Arial', 10, 'bold', NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'RAGSOC2', 'SHRINK', 'F', NULL, NULL);
11, 'PREVENTIVI1', 'cliente_ind', 'FIELD', 9, 'CLIENTE', 'LOGO', 115, 5, 105, NULL, NULL, NULL, NULL, 'Arial', 10, NULL, NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'INDIRI', 'SHRINK', 'F', NULL, NULL);
12, 'PREVENTIVI1', 'cliente_locali', 'FIELD', 10, 'CLIENTE', 'LOGO', 115, 4, 105, NULL, NULL, NULL, NULL, 'Arial', 10, NULL, NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'CAP_LOCALI_PROVIN', 'SHRINK', 'F', NULL, NULL);
13, 'PREVENTIVI1', 'cliente_naz', 'FIELD', 11, 'CLIENTE', 'LOGO', 115, 4, 105, NULL, NULL, NULL, NULL, 'Arial', 10, NULL, NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'CLI_NAZ', 'SHRINK', 'F', NULL, NULL);
17, 'PREVENTIVI1', 'intest_cli2', 'LABEL', 12, 'CLI_FISC', 'LOGO', 15, 18, NULL, NULL, 'Rappr. fiscale di', NULL, NULL, 'Arial', 10, NULL, NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', NULL, NULL, 'F', 'RAGSOC3', '<>''''');
18, 'PREVENTIVI1', 'cliente3', 'FIELD', 13, 'CLI_FISC', 'LOGO', 15, 4, 105, NULL, NULL, NULL, NULL, 'Arial', 10, 'bold', NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'RAGSOC3', 'SHRINK', 'F', NULL, NULL);
19, 'PREVENTIVI1', 'cliente4', 'FIELD', 14, 'CLI_FISC', 'LOGO', 15, 4, 105, NULL, NULL, NULL, NULL, 'Arial', 10, 'bold', NULL, 'left', NULL, NULL, NULL, 'SQLPREVENTIVO', 'RAGSOC4', 'SHRINK', 'F', NULL, NULL);
14, 'PREVENTIVI1', 'intest', 'LABEL', 15, NULL, NULL, 105, 95, NULL, NULL, 'Preventivo cliente', NULL, NULL, 'Arial', 10, 'bold', NULL, 'center', NULL, NULL, NULL, NULL, NULL, NULL, 'F', NULL, NULL);
15, 'PREVENTIVI1', 'intest_line', 'CANVAS_LINE', 16, NULL, NULL, 10, 98, 190, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'F', NULL, NULL)`

const chiavi = `ID, TEMPLATENAME, FIELDDESCR, FIELDTYPE, FIELDORDER, GROUPBOX, GROUPRIF, POSX, POSY, WIDTH, HEIGHT, FIXVALUE, GRIDNAME, GRIDORDER, FONTNAME, FONTSIZE, FONTSTYLE, FONTCOLOR, FONTALIGN, BACKCOLOR, BORDER, BORDERCOLOR, RECORDSETNAME, FIELDNAME, FIELDSTYLE, REPEAT, COND_FIELD, COND_VALUE`;


@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  private fieldName: string[] = [];

  constructor() { }


  get fakeResponse(){
    let t: any = [];

    let righeArr = sqlString.split('\n');
    let valArr: string[][] = [];
    for(let i = 0; i< righeArr.length; i++){
      let r: string[] = [];
      righeArr[i].split(',').forEach(s => {
        s = s.replace('NULL);', '');
        s = s.replace('NULL', '')
        s = s.trim();
        r.push(s);
      });
      valArr.push(r);
    }
    let c = chiavi.split(',');
    let keyArr = [];
    
    for(let i = 0; i < c.length; i++){
      keyArr.push(c[i].trim());
    };

    for(let i = 0; i < valArr.length; i++){
      let target = new Object();
      for(let j = 0; j < valArr[i].length; j++){

        Object.defineProperty(target, keyArr[j], {
          value: valArr[i][j],
          enumerable: true,
          writable: true,
        })
      }
      t.push(target);
    }
    return t;
  }


}
