# Generatore PDF 

Componente che genera un pdf a partire da dati presi da un DB o servizio esterno.

## Come funziona

Dal componente, in questo caso [home](./src/app/home/home.page.ts) (l'unico), viene lanciata la chiamata al database, gestita da [ChiamataDBService](./src/app/chiamata-db.service.ts). I dati che arrivano dal DB vengono smistati da due servizi uno si occupa del contenuto del documento, l'altro delle configurazioni.

I servizi sono [DatiDocumentoService](./src/app/dati-documento.service.ts) e [ConfigDocumentoService](./src/app/config-documento.service.ts), sono due perché le chiamate saranno due a due diversi DB.

Una volta sistemati i contenuti e le opzioni di configurazione del documento, viene chiamato [GeneraDocumentoService](./src/app/genera-documento.service.ts) che inizializza l'oggetto [jsPDF](https://artskydj.github.io/jsPDF/docs/index.html) e inizia a popolarlo con testi, loghi e tabelle (generate con [autoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)).

*Ci sarà la possibilità di modificare alcune impostazioni di configurazione del documento, da frontend [home template](./src/app/home/home.page.html), di vedere una sorta di anteprima dei dati, quindi (con un bottone) lanciare la genrazione (o salvataggio) del file pdf.*

L'idea di fondo è quella di far confluire tutti i servizi e i dati nel componente che genera il pdf (in questo caso è home).

## [Chiamata DB](./src/app/chiamata-db.service.ts)


## [Dati Doc Service](./src/app/dati-documento.service.ts)



## [Dati Config Service](./src/app/config-documento.service.ts)


## [Genera Doc Service](./src/app/genera-documento.service.ts)

