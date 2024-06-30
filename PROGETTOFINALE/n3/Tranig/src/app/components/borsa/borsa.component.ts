// import { HttpClient } from '@angular/common/http';
// import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
// import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Chart, ScriptableContext, ScriptableLineSegmentContext, ChartData, registerables } from 'chart.js';
// import { environment } from 'src/app/environment/environment.development';
// import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
// import { LogoDto } from 'src/app/interface/logo-dto.interface';
// import { QuoteBorse } from 'src/app/interface/quote-borse.interface';
// import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
// import { StockList } from 'src/app/interface/stock-list.interface';
// import { TimeSeries } from 'src/app/interface/time-series-data.interface';
// import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
// // import { QuoteBorseService } from 'src/app/service/quote-borse.service';
// import { RealTimePriceService } from 'src/app/service/real-time-price.service';
// import { StockListService } from 'src/app/service/stock-list.service';
// import { TimeSeriesBorseService } from 'src/app/service/time-series-borse.service';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import { QuoteBorseService } from 'src/app/service/quote-borse.service';
// import { TransactionService } from 'src/app/service/transaction.service';
// import { AuthService } from 'src/app/service/auth.service';
// import { TransactionRequest } from 'src/app/interface/transaction-request.interface';
// import { User } from 'src/app/interface/user.interface';
// import { Stock } from 'src/app/interface/stock.interface';
// import { ProfiloService } from 'src/app/service/profilo.service';



// @Component({
//   selector: 'app-borsa',
//   templateUrl: './borsa.component.html',
//   styleUrls: ['./borsa.component.scss']
// })
// export class BorsaComponent implements OnInit {
// //   @Output() favoriteToggled = new EventEmitter<any>();
// //   @Input() favorites: any[] = [];
// //   selectedInterval: string = '1day'; // Intervallo selezionato
// //   interval: string = '1day'; // Impostazione di default
// //   logoUrl: string | undefined;
// //   symbol: string = "AMZN";// Impostazione di default
// //   stocks: StockList[] = []; //lista per popolare la lista del form sui nomi dey symbol 
// //   // exchange: string ="NASDAQ";
// //   searchTerm: string = ''; // Variabile per memorizzare il termine di ricerca
// //   filteredStocks: StockList[] = []; // Lista di azioni filtrate

// //   price: number | undefined;//prezzo singolo tempo reale
// //   quote: QuoteBorse | undefined;
// //   timeSeries: TimeSeries | undefined;
// //   stock: any = {}; // Adjust according to your actual stock data structure
// //   averagePrice: number = 0;
// //   bestPrice: number = 0;

// //   myChartRef!: HTMLCanvasElement | null; // Riferimento al canvas del grafico
// //   private chart!: Chart; // Istanza del grafico

// //   constructor(
// //     private logoBorsaService: LogoBorsaService,
// //     private stockListService: StockListService,
// //     private realTimePriceService: RealTimePriceService,
// //     // private quoteService: QuoteBorseService,
// //     private timeSeriesBorseService: TimeSeriesBorseService,
// //     private http: HttpClient
// //   ) { // Registra la scala 'linear' durante l'inizializzazione del componente
// //     Chart.register(...registerables);
// //   }

// //   ngOnInit(): void {
// //     this.getTimeSeries(this.interval);
// //     this.getStocks();
// //     this.initChart();
// //     this.getLogo();
// //     this.favorites.forEach(favorite=>{
// //       if(favorite.symbol === this.stock.symbol){
// //         this.stock.favorite = true;
// //       }
// //     })
// //     // this.loadAllSymbols();

// //     // Aggiorna il prezzo ogni 10 secondi
// //     setInterval(() => {
// //       this.getRealTimePrice();
// //     }, 60000);//da cambiare
// //   }
// //   ngAfterViewInit(): void {
// //     this.initChart();
// //   }
// //   //---------------------METODO PER SALVARE I LOGHI NEL DATABASE-----------------------------//
// //   // loadAllSymbols(): void {
// //   //   this.stockListService.getStockList().subscribe({
// //   //     next: (stocks: StockList[]) => {
// //   //       this.stocks = stocks;
// //   //       const symbols = this.stocks.map(stock => stock.symbol);
// //   //       this.loadAllLogos(symbols);
// //   //     },
// //   //     error: err => {
// //   //       console.error('Errore durante il recupero dei simboli', err);
// //   //     }
// //   //   });
// //   // }

// //   // loadAllLogos(symbols: string[]): void {
// //   //   this.logoBorsaService.getAllLogos(symbols).subscribe({
// //   //     next: logos => {
// //   //       this.sendLogosToBackend(logos);
// //   //     },
// //   //     error: err => {
// //   //       console.error('Errore durante il recupero dei loghi', err);
// //   //     }
// //   //   });
// //   // }

// //   // sendLogosToBackend(logos: LogoDto[]): void {
// //   //   const url = `${environment.apiBack}logos`; // URL del tuo backend
// //   //   this.http.post(url, logos).subscribe({
// //   //     next: response => {
// //   //       console.log('Loghi inviati al backend con successo', response);
// //   //     },
// //   //     error: err => {
// //   //       console.error('Errore durante l\'invio dei loghi al backend', err);
// //   //     }
// //   //   });
// //   // }




// //   onSearchChange(event: any): void {
// //     this.searchTerm = event.target.value;
// //     if (this.searchTerm.length > 0) {
// //       this.filteredStocks = this.stocks.filter(stock => stock.symbol.toLowerCase().includes(this.searchTerm.toLowerCase()));
// //     } else {
// //       this.filteredStocks = [];
// //     }
// //   }
// //   selectStock(selectedSymbol: string): void {
// //     this.symbol = selectedSymbol;
// //     this.searchTerm = '';
// //     this.filteredStocks = [];
// //     this.onSymbolChange(this.symbol); // Chiamata alla funzione per gestire il cambio di simbolo
// //   }
// //   //------------------------- CHIAMATA ALL'API ------------------------------//
// //   // getLogo(): void {
// //   //   console.log('Chiamato getLogo()');
// //   //   if (this.symbol) {
// //   //     this.logoBorsaService.getLogo(this.symbol).subscribe(
// //   //       (response: LogoBorsa) => {
// //   //         this.logoUrl = response.url;
// //   //         console.log('URL del logo:', response.url);
// //   //       },
// //   //       (error) => {
// //   //         console.error('Errore durante il recupero del logo', error);
// //   //       }
// //   //     );
// //   //   } else {
// //   //     console.error('Simbolo non inserito');
// //   //   }
// //   // }


// //   // getLogo(): void {
// //   //   console.log('Chiamato getLogo()');
// //   //   if (this.symbol) {
// //   //     this.logoBorsaService.getLogo(this.symbol).subscribe(
// //   //       (response: LogoDto) => {
// //   //         this.logoUrl = response.url ? response.url : undefined;
// //   //         console.log('URL del logo:', response.url);
// //   //       },
// //   //       (error) => {
// //   //         console.error('Errore durante il recupero del logo', error);
// //   //       }
// //   //     );
// //   //   } else {
// //   //     console.error('Simbolo non inserito');
// //   //   }
// //   // }

// //   getLogo(): void {
// //     console.log('Chiamato getLogo()');
// //     if (this.symbol) {
// //       this.logoBorsaService.getLogo(this.symbol).subscribe(
// //         (response: LogoBorsa) => {
// //           this.logoUrl = response.url ? response.url : undefined;
// //           this.stock.logoUrl=response.url? response.url : undefined;
// //           console.log('URL del logo:', response.url);
// //         },
// //         (error) => {
// //           console.error('Errore durante il recupero del logo', error);
// //         }
// //       );
// //     } else {
// //       console.error('Simbolo non inserito');
// //     }
// //   }



