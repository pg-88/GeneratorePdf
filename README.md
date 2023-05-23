# Generatore PDF 

Componente che genera un pdf a partire da dati presi da un DB o servizio esterno.

## Come funziona

Dal componente, in questo caso [home](./src/app/home/home.page.ts) (l'unico), viene lanciata la chiamata al database, gestita da [ChiamataDBService](./src/app/chiamata-db.service.ts). I dati che arrivano dal DB vengono smistati da due servizi uno si occupa del contenuto del documento, l'altro delle configurazioni.

I servizi sono [DatiDocumentoService](./src/app/dati-documento.service.ts) e [ConfigDocumentoService](./src/app/config-documento.service.ts), sono due perché le chiamate saranno due a due diversi DB.

Una volta sistemati i contenuti e le opzioni di configurazione del documento, viene chiamato [GeneraDocumentoService](./src/app/genera-documento.service.ts) che inizializza l'oggetto [jsPDF](https://artskydj.github.io/jsPDF/docs/index.html) e inizia a popolarlo con testi, loghi e tabelle (generate con [autoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)).

Ci sarà la possibilità di modificare alcune impostazioni di configurazione del documento, da frontend [home template](./src/app/home/home.page.html), di vedere una sorta di anteprima dei dati, quindi (con un bottone) lanciare la genrazione (o salvataggio) del file pdf.

L'idea di fondo è quella di far confluire tutti i servizi e i dati nel componente che genera il pdf (in questo caso è home).

## [Chiamata DB](./src/app/chiamata-db.service.ts)
*solo abbozzato al momento*

Si chiama prima di tutto richiestaDati che si occuperà di interfacciarsi con il DB e recuperare i dati.
Quindi con i metodi get si possono ottenere i dati da inserire nel documento e i dati di configurazione.

Questo servizio viene usato dal metodo `recuperaVisualizza` del component home.

## [Dati Doc Service](./src/app/dati-documento.service.ts)

La funzione di [DatiDocumentoService](./src/app/dati-documento.service.ts) è quella di prendere i dati in arrivo dal DB e renderli digeribili alle librerie esterne che gestiranno la creazione del documento.

Di fatto ci sono tre proprietà che conterranno i dati di frontespizio, contenuto principale (tabella) e piè pagina. Ognuna ha un setter e un getter.

*I metodi setter al momento sono incompleti in quanto manca la struttura dati*.

Questo servizio viene invocato dal componente che genera il documento nel metodo `recuperaVisualizza`.

## [Dati Config Service](./src/app/config-documento.service.ts)

Come struttura molto simile a Dati Doc service, crea degli oggetti da passare a jsPDF e autoTable 

*I metodi setter al momento sono incompleti in quanto manca la struttura dati*.

Questo servizio viene invocato dal componente che genera il documento nel metodo `recuperaVisualizza`.

## [Genera Doc Service](./src/app/genera-documento.service.ts)

*incompleto al momento. In fase di test e completameto dei metodi*

Questo è il servizio che genera l'oggetto jsPDF e autoTable, il metodo principale è `creaDoc` che inizializza la proprietà `doc` di tipo jsPDF e un oggetto Geometria che inizializza la proprietà layout in funzione del nome template passato al metodo.

Gli altri metodi vengono chiamati sulla base di layout per generare e inserire i vari pezzi del documento.

Questo servizio viene invocato dal componente che genera il documento nel metodo `generaDoc`.

## [Geometria Servce](./src/app/geometria.service.ts)

Servizio che permette di suddividere la pagina in zone da sfruttare per definire i layout. Ogni tipo documento avrà un suo layout e nel servizio ci sarà un metodo get per ogni tipo di documento.

Questo servizio viene utilizzato da Genera Doc Service.