// // //------------------------- CHIAMATA ALL'API ------------------------------//
// //   // Funzione per ottenere la lista delle azioni(lista dei symbol)
// //   // getStocks(): void {
// //   //   this.stockListService.getStockList().subscribe(
// //   //     (response: StockList[]) => {
// //   //       this.stocks = response;
// //   //       console.log(this.stocks); // Stampa la lista delle azioni nella console
// //   //     },
// //   //     (error) => {
// //   //       console.error('Errore durante il recupero della lista delle azioni', error);
// //   //       this.stocks = [];
// //   //     }
// //   //   );
// //   // }


// //   getStocks(): void {
// //     this.logoBorsaService.getAllLogos().subscribe(
// //       (response: LogoDto[]) => {
// //         let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
// //         let filter2: LogoDto[] = [];
// //         filteredStocks.forEach(logo => {
// //           let image = new Image();
// //           image.src = logo.url;
// //           image.onload = function () {
// //             filter2.push(logo)
// //           }
// //           image.onerror = function () {
// //           }
// //         })
// //         setTimeout(() => {
// //           this.stockListService.getStockList().subscribe((response: StockList[]) => {
// //             this.stocks = response.filter(stock => {
// //               return filter2.map(logo => logo.symbol).includes(stock.symbol);
// //             })
// //             console.log(this.stocks)
// //           })

// //         }, 2000)},
// //       (error) => {
// //         console.error('Errore durante il recupero della lista delle azioni', error);
// //         this.stocks = [];
// //       }
// //     );
// //   }

// //   // Funzione per ottenere il prezzo in tempo reale di un'azione(da utilizare come singolo dato in tempo reale)
// //   getRealTimePrice(): void {
// //     if (this.symbol) {
// //       // Se il simbolo è presente, chiama il servizio per ottenere il prezzo in tempo reale
// //       this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
// //         (response: RealTimePriceResponse) => {
// //           this.stocks.forEach((stock) => {
// //             if (stock.symbol === this.symbol) {
// //               this.stock.name = stock.name
// //             }
// //           });
// //           this.price = response.price; // Salva il prezzo attuale
// //           this.stock.price = response.price; // Aggiorna il prezzo dell'azione
// //           this.stock.increased = response.price >= (Number(this.quote?.previous_close) || 0); // Verifica se il prezzo è aumentato rispetto alla chiusura precedente
// //           console.log(this.price); // Stampa il prezzo nella console
// //           this.stock.symbol = this.symbol
// //         },
// //         (error) => {
// //           console.error('Errore durante il recupero del prezzo in tempo reale', error); // Stampa un messaggio di errore in caso di fallimento
// //         }
// //       );
// //     } else {
// //       console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
// //     }
// //   }





// //   // Funzione per ottenere la quotazione di un'azione(possibilità di cambiare da "1D" a diververse giornate (1giorno-settiname-anni))
// //   //passando anche il valore "interval" si puo decidere quele intervalo prendere(1giorno-settiname-anni)
// //   // getQuote(): void {
// //   //   if (this.symbol) {
// //   //     // Se il simbolo è presente, chiama il servizio per ottenere la quotazione
// //   //     this.quoteService.getQuote(this.symbol).subscribe(
// //   //       (response: QuoteBorse) => {
// //   //         this.quote = response; // Salva la quotazione
// //   //         console.log(this.quote); // Stampa la quotazione nella console
// //   //       },
// //   //       (error) => {
// //   //         console.error('Errore durante il recupero del prezzo in tempo reale', error); // Stampa un messaggio di errore in caso di fallimento
// //   //       }
// //   //     );
// //   //   } else {
// //   //     console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
// //   //   }
// //   // }



// //   // Funzione per aggiornare le serie temporali
// //   updateTimeSeries(interval: string): void {
// //     this.getTimeSeries(interval); // Chiama la funzione per ottenere le serie temporali con il nuovo intervallo
// //   }


// //   // Funzione per ottenere le serie temporali di un'azione
// //   //PREZZO MENSILI PER QUELLA SINGOLA BORSA( CHIAMANDO UNA BORSA SPECIFICA ) (dati: giorno per giono con i vari valore delle azioni)
// //   getTimeSeries(interval: string): void {
// //     if (this.symbol) {
// //       // Se il simbolo è presente, chiama il servizio per ottenere le serie temporali
// //       this.timeSeriesBorseService.getTimeSeries(this.symbol, interval).subscribe(
// //         (response: TimeSeries) => {
// //           // Converti i valori low e high in numeri
// //           response.values.forEach(value => {
// //             value.low = Number(value.low);
// //             value.high = Number(value.high);
// //           });

// //           this.timeSeries = response; // Salva le serie temporali
// //           console.log(this.timeSeries); // Stampa le serie temporali nella console
// //           this.updateChart(); // Aggiorna il grafico con i nuovi dati
// //           this.calcolaPrezzoMedio();  // Calcola il prezzo medio e il miglior prezzo
// //           this.calcolaMigliorPrezzo(); // Calcola il miglior prezzo dopo aver ottenuto la serie temporale
// //         },
// //         (error) => {
// //           console.error('Errore durante il recupero delle serie temporali', error); // Stampa un messaggio di errore in caso di fallimento
// //         }
// //       );
// //     } else {
// //       console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
// //     }
// //   }





// //   // Funzione per gestire la submit del form
// //   onSubmit(): void {
// //     this.getTimeSeries(this.interval);
// //     console.log('Simbolo selezionato:', this.symbol);
// //     console.log('Intervallo selezionato:', this.interval);
// //   }



// //   onIntervalChange(newInterval: string): void {
// //     this.interval = newInterval;
// //     this.selectedInterval = newInterval; // Imposta l'intervallo selezionato

// //     // Qui puoi fare ciò che desideri con il nuovo valore dell'intervallo, ad esempio aggiornare i dati
// //     console.log('Nuovo intervallo selezionato:', newInterval);
// //     // Chiamare le funzioni necessarie per aggiornare i dati
// //     this.getTimeSeries(this.interval);
// //     // Aggiornare il grafico
// //     this.updateChart();
// //   }

// //   onSymbolChange(newSymbol: string): void {
// //     // Qui puoi fare ciò che desideri con il nuovo valore del simbolo, ad esempio aggiornare i dati
// //     console.log('Nuovo simbolo selezionato:', newSymbol);
// //     // Chiamare le funzioni necessarie per aggiornare i dati
// //     this.getRealTimePrice();
// //     this.getTimeSeries(this.interval);
// //     // Aggiornare il grafico
// //     this.updateChart();
// //     this.favorites.forEach(favorite=>{
// //       if(favorite.symbol === this.stock.symbol){
// //         this.stock.favorite = true;
// //       }
// //     })
// //   }





// //   isMobile(): boolean {
// //     return window.innerWidth < 768;
// //   }

// //   updateChart(): void {
// //     if (!this.chart || !this.timeSeries || !this.timeSeries.values) return;

// //     const labels = this.timeSeries.values.map(val => {
// //       const dateTime = new Date(val.datetime);
// //       if (['1day', '1week', '1month'].includes(this.interval)) {
// //         return dateTime.toLocaleDateString();
// //       } else if (this.isMobile()) {
// //         if (this.interval.includes('min') || this.interval.includes('hour')) {
// //           return dateTime.toLocaleTimeString();
// //         } else {
// //           return dateTime.toLocaleDateString();
// //         }
// //       } else {
// //         return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
// //       }
// //     });

// //     const data = this.timeSeries.values.map(val => val.close);
// //     this.chart.data.labels = labels;
// //     this.chart.data.datasets[0].data = data;
// //     this.chart.update();

// //     // Aggiorna il logo dopo aver aggiornato il grafico
// //     this.getLogo();
// //     this.getRealTimePrice();

// //     this.calcolaPrezzoMedio();
// //     this.calcolaMigliorPrezzo();
// //   }






// //   calcolaPrezzoMedio(): void {
// //     if (this.timeSeries && this.timeSeries.values.length > 0) {
// //       const totalLow = this.timeSeries.values.reduce((sum, value) => sum + Number(value.low), 0);
// //       const totalHigh = this.timeSeries.values.reduce((sum, value) => sum + Number(value.high), 0);
// //       this.averagePrice = (totalLow + totalHigh) / (2 * this.timeSeries.values.length);
// //       console.log('Prezzo Medio:', this.averagePrice);
// //     } else {
// //       console.error('Nessun dato disponibile per calcolare il prezzo medio.');
// //     }
// //   }

// //   calcolaMigliorPrezzo(): void {
// //     if (this.timeSeries && this.timeSeries.values.length > 0) {
// //       const bestPrice = Math.max(...this.timeSeries.values.map(value => Number(value.high)));
// //       this.bestPrice = bestPrice;
// //       console.log('Miglior Prezzo:', bestPrice);
// //     } else {
// //       console.log('Nessuna serie temporale disponibile.');
// //     }
// //   }


// //   // Funzione per ottenere la dimensione del font in base alla larghezza della finestra
// //   getFontSize(): number {
// //     const width = window.innerWidth;
// //     if (width < 576) {
// //       return 7;
// //     } else if (width < 768) {
// //       return 7;
// //     } else if (width < 992) {
// //       return 9;
// //     } else {
// //       return 11;
// //     }
// //   }


// //   // Inizializzazione del grafico
// //   initChart(): void {
// //     if (this.chart) {
// //       this.chart.destroy(); // Distruggi il grafico esistente se presente
// //     }
// //     this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
// //     if (!this.myChartRef) return;
// //     const ctx = this.myChartRef.getContext('2d');
// //     if (!ctx) return

// //     // Funzioni per determinare il colore delle linee del grafico
// //     const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
// //     const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

// //     // Funzione per determinare il colore dei punti del grafico
// //     const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
// //       const index = ctx.dataIndex;
// //       const data = ctx.dataset.data as number[];
// //       if (index === 0) {
// //         return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
// //       }
// //       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
// //     };

// //     const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
// //       const index = ctx.dataIndex;
// //       const data = ctx.dataset.data as number[];
// //       if (index === 0) {
// //         return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
// //       }
// //       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
// //     };

// //     // Configurazione del grafico
// //     this.chart = new Chart(ctx, {
// //       type: 'line',
// //       data: {
// //         labels: [],
// //         datasets: [{
// //           label: 'Stock Price',
// //           data: [],
// //           borderColor: 'rgb(75, 192, 192)',
// //           segment: {
// //             borderColor: ctx => skipped(ctx) || down(ctx),
// //             borderDash: ctx => skipped(ctx) ? [6, 6] : undefined
// //           },
// //           borderWidth: 1,
// //           pointBackgroundColor: getPointBackgroundColor,
// //           pointBorderColor: getPointBorderColor
// //         }]
// //       },
// //       options: {
// //         responsive: true,
// //         maintainAspectRatio: true,
// //         animation: {
// //           duration: 1100,
// //           easing: 'linear'
// //         },
// //         scales: {
// //           y: {
// //             type: 'linear', // Assicurati che la scala sia configurata come 'linear'
// //             beginAtZero: true,
// //             ticks: {
// //               color: 'white' // Colore delle etichette dell'asse Y
// //             },
// //             grid: {
// //               color: 'rgba(255, 255, 255, 0.2)' // Colore delle linee della griglia dell'asse Y
// //             }
// //           },
// //           x: {
// //             ticks: {
// //               color: 'white',
// //               font: {
// //                 size: this.getFontSize() // Set initial font size
// //               },
// //               maxRotation: 50, // No rotation for better readability
// //               minRotation: 0,

// //             },

// //             grid: {
// //               color: 'rgba(255, 255, 255, 0.2)' // Colore delle linee della griglia dell'asse X
// //             }
// //           }
// //         },
// //         plugins: {
// //           legend: {
// //             display: false // Disabilitazione della legenda predefinita
// //           }
// //         }
// //       }
// //     });

// //     // Impostazione del colore di sfondo del canvas
// //     this.myChartRef.style.backgroundColor = '#122036';
// //   }

// //   toggleFavorite(stock: any): void {
// //     this.stock.favorite = !this.stock.favorite;
// //     this.favoriteToggled.emit(stock);
// //     console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
// //     // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
// //   }
// // }


// // @Output() favoriteToggled = new EventEmitter<any>();
// // @Input() favorites: any[] = [];
// // selectedInterval: string = '1day'; // Intervallo selezionato
// // interval: string = '1day'; // Impostazione di default
// // logoUrl: string | undefined;
// // symbol: string = "AMZN"; // Impostazione di default
// // stocks: StockList[] = []; // lista per popolare la lista del form sui nomi dei symbol 
// // searchTerm: string = ''; // Variabile per memorizzare il termine di ricerca
// // filteredStocks: StockList[] = []; // Lista di azioni filtrate

// // price: number | undefined; // prezzo singolo tempo reale
// // quote: QuoteBorse | undefined;
// // timeSeries: TimeSeries | undefined;
// // stock: any = {}; // Adjust according to your actual stock data structure
// // averagePrice: number = 0;
// // bestPrice: number = 0;


// // fromDate: string | null = '2024-06-17'; // Example initial date
// // toDate: string | null ='2024-06-21';   // Example initial date

// // myChartRef!: HTMLCanvasElement | null; // Riferimento al canvas del grafico
// // private chart!: Chart; // Istanza del grafico

// // constructor(
// //   private logoBorsaService: LogoBorsaService,
// //   private stockListService: StockListService,
// //   private realTimePriceService: RealTimePriceService,
// //   private timeSeriesBorseService: TimeSeriesBorseService,
// //   private http: HttpClient
// // ) { // Registra la scala 'linear' durante l'inizializzazione del componente
// //   Chart.register(...registerables);
// // }

// // ngOnInit(): void {
  
// //   this.getTimeSeries(this.interval);
// //   this.getStocks();
// //   this.initChart();
// //   this.getLogo();
// //   this.favorites.forEach(favorite => {
// //     if (favorite.symbol === this.stock.symbol) {
// //       this.stock.favorite = true;
// //     }
// //   });
// //   // Aggiorna il prezzo ogni 10 secondi
// //   setInterval(() => {
// //     this.getRealTimePrice();
// //   }, 60000); // da cambiare
// // }

// // ngAfterViewInit(): void {
// //   this.initChart();
// // }

// // onSearchChange(event: any): void {
// //   this.searchTerm = event.target.value;
// //   if (this.searchTerm.length > 0) {
// //     this.filteredStocks = this.stocks.filter(stock => stock.symbol.toLowerCase().includes(this.searchTerm.toLowerCase()));
// //   } else {
// //     this.filteredStocks = [];
// //   }
// // }

// // selectStock(selectedSymbol: string): void {
// //   this.symbol = selectedSymbol;
// //   this.searchTerm = '';
// //   this.filteredStocks = [];
// //   this.onSymbolChange(this.symbol); // Chiamata alla funzione per gestire il cambio di simbolo
// // }

// // getLogo(): void {
// //   console.log('Chiamato getLogo()');
// //   if (this.symbol) {
// //     this.logoBorsaService.getLogo(this.symbol).subscribe(
// //       (response: LogoBorsa) => {
// //         this.logoUrl = response.url ? response.url : undefined;
// //         this.stock.logoUrl = response.url ? response.url : undefined;
// //         console.log('URL del logo:', response.url);
// //       },
// //       (error) => {
// //         console.error('Errore durante il recupero del logo', error);
// //       }
// //     );
// //   } else {
// //     console.error('Simbolo non inserito');
// //   }
// // }

// // getStocks(): void {
// //   this.logoBorsaService.getAllLogos().subscribe(
// //     (response: LogoDto[]) => {
// //       let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
// //       let filter2: LogoDto[] = [];
// //       filteredStocks.forEach(logo => {
// //         let image = new Image();
// //         image.src = logo.url;
// //         image.onload = function () {
// //           filter2.push(logo);
// //         }
// //         image.onerror = function () {
// //         }
// //       })
// //       setTimeout(() => {
// //         this.stockListService.getStockList().subscribe((response: StockList[]) => {
// //           this.stocks = response.filter(stock => {
// //             return filter2.map(logo => logo.symbol).includes(stock.symbol);
// //           });
// //           console.log(this.stocks);
// //         });
// //       }, 2000);
// //     },
// //     (error) => {
// //       console.error('Errore durante il recupero della lista delle azioni', error);
// //       this.stocks = [];
// //     }
// //   );
// // }

// // getRealTimePrice(): void {
// //   if (this.symbol) {
// //     this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
// //       (response: RealTimePriceResponse) => {
// //         this.stocks.forEach((stock) => {
// //           if (stock.symbol === this.symbol) {
// //             this.stock.name = stock.name;
// //           }
// //         });
// //         this.price = response.price; // Salva il prezzo attuale
// //         this.stock.price = response.price; // Aggiorna il prezzo dell'azione
// //         this.stock.increased = response.price >= (Number(this.quote?.previous_close) || 0); // Verifica se il prezzo è aumentato rispetto alla chiusura precedente
// //         console.log(this.price); // Stampa il prezzo nella console
// //         this.stock.symbol = this.symbol;
// //       },
// //       (error) => {
// //         console.error('Errore durante il recupero del prezzo in tempo reale', error); // Stampa un messaggio di errore in caso di fallimento
// //       }
// //     );
// //   } else {
// //     console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
// //   }
// // }

// // updateTimeSeries(interval: string): void {
// //   this.getTimeSeries(interval); // Chiama la funzione per ottenere le serie temporali con il nuovo intervallo
// // }



// // onDateRangeSelected(event: { fromDate: string, toDate: string }): void {
// //   this.fromDate = event.fromDate;
// //   this.toDate = event.toDate;
// //   console.log(`Date range selected: from ${this.fromDate} to ${this.toDate}`);
// //   this.getTimeSeries(this.interval); // Fetch data based on the new date range and interval
// // }

// // getTimeSeries(interval: string): void {
// //   if (this.symbol && this.fromDate && this.toDate) {
// //     console.log(`Fetching time series for symbol: ${this.symbol}, interval: ${interval}, from: ${this.fromDate}, to: ${this.toDate}`);
// //     this.timeSeriesBorseService.getTimeSeries(this.symbol, interval, this.fromDate, this.toDate).subscribe(
// //       (response: any) => {
// //         response.values.forEach((value: any) => {
// //           value.low = Number(value.low);
// //           value.high = Number(value.high);
// //         });
// // // Sort the data by datetime in ascending order
// // response.values.sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

// //         this.timeSeries = response; // Save the time series
// //         console.log(this.timeSeries); // Log the time series to console
// //         this.updateChart(); // Update the chart with new data
// //         this.calcolaPrezzoMedio();  // Calculate the average price
// //         this.calcolaMigliorPrezzo(); // Calculate the best price after obtaining the time series
// //       },
// //       (error) => {
// //         console.error('Errore durante il recupero delle serie temporali', error); // Print an error message if the time series data retrieval fails
// //       }
// //     );
// //   } else {
// //     console.error('Symbol or date range not set');
// //     console.log(`Symbol: ${this.symbol}`);
// //     console.log(`From Date: ${this.fromDate}`);
// //     console.log(`To Date: ${this.toDate}`);
// //   }
// // }
// // onSubmit(): void {
// //   this.getTimeSeries(this.interval);
// //   console.log('Simbolo selezionato:', this.symbol);
// //   console.log('Intervallo selezionato:', this.interval);
// // }

// // // onIntervalChange(newInterval: string): void {
// // //   this.interval = newInterval;
// // //   this.selectedInterval = newInterval; // Imposta l'intervallo selezionato

// // //   console.log('Nuovo intervallo selezionato:', newInterval);
// // //   this.getTimeSeries(this.interval);
// // //   this.updateChart();
// // // }
// // onIntervalChange(newInterval: string): void {
// //   this.interval = newInterval;
// //   this.selectedInterval = newInterval; // Set the selected interval
// //   console.log(`Nuovo intervallo selezionato: ${newInterval}`);
// //   this.getTimeSeries(this.interval); // Fetch data based on the new interval
// // }


// // onSymbolChange(newSymbol: string): void {
// //   console.log('Nuovo simbolo selezionato:', newSymbol);
// //   this.getRealTimePrice();
// //   this.getTimeSeries(this.interval);
// //   this.updateChart();
// //   this.favorites.forEach(favorite => {
// //     if (favorite.symbol === this.stock.symbol) {
// //       this.stock.favorite = true;
// //     }
// //   });
// // }

// // isMobile(): boolean {
// //   return window.innerWidth < 768;
// // }

// // updateChart(): void {
// //   if (!this.chart || !this.timeSeries || !this.timeSeries.values) return;

// //   const labels = this.timeSeries.values.map(val => {
// //     const dateTime = new Date(val.datetime);
// //     if (['1day', '1week', '1month'].includes(this.interval)) {
// //       return dateTime.toLocaleDateString();
// //     } else if (this.isMobile()) {
// //       if (this.interval.includes('min') || this.interval.includes('hour')) {
// //         return dateTime.toLocaleTimeString();
// //       } else {
// //         return dateTime.toLocaleDateString();
// //       }
// //     } else {
// //       return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
// //     }
// //   });

// //   const data = this.timeSeries.values.map(val => val.close);
// //   this.chart.data.labels = labels;
// //   this.chart.data.datasets[0].data = data;
// //   this.chart.update();

// //   this.getLogo();
// //   this.getRealTimePrice();

// //   this.calcolaPrezzoMedio();
// //   this.calcolaMigliorPrezzo();
// // }


// // calcolaPrezzoMedio(): void {
// //   if (this.timeSeries && this.timeSeries.values.length > 0) {
// //     const totalLow = this.timeSeries.values.reduce((sum, value) => sum + Number(value.low), 0);
// //     const totalHigh = this.timeSeries.values.reduce((sum, value) => sum + Number(value.high), 0);
// //     this.averagePrice = (totalLow + totalHigh) / (2 * this.timeSeries.values.length);
// //     console.log('Prezzo Medio:', this.averagePrice);
// //   } else {
// //     console.error('Nessun dato disponibile per calcolare il prezzo medio.');
// //   }
// // }

// // calcolaMigliorPrezzo(): void {
// //   if (this.timeSeries && this.timeSeries.values.length > 0) {
// //     const bestPrice = Math.max(...this.timeSeries.values.map(value => Number(value.high)));
// //     this.bestPrice = bestPrice;
// //     console.log('Miglior Prezzo:', bestPrice);
// //   } else {
// //     console.log('Nessuna serie temporale disponibile.');
// //   }
// // }

// // getFontSize(): number {
// //   const width = window.innerWidth;
// //   if (width < 576) {
// //     return 7;
// //   } else if (width < 768) {
// //     return 7;
// //   } else if (width < 992) {
// //     return 9;
// //   } else {
// //     return 11;
// //   }
// // }

// // initChart(): void {
// //   if (this.chart) {
// //     this.chart.destroy(); // Distruggi il grafico esistente se presente
// //   }
// //   this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
// //   if (!this.myChartRef) return;
// //   const ctx = this.myChartRef.getContext('2d');
// //   if (!ctx) return;

// //   const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
// //   const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

// //   const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
// //     const index = ctx.dataIndex;
// //     const data = ctx.dataset.data as number[];
// //     if (index === 0) {
// //       return 'rgb(75, 192, 192)';
// //     }
// //     return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
// //   };

// //   const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
// //     const index = ctx.dataIndex;
// //     const data = ctx.dataset.data as number[];
// //     if (index === 0) {
// //       return 'rgb(75, 192, 192)';
// //     }
// //     return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
// //   };

// //   this.chart = new Chart(ctx, {
// //     type: 'line',
// //     data: {
// //       labels: [],
// //       datasets: [{
// //         label: 'Stock Price',
// //         data: [],
// //         borderColor: 'rgb(75, 192, 192)',
// //         segment: {
// //           borderColor: ctx => skipped(ctx) || down(ctx),
// //           borderDash: ctx => skipped(ctx) ? [6, 6] : undefined
// //         },
// //         borderWidth: 1,
// //         pointBackgroundColor: getPointBackgroundColor,
// //         pointBorderColor: getPointBorderColor
// //       }]
// //     },
// //     options: {
// //       responsive: true,
// //       maintainAspectRatio: true,
// //       animation: {
// //         duration: 1100,
// //         easing: 'linear'
// //       },
// //       scales: {
// //         y: {
// //           type: 'linear',
// //           beginAtZero: true,
// //           ticks: {
// //             color: 'white'
// //           },
// //           grid: {
// //             color: 'rgba(255, 255, 255, 0.2)'
// //           }
// //         },
// //         x: {
// //           ticks: {
// //             color: 'white',
// //             font: {
// //               size: this.getFontSize()
// //             },
// //             maxRotation: 50,
// //             minRotation: 0
// //           },
// //           grid: {
// //             color: 'rgba(255, 255, 255, 0.2)'
// //           }
// //         }
// //       },
// //       plugins: {
// //         legend: {
// //           display: false
// //         }
// //       }
// //     }
// //   });

// //   this.myChartRef.style.backgroundColor = '#122036';
// // }

// // toggleFavorite(stock: any): void {
// //   this.stock.favorite = !this.stock.favorite;
// //   this.favoriteToggled.emit(stock);
// //   console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
// // }
// // }





// @Output() favoriteToggled = new EventEmitter<any>();
// @Input() favorites: any[] = [];
// selectedInterval: string = '1day';
// interval: string = '1day';
// logoUrl: string | undefined;
// symbol: string = "AMZN";
// stocks: StockList[] = [];
// searchTerm: string = '';
// filteredStocks: StockList[] = [];
// price: number | undefined;
// quote: QuoteBorse | undefined;
// timeSeries: TimeSeries | undefined;
// stock: any = {};
// averagePrice: number = 0;
// bestPrice: number = 0;
// fromDate: string | null = '2024-06-17';
// toDate: string | null = '2024-06-22';


// // balance: number = 0; // Saldo dell'utente
// // quantityToBuy: number = 1; // Quantità di acquisto
// // quantityToSell: number = 1; // Quantità di vendita
// userId: number | null = null; // ID dell'utente
// // userStocks: Stock[] = []; // Aggiungi questa linea per le azioni possedute


// myChartRef!: HTMLCanvasElement | null;
// private chart!: Chart;

// constructor(
//   private logoBorsaService: LogoBorsaService,
//   private stockListService: StockListService,
//   private realTimePriceService: RealTimePriceService,
//   private timeSeriesBorseService: TimeSeriesBorseService,
//   private quoteBorseService: QuoteBorseService,
//   private http: HttpClient,
//   private profiloService: ProfiloService, // Aggiungi questo
//   private modalService: NgbModal,
//   // private transactionService: TransactionService,
//   private authSrv: AuthService 
// ) {
//   Chart.register(...registerables);
//   Chart.register(zoomPlugin); // Registra il plugin zoom
// }

// ngOnInit(): void {
//   this.authSrv.user$.subscribe((data) => {
//     if (data && data.user) {
//       this.userId = data.user.idUtente || null;
//       // this.balance = data.user.balance || 0;
//       // this.userStocks = data.user.stocks || [];
//       // console.log(`User ID: ${this.userId}, Balance: ${this.balance}`);
//     } else {
//       console.warn('Utente non autenticato');
//     }
//   });
//     // Aggiorna i dati dell'utente all'avvio del componente
//     // this.updateUserData();
//   this.getTimeSeries(this.interval);
//   this.getStocks();
//   this.initChart();
//   this.getLogo();
//   // this.favorites.forEach(favorite => {
//   //   if (favorite.symbol === this.stock.symbol) {
//   //     this.stock.favorite = true;
//   //   }
//   // });
//   setTimeout(() => {
//     this.onSymbolChange(this.symbol);

//   }, 100)
//   setInterval(() => {
//     this.getRealTimePrice();
//   }, 60000);
// }

// ngAfterViewInit(): void {
//   this.initChart();
// }

//  // Aggiungi questo metodo per aggiornare i dati dell'utente
// //  updateUserData(): void {
// //   if (this.userId !== null) {
// //     this.profiloService.updateUser(this.userId, {}).subscribe(user => {
// //       this.authSrv.updateUser(user);
// //       this.balance = user.balance;
// //       this.userStocks = user.stocks;
      
// //     });
// //   }
// // }
// // updateUserStocks(stocks: Stock[]): void {
// //   this.userStocks = stocks;
// // }

// // updateOwnedQuantity(stocks: Stock[], symbol: string): void {
// //   const stock = stocks.find(s => s.symbol === symbol);
// //   this.ownedQuantity = stock ? stock.quantity : 0;
// // }
// selectSymbol(symbol: string): void {
//   this.symbol = symbol;
// }

//   // Metodo per aprire la modale
//   openModal(content: TemplateRef<any>,symbol: string) {
//     const modalRef= this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
//     modalRef.componentInstance.symbol = symbol;
// 	}
// onSearchChange(event: any): void {
//   this.searchTerm = event.target.value;
//   if (this.searchTerm.length > 0) {
//     this.filteredStocks = this.stocks.filter(stock => stock.symbol.toLowerCase().includes(this.searchTerm.toLowerCase()));
//   } else {
//     this.filteredStocks = [];
//   }
// }

// selectStock(selectedSymbol: string): void {
//   this.symbol = selectedSymbol;
//   this.searchTerm = '';
//   this.filteredStocks = [];
//   this.onSymbolChange(this.symbol);
// }

// getLogo(): void {
//   if (this.symbol) {
//     this.logoBorsaService.getLogo(this.symbol).subscribe(
//       (response: LogoBorsa) => {
//         this.logoUrl = response.url ? response.url : undefined;
//         this.stock.logoUrl = response.url ? response.url : undefined;
//       },
//       (error) => {
//         console.error('Errore durante il recupero del logo', error);
//       }
//     );
//   } else {
//     console.error('Simbolo non inserito');
//   }
// }

// getStocks(): void {
//   this.logoBorsaService.getAllLogos().subscribe(
//     (response: LogoDto[]) => {
//       let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
//       let filter2: LogoDto[] = [];
//       filteredStocks.forEach(logo => {
//         let image = new Image();
//         image.src = logo.url;
//         image.onload = function () {
//           filter2.push(logo);
//         }
//         image.onerror = function () {
//         }
//       });
//       setTimeout(() => {
//         this.stockListService.getStockList().subscribe((response: StockList[]) => {
//           this.stocks = response.filter(stock => {
//             return filter2.map(logo => logo.symbol).includes(stock.symbol);
//           });
//         });
//       }, 2000);
//     },
//     (error) => {
//       console.error('Errore durante il recupero della lista delle azioni', error);
//       this.stocks = [];
//     }
//   );
// }

// getRealTimePrice(): void {
//   if (this.symbol) {
//     this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//       (response: RealTimePriceResponse) => {
//         this.stocks.forEach((stock) => {
//           if (stock.symbol === this.symbol) {
//             this.stock.name = stock.name;
//             console.log(this.stock.name)
//           }
//         });
//         this.price = response.price;
//         this.stock.price = response.price;
//         this.getPreviousClosePrice(response.price);
//       },
//       (error) => {
//         console.error('Errore durante il recupero del prezzo in tempo reale', error);
//       }
//     );
//   } else {
//     console.error('Simbolo non inserito');
//   }
// }

// getPreviousClosePrice(currentPrice: number): void {
//   this.quoteBorseService.getQuote(this.symbol).subscribe(
//     (response: QuoteBorse) => {
//       const previousClose = Number(response.previous_close);
//       this.stock.increased = currentPrice >= previousClose;
//     },
//     (error) => {
//       console.error('Errore durante il recupero del prezzo di chiusura precedente', error);
//     }
//   );
// }
// updateTimeSeries(interval: string): void {
//   this.getTimeSeries(interval);
// }

// onDateRangeSelected(event: { fromDate: string, toDate: string }): void {
//   this.fromDate = event.fromDate;
//   this.toDate = event.toDate;
//   console.log(`Intervallo di date selezionato: da ${this.fromDate} a ${this.toDate}`);
//   this.getTimeSeries(this.interval);
// }

// getTimeSeries(interval: string): void {
//   if (this.symbol && this.fromDate && this.toDate) {
//     console.log(`Fetching time series for symbol: ${this.symbol}, interval: ${interval}, from: ${this.fromDate}, to: ${this.toDate}`);
//     this.timeSeriesBorseService.getTimeSeries(this.symbol, interval, this.fromDate, this.toDate).subscribe(
//       (response: any) => {
//         if (response.values && response.values.length > 0) {
//           response.values.forEach((value: any) => {
//             value.low = Number(value.low);
//             value.high = Number(value.high);
//           });

//           response.values.sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

//           this.timeSeries = response; // Salva le serie temporali
//           console.log(this.timeSeries); // Stampa le serie temporali nella console
//           this.updateChart(); // Aggiorna il grafico con i nuovi dati
//           this.calcolaPrezzoMedio();  // Calcola il prezzo medio
//           this.calcolaMigliorPrezzo(); // Calcola il miglior prezzo dopo aver ottenuto la serie temporale
//         } else {
//           console.error('Dati delle serie temporali non disponibili');
//         }
//       },
//       (error) => {
//         console.error('Errore durante il recupero delle serie temporali', error); // Stampa un messaggio di errore in caso di fallimento
//       }
//     );
//   } else {
//     console.error('Simbolo o intervallo di date non impostati');
//   }
// }


// onSubmit(): void {
//   this.getTimeSeries(this.interval);
// }

// onIntervalChange(newInterval: string): void {
//   this.interval = newInterval;
//   this.selectedInterval = newInterval;
//   this.getTimeSeries(this.interval);
// }

// onSymbolChange(newSymbol: string): void {
//   this.symbol = newSymbol;
//   this.stock.symbol = newSymbol;
//     // this.updateUserData();
//   this.getRealTimePrice();
//   this.getTimeSeries(this.interval);
//   this.updateChart();
//   console.log(this.stock)
//   this.favorites.forEach(favorite => {
//     if (favorite.symbol === this.stock.symbol) {
//       this.stock.favorite = true;
//     }
//   });
// }

// isMobile(): boolean {
//   return window.innerWidth < 768;
// }

// updateChart(): void {
//   if (!this.chart || !this.timeSeries || !this.timeSeries.values) return;

//   const labels = this.timeSeries.values.map(val => {
//     const dateTime = new Date(val.datetime);
//     if (['1day', '1week', '1month'].includes(this.interval)) {
//       return dateTime.toLocaleDateString();
//     } else if (this.isMobile()) {
//       if (this.interval.includes('min') || this.interval.includes('hour')) {
//         return dateTime.toLocaleTimeString();
//       } else {
//         return dateTime.toLocaleDateString();
//       }
//     } else {
//       return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
//     }
//   });

//   const data = this.timeSeries.values.map(val => val.close);
//   this.chart.data.labels = labels;
//   this.chart.data.datasets[0].data = data;
//   this.resetZoom();

//   this.chart.update();

//   this.getLogo();
//   this.getRealTimePrice();

//   this.calcolaPrezzoMedio();
//   this.calcolaMigliorPrezzo();
// }

// calcolaPrezzoMedio(): void {
//   if (this.timeSeries && this.timeSeries.values.length > 0) {
//     const totalLow = this.timeSeries.values.reduce((sum, value) => sum + Number(value.low), 0);
//     const totalHigh = this.timeSeries.values.reduce((sum, value) => sum + Number(value.high), 0);
//     this.averagePrice = (totalLow + totalHigh) / (2 * this.timeSeries.values.length);
//   } else {
//     console.error('Nessun dato disponibile per calcolare il prezzo medio.');
//   }
// }

// calcolaMigliorPrezzo(): void {
//   if (this.timeSeries && this.timeSeries.values.length > 0) {
//     const bestPrice = Math.max(...this.timeSeries.values.map(value => Number(value.high)));
//     this.bestPrice = bestPrice;
//   } else {
//     console.log('Nessuna serie temporale disponibile.');
//   }
// }

// getFontSize(): number {
//   const width = window.innerWidth;
//   if (width < 576) {
//     return 7;
//   } else if (width < 768) {
//     return 7;
//   } else if (width < 992) {
//     return 9;
//   } else {
//     return 11;
//   }
// }

// initChart(): void {
//   if (this.chart) {
//     this.chart.destroy();
//   }
//   this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
//   if (!this.myChartRef) return;
//   const ctx = this.myChartRef.getContext('2d');
//   if (!ctx) return;

//   const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
//   const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

//   const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
//     const index = ctx.dataIndex;
//     const data = ctx.dataset.data as number[];
//     if (index === 0) {
//       return 'rgb(75, 192, 192)';
//     }
//     return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//   };

//   const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
//     const index = ctx.dataIndex;
//     const data = ctx.dataset.data as number[];
//     if (index === 0) {
//       return 'rgb(75, 192, 192)';
//     }
//     return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//   };

//   this.chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: [],
//       datasets: [{
//         label: 'Stock Price',
//         data: [],
//         borderColor: 'rgb(75, 192, 192)',
//         segment: {
//           borderColor: ctx => skipped(ctx) || down(ctx),
//           borderDash: ctx => skipped(ctx) ? [6, 6] : undefined
//         },
//         borderWidth: 1,
//         pointBackgroundColor: getPointBackgroundColor,
//         pointBorderColor: getPointBorderColor
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: true,
//       animation: {
//         duration: 1100,
//         easing: 'linear'
//       },
//       scales: {
//         y: {
//           type: 'linear',
//           beginAtZero: true,
//           ticks: {
//             color: 'white'
//           },
//           grid: {
//             color: 'rgba(255, 255, 255, 0.2)'
//           }
//         },
//         x: {
//           ticks: {
//             color: 'white',
//             font: {
//               size: this.getFontSize()
//             },
//             maxRotation: 50,
//             minRotation: 0
//           },
//           grid: {
//             color: 'rgba(255, 255, 255, 0.2)'
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           display: false
//         },
//         zoom: {
//           pan: {
//             enabled: true,
//             mode: 'xy'
//           },
//           zoom: {
//             wheel: {
//               enabled: true, // Abilita lo zoom con la rotella del mouse
//             },
//             pinch: {
//               enabled: true // Abilita lo zoom con il pinch su dispositivi touch
//             },
//             mode: 'xy'
//           }
//         } 
//       }
//     }
//   });

//   this.myChartRef.style.backgroundColor = '#122036';
// }

// zoomIn(): void {
//   this.chart.zoom(1.1); // Zoom in by a factor of 1.1
// }

// zoomOut(): void {
//   this.chart.zoom(0.9); // Zoom out by a factor of 0.9
// }

// resetZoom(): void {
//   this.chart.resetZoom(); // Reset zoom to initial state
// }

// toggleFavorite(stock: any): void {
//   this.stock.favorite = !this.stock.favorite;
//   this.favoriteToggled.emit(stock);
//   console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`)
//   console.log(this.stock)
// }

// onTransactionUpdated(): void {
//   if (this.userId) {
//     this.authSrv.restore(); // Assicura che il saldo venga aggiornato
//   }
// }}
// // buyStock(): void {
// //   if (this.price !== undefined && this.userId !== null) {
// //     const request: TransactionRequest = {
// //       userId: this.userId,
// //       symbol: this.symbol,
// //       quantity: this.quantityToBuy,
// //       price: this.price
// //     };

// //     const cost = this.price * this.quantityToBuy;
// //     if (this.balance >= cost) {
// //       this.transactionService.buyStock(request).subscribe(
// //         (response: User) => {
// //           console.log('Server response:', response);
// //           if (response && response.balance !== undefined) {
// //             this.authSrv.updateUser(response);
// //             this.balance = response.balance || 0;
// //             console.log('Acquisto effettuato con successo');
// //             window.alert('Acquisto effettuato con successo');
// //           } else {
// //             console.error('Risposta del server non valida', response);
// //             window.alert('Errore durante l\'acquisto delle azioni');
// //           }
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'acquisto delle azioni', error);
// //           if (error.status === 400) {
// //             window.alert('Saldo insufficiente per completare l\'acquisto');
// //           } else {
// //             window.alert('Errore durante l\'acquisto delle azioni');
// //           }
// //         }
// //       );
// //     } else {
// //       window.alert('Saldo insufficiente per completare l\'acquisto');
// //     }
// //   } else {
// //     if (this.price === undefined) {
// //       console.warn('Prezzo non disponibile');
// //     }
// //     if (this.userId === null) {
// //       console.warn('Utente non autenticato');
// //     }
// //     window.alert('Prezzo non disponibile o utente non autenticato, impossibile completare l\'acquisto');
// //   }
// // }

// // sellStock(): void {
// //   if (this.price !== undefined && this.userId !== null) {
// //     const request: TransactionRequest = {
// //       userId: this.userId,
// //       symbol: this.symbol,
// //       quantity: this.quantityToSell,
// //       price: this.price
// //     };

// //     this.transactionService.sellStock(request).subscribe(
// //       (response: User) => {
// //         console.log('Server response:', response);
// //         if (response && response.balance !== undefined) {
// //           this.authSrv.updateUser(response);
// //           this.balance = response.balance || 0;
// //           console.log('Vendita effettuata con successo');
// //           window.alert('Vendita effettuata con successo');
// //         } else {
// //           console.error('Risposta del server non valida', response);
// //           window.alert('Errore durante la vendita delle azioni');
// //         }
// //       },
// //       (error) => {
// //         console.error('Errore durante la vendita delle azioni', error);
// //         window.alert('Errore durante la vendita delle azioni');
// //       }
// //     );
// //   } else {
// //     if (this.price === undefined) {
// //       console.warn('Prezzo non disponibile');
// //     }
// //     if (this.userId === null) {
// //       console.warn('Utente non autenticato');
// //     }
// //     window.alert('Prezzo non disponibile o utente non autenticato, impossibile completare la vendita');
// //   }
// // }





import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart, ScriptableContext, ScriptableLineSegmentContext, registerables } from 'chart.js';
import { environment } from 'src/app/environment/environment.development';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { LogoDto } from 'src/app/interface/logo-dto.interface';
import { QuoteBorse } from 'src/app/interface/quote-borse.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { StockList } from 'src/app/interface/stock-list.interface';
import { TimeSeries } from 'src/app/interface/time-series-data.interface';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { QuoteBorseService } from 'src/app/service/quote-borse.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';
import { TimeSeriesBorseService } from 'src/app/service/time-series-borse.service';
import zoomPlugin from 'chartjs-plugin-zoom';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';
import { Stock } from 'src/app/interface/stock.interface';

@Component({
  selector: 'app-borsa',
  templateUrl: './borsa.component.html',
  styleUrls: ['./borsa.component.scss']
})
export class BorsaComponent implements OnInit {
  @Output() favoriteToggled = new EventEmitter<any>();
  @Input() favorites: any[] = [];
  selectedInterval: string = '1day';
  interval: string = '1day';
  logoUrl: string | undefined;
  symbol: string = "AMZN";
  stocks: StockList[] = [];
  searchTerm: string = '';
  filteredStocks: StockList[] = [];
  price: number | undefined;
  quote: QuoteBorse | undefined;
  timeSeries: TimeSeries | undefined;
  stock: any = {};
  averagePrice: number = 0;
  bestPrice: number = 0;
  fromDate: string | null = '2024-06-17';
  toDate: string | null = '2024-06-22';
  userId: number | null = null;

  myChartRef!: HTMLCanvasElement | null;
  private chart!: Chart;

  constructor(
    private logoBorsaService: LogoBorsaService,
    private stockListService: StockListService,
    private realTimePriceService: RealTimePriceService,
    private timeSeriesBorseService: TimeSeriesBorseService,
    private quoteBorseService: QuoteBorseService,
    private http: HttpClient,
    private authSrv: AuthService,
    private modalService: NgbModal,
    private translate: TranslateService
  ) {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      if (data && data.user) {
        this.userId = data.user.idUtente || null;
      } else {
        console.warn('Utente non autenticato');
      }
    });

    this.getTimeSeries(this.interval);
    this.getStocks();
    this.initChart();
    this.getLogo();
    setTimeout(() => {
      this.onSymbolChange(this.symbol);
    }, 100);
    setInterval(() => {
      this.getRealTimePrice();
    }, 60000);
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  selectSymbol(symbol: string): void {
    this.symbol = symbol;
  }

  openModal(content: TemplateRef<any>, symbol: string) {
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.symbol = symbol;
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    if (this.searchTerm.length > 0) {
      this.filteredStocks = this.stocks.filter(stock => stock.symbol.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredStocks = [];
    }
  }

  selectStock(selectedSymbol: string): void {
    this.symbol = selectedSymbol;
    this.searchTerm = '';
    this.filteredStocks = [];
    this.onSymbolChange(this.symbol);
  }

  getLogo(): void {
    if (this.symbol) {
      this.logoBorsaService.getLogo(this.symbol).subscribe(
        (response: LogoBorsa) => {
          this.logoUrl = response.url ? response.url : undefined;
          this.stock.logoUrl = response.url ? response.url : undefined;
        },
        (error) => {
          console.error('Errore durante il recupero del logo', error);
        }
      );
    } else {
      console.error('Simbolo non inserito');
    }
  }

  getStocks(): void {
    this.logoBorsaService.getAllLogos().subscribe(
      (response: LogoDto[]) => {
        let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
        let filter2: LogoDto[] = [];
        filteredStocks.forEach(logo => {
          let image = new Image();
          image.src = logo.url;
          image.onload = function () {
            filter2.push(logo);
          }
          image.onerror = function () {
          }
        });
        setTimeout(() => {
          this.stockListService.getStockList().subscribe((response: StockList[]) => {
            this.stocks = response.filter(stock => {
              return filter2.map(logo => logo.symbol).includes(stock.symbol);
            });
          });
        }, 2000);
      },
      (error) => {
        console.error('Errore durante il recupero della lista delle azioni', error);
        this.stocks = [];
      }
    );
  }

  getRealTimePrice(): void {
    if (this.symbol) {
      this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
        (response: RealTimePriceResponse) => {
          this.stocks.forEach((stock) => {
            if (stock.symbol === this.symbol) {
              this.stock.name = stock.name;
            }
          });
          this.price = response.price;
          this.stock.price = response.price;
          this.getPreviousClosePrice(response.price);
        },
        (error) => {
          console.error(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), error);
        }
      );
    } else {
      console.error('Simbolo non inserito');
    }
  }

  getPreviousClosePrice(currentPrice: number): void {
    this.quoteBorseService.getQuote(this.symbol).subscribe(
      (response: QuoteBorse) => {
        const previousClose = Number(response.previous_close);
        this.stock.increased = currentPrice >= previousClose;
      },
      (error) => {
        console.error(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), error);
      }
    );
  }

  updateTimeSeries(interval: string): void {
    this.getTimeSeries(interval);
  }

  onDateRangeSelected(event: { fromDate: string, toDate: string }): void {
    this.fromDate = event.fromDate;
    this.toDate = event.toDate;
    this.getTimeSeries(this.interval);
  }

  getTimeSeries(interval: string): void {
    if (this.symbol && this.fromDate && this.toDate) {
      this.timeSeriesBorseService.getTimeSeries(this.symbol, interval, this.fromDate, this.toDate).subscribe(
        (response: any) => {
          if (response.values && response.values.length > 0) {
            response.values.forEach((value: any) => {
              value.low = Number(value.low);
              value.high = Number(value.high);
            });

            response.values.sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

            this.timeSeries = response;
            this.updateChart();
            this.calcolaPrezzoMedio();
            this.calcolaMigliorPrezzo();
          } else {
            console.error('Dati delle serie temporali non disponibili');
          }
        },
        (error) => {
          console.error('Errore durante il recupero delle serie temporali', error);
        }
      );
    } else {
      console.error('Simbolo o intervallo di date non impostati');
    }
  }

  onSubmit(): void {
    this.getTimeSeries(this.interval);
  }

  onIntervalChange(newInterval: string): void {
    this.interval = newInterval;
    this.selectedInterval = newInterval;
    this.getTimeSeries(this.interval);
  }

  onSymbolChange(newSymbol: string): void {
    this.symbol = newSymbol;
    this.stock.symbol = newSymbol;
    this.getRealTimePrice();
    this.getTimeSeries(this.interval);
    this.updateChart();
    this.favorites.forEach(favorite => {
      if (favorite.symbol === this.stock.symbol) {
        this.stock.favorite = true;
      }
    });
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  updateChart(): void {
    if (!this.chart || !this.timeSeries || !this.timeSeries.values) return;

    const labels = this.timeSeries.values.map(val => {
      const dateTime = new Date(val.datetime);
      if (['1day', '1week', '1month'].includes(this.interval)) {
        return dateTime.toLocaleDateString();
      } else if (this.isMobile()) {
        if (this.interval.includes('min') || this.interval.includes('hour')) {
          return dateTime.toLocaleTimeString();
        } else {
          return dateTime.toLocaleDateString();
        }
      } else {
        return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
      }
    });

    const data = this.timeSeries.values.map(val => val.close);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.resetZoom();

    this.chart.update();

    this.getLogo();
    this.getRealTimePrice();

    this.calcolaPrezzoMedio();
    this.calcolaMigliorPrezzo();
  }

  calcolaPrezzoMedio(): void {
    if (this.timeSeries && this.timeSeries.values.length > 0) {
      const totalLow = this.timeSeries.values.reduce((sum, value) => sum + Number(value.low), 0);
      const totalHigh = this.timeSeries.values.reduce((sum, value) => sum + Number(value.high), 0);
      this.averagePrice = (totalLow + totalHigh) / (2 * this.timeSeries.values.length);
    } else {
      console.error('Nessun dato disponibile per calcolare il prezzo medio.');
    }
  }

  calcolaMigliorPrezzo(): void {
    if (this.timeSeries && this.timeSeries.values.length > 0) {
      const bestPrice = Math.max(...this.timeSeries.values.map(value => Number(value.high)));
      this.bestPrice = bestPrice;
    } else {
      console.log('Nessuna serie temporale disponibile.');
    }
  }

  getFontSize(): number {
    const width = window.innerWidth;
    if (width < 576) {
      return 7;
    } else if (width < 768) {
      return 7;
    } else if (width < 992) {
      return 9;
    } else {
      return 11;
    }
  }

  initChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
    if (!this.myChartRef) return;
    const ctx = this.myChartRef.getContext('2d');
    if (!ctx) return;

    const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
    const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

    const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
      const index = ctx.dataIndex;
      const data = ctx.dataset.data as number[];
      if (index === 0) {
        return 'rgb(75, 192, 192)';
      }
      return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
    };

    const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
      const index = ctx.dataIndex;
      const data = ctx.dataset.data as number[];
      if (index === 0) {
        return 'rgb(75, 192, 192)';
      }
      return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Stock Price',
          data: [],
          borderColor: 'rgb(75, 192, 192)',
          segment: {
            borderColor: ctx => skipped(ctx) || down(ctx),
            borderDash: ctx => skipped(ctx) ? [6, 6] : undefined
          },
          borderWidth: 1,
          pointBackgroundColor: getPointBackgroundColor,
          pointBorderColor: getPointBorderColor
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 1100,
          easing: 'linear'
        },
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          x: {
            ticks: {
              color: 'white',
              font: {
                size: this.getFontSize()
              },
              maxRotation: 50,
              minRotation: 0
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            }
          }
        }
      }
    });

    this.myChartRef.style.backgroundColor = '#122036';
  }

  zoomIn(): void {
    this.chart.zoom(1.1);
  }

  zoomOut(): void {
    this.chart.zoom(0.9);
  }

  resetZoom(): void {
    this.chart.resetZoom();
  }

  toggleFavorite(stock: any): void {
    this.stock.favorite = !this.stock.favorite;
    this.favoriteToggled.emit(stock);
    console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
  }

  onTransactionUpdated(): void {
    if (this.userId) {
      this.authSrv.restore();
    }
  }
}
