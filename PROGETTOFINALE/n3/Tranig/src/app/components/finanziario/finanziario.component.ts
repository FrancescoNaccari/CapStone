import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ScriptableContext, ScriptableLineSegmentContext } from 'chart.js';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { StockList } from 'src/app/interface/stock-list.interface';
import { TimeSeries } from 'src/app/interface/time-series-data.interface';
import { FinanziarioService } from 'src/app/service/finanziario.service';
import { TwelveDataService } from 'src/app/service/twelve-data.service';

@Component({
  selector: 'app-finanziario',
  templateUrl: './finanziario.component.html',
  styleUrls: ['./finanziario.component.scss']
})
export class FinanziarioComponent {
  // timeSeriesData: TimeSeries | undefined;
  // stockList: StockList[] | undefined;
  // symbol: string = 'AMZN';
  // exchange: string = 'NASDAQ';

  // constructor(private finanziarioService: FinanziarioService) { }

  // ngOnInit(): void {
  //   this.fetchTimeSeries();
  //   this.fetchStockList();
  // }

  // fetchTimeSeries(): void {
  //   this.finanziarioService.getTimeSeries(this.symbol).subscribe(
  //     data => {
  //       this.timeSeriesData = data;
  //       console.log(this.timeSeriesData);
  //     },
  //     error => {
  //       console.error('Error fetching time series data', error);
  //     }
  //   );
  // }

  // fetchStockList(): void {
  //   this.finanziarioService.getStocks(this.exchange).subscribe(
  //     data => {
  //       this.stockList = data;
  //       console.log(this.stockList);
  //     },
  //     error => {
  //       console.error('Error fetching stock list', error);
  //     }
  //   );
  // }



//SECONDa PROVA



//   @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;
//   private chart!: Chart;
//   stock: any = {};
//   timeSeriesData: TimeSeries | undefined;
//   stockList: StockList[] | undefined;
//   symbol: string = 'AMZN';
//   exchange: string = 'NASDAQ';

//   constructor(private finanziarioService: FinanziarioService) {}

//   ngOnInit(): void {
//     this.fetchTimeSeries();
//     this.fetchStockList();
//   }

//   fetchTimeSeries(): void {
//     this.finanziarioService.getTimeSeries(this.symbol).subscribe(
//       data => {
//         this.timeSeriesData = data;
//         console.log(this.timeSeriesData);
//         this.initChart();
//       },
//       error => {
//         console.error('Error fetching time series data', error);
//       }
//     );
//   }

//   fetchStockList(): void {
//     this.finanziarioService.getStocks(this.exchange).subscribe(
//       data => {
//         this.stockList = data;
//         console.log(this.stockList);
//       },
//       error => {
//         console.error('Error fetching stock list', error);
//       }
//     );
//   }

//   initChart(): void {
//     const canvas = this.myChartRef.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
//     const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

//     const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
//       const index = ctx.dataIndex;
//       const data = ctx.dataset.data as number[];
//       if (index === 0) {
//         return 'rgb(75, 192, 192)';
//       }
//       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };

//     const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
//       const index = ctx.dataIndex;
//       const data = ctx.dataset.data as number[];
//       if (index === 0) {
//         return 'rgb(75, 192, 192)';
//       }
//       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };

//     const labels = this.timeSeriesData?.values.map(value => value.datetime.toLocaleDateString()) || [];
//     const data = this.timeSeriesData?.values.map(value => value.close) || [];

//     const config: ChartConfiguration<'line'> = {
//       type: 'line',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Stock Price',
//           data: data,
//           borderColor: 'rgb(75, 192, 192)',
//           segment: {
//             borderColor: ctx => skipped(ctx) || down(ctx),
//             borderDash: ctx => skipped(ctx) ? [6, 6] : undefined
//           },
//           borderWidth: 1,
//           pointBackgroundColor: getPointBackgroundColor,
//           pointBorderColor: getPointBorderColor
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: true,
//         animation: {
//           duration: 1100,
//           easing: 'linear'
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               color: 'white'
//             },
//             grid: {
//               color: 'rgba(255, 255, 255, 0.2)'
//             }
//           },
//           x: {
//             ticks: {
//               color: 'white'
//             },
//             grid: {
//               color: ''
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             display: false
//           }
//         }
//       }
//     };

//     this.chart = new Chart(ctx, config);
//     canvas.style.backgroundColor = '#122036';
//   }
// }























// @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;
// private chart!: Chart;
// stock: any = {};
// timeSeriesData: TimeSeries | undefined;
// stockList: StockList[] | undefined;
// symbol: string = 'AMZN';
// exchange: string = 'NASDAQ';

// // Inizializza il componente e chiama i metodi per recuperare i dati iniziali
// constructor(private finanziarioService: FinanziarioService) {}

// ngOnInit(): void {
//     this.fetchTimeSeries();
//     this.fetchStockList();
// }

// // Metodo per recuperare i dati della serie temporale
// fetchTimeSeries(): void {
//     this.finanziarioService.getTimeSeries(this.symbol).subscribe(
//         data => {
//             this.timeSeriesData = data;
//             console.log(this.timeSeriesData);
//             this.initChart(); // Inizializza il grafico dopo aver recuperato i dati
//         },
//         error => {
//             console.error('Error fetching time series data', error);
//         }
//     );
// }

// // Metodo per recuperare l'elenco delle azioni
// fetchStockList(): void {
//     this.finanziarioService.getStocks(this.exchange).subscribe(
//         data => {
//             this.stockList = data;
//             console.log(this.stockList);
//         },
//         error => {
//             console.error('Error fetching stock list', error);
//         }
//     );
// }

// // Metodo per inizializzare il grafico con i dati recuperati
// initChart(): void {
//     // Ottieni il riferimento al canvas e il contesto di disegno
//     const canvas = this.myChartRef.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     if (this.chart) {
//       this.chart.destroy(); // Distruggi il grafico esistente
//   }
//     const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
//     const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

//     const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
//         const index = ctx.dataIndex;
//         const data = ctx.dataset.data as number[];
//         if (index === 0) {
//             return 'rgb(75, 192, 192)';
//         }
//         return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };

//     const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
//         const index = ctx.dataIndex;
//         const data = ctx.dataset.data as number[];
//         if (index === 0) {
//             return 'rgb(75, 192, 192)';
//         }
//         return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };

//     const labels = this.timeSeriesData?.values.map(value => value.datetime.toLocaleDateString()) || [];
//     const data = this.timeSeriesData?.values.map(value => value.close) || [];

//     const config: ChartConfiguration<'line'> = {
//         type: 'line',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Stock Price',
//                 data: data,
//                 borderColor: 'rgb(75, 192, 192)',
//                 segment: {
//                     borderColor: ctx => skipped(ctx) || down(ctx),
//                     borderDash: ctx => skipped(ctx) ? [6, 6] : undefined
//                 },
//                 borderWidth: 1,
//                 pointBackgroundColor: getPointBackgroundColor,
//                 pointBorderColor: getPointBorderColor
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: true,
//             animation: {
//                 duration: 1100,
//                 easing: 'linear'
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     ticks: {
//                         color: 'white'
//                     },
//                     grid: {
//                         color: 'rgba(255, 255, 255, 0.2)'
//                     }
//                 },
//                 x: {
//                     ticks: {
//                         color: 'white'
//                     },
//                     grid: {
//                         color: ''
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 }
//             }
//         }
//     };
//     // Inizializza il grafico con la configurazione definita
//     this.chart = new Chart(ctx, config);
//     canvas.style.backgroundColor = '#122036'; // Imposta lo sfondo del canvas
// }

// // Metodo per aggiornare i dati
// refreshData(): void {
//   this.fetchTimeSeries();
//   this.fetchStockList();
// }

// // Metodo per cambiare il simbolo delle azioni
// changeSymbol(newSymbol: string): void {
//   this.symbol = newSymbol;
//   this.fetchTimeSeries();
// }

// searchQuery: string = '';
// searchStock(): void {
//   // Assicurati che la query di ricerca non sia vuota
//   if (this.searchQuery.trim()!== '') {
//       // Chiamata al servizio finanziario per cercare la borsa
//       this.finanziarioService.searchStock(this.searchQuery).subscribe(
//           data => {
//               // Aggiorna l'elenco delle borse con i risultati della ricerca
//               this.stockList = data;
//               // Inizializza il grafico con i nuovi dati della ricerca
//               this.initChart();
//           },
//           error => {
//               console.error('Error searching stock', error);
//           }
//       );
//   }
// }







// ----------------BOZZA DEL COMPONETNTS BORSA ----------------


/*

import { Component, OnInit } from '@angular/core';
import { Chart, ScriptableContext, ScriptableLineSegmentContext, ChartData, registerables } from 'chart.js';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { QuoteBorse } from 'src/app/interface/quote-borse.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { StockList } from 'src/app/interface/stock-list.interface';
import { TimeSeries } from 'src/app/interface/time-series-data.interface';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { QuoteBorseService } from 'src/app/service/quote-borse.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';
import { TimeSeriesBorseService } from 'src/app/service/time-series-borse.service';



@Component({
  selector: 'app-borsa',
  templateUrl: './borsa.component.html',
  styleUrls: ['./borsa.component.scss']
})
export class BorsaComponent implements OnInit {
//   logoUrl: string | undefined;
//   symbol: string = '';

  
//   stocks: StockList[] = []; // Utilizza l'interfaccia StockList
//   exchange: string = ''; // Permette all'utente di inserire l'exchange
  
  
//   price: number | undefined;


//   quote: QuoteBorse | undefined;

//   timeSeries: TimeSeries | undefined;
  
//   constructor(private logoBorsaService: LogoBorsaService,
//     private stockListService: StockListService,
//     private realTimePriceService: RealTimePriceService,
//     private quoteService: QuoteBorseService,
//     private timeSeriesBorseService: TimeSeriesBorseService) {}
//   ngOnInit(): void {
//     this.getLogo()

//   }

//   getLogo(): void {
//     if (this.symbol) {
//       this.logoBorsaService.getLogo(this.symbol).subscribe(
//         (response: LogoBorsa) => {
//           this.logoUrl = response.url;
//           console.log(response.url);
//         },
//         (error) => {
//           console.error('Errore durante il recupero del logo', error);
//         }
//       );
//     } else {
//       console.error('Simbolo non inserito');
//     }
    
//   }

//   getStocks(): void {
//     if (this.exchange) {
//       this.stockListService.getStockList(this.exchange).subscribe(
//         (response: StockList[]) => {
//           this.stocks = response;
//           console.log(this.stocks);
//         },
//         (error) => {
//           console.error('Errore durante il recupero della lista delle azioni', error);
//         }
//       );
//     } else {
//       console.error('Exchange non inserito');
//     }
//   }



//   getRealTimePrice(): void {
//     if (this.symbol) {
//       this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//         (response: RealTimePriceResponse) => {
//           this.price = response.price;
//           console.log(this.price);
//         },
//         (error) => {
//           console.error('Errore durante il recupero del prezzo in tempo reale', error);
//         }
//       );
//     } else {
//       console.error('Simbolo non inserito');
//     }
//   }




//   getQuote(): void {
//     if (this.symbol) {
//       this.quoteService.getQuote(this.symbol).subscribe(
//         (response: QuoteBorse) => {
//           this.quote = response;
//           console.log(this.quote);
//         },
//         (error) => {
//           console.error('Errore durante il recupero del prezzo in tempo reale', error);
//         }
//       );
//     } else {
//       console.error('Simbolo non inserito');
//     }
//   }




//   getTimeSeries(): void {
//     if (this.symbol) {
//       this.timeSeriesBorseService.getTimeSeries(this.symbol).subscribe(
//         (response: TimeSeries) => {
//           this.timeSeries = response;
//           console.log(this.timeSeries);
//         },
//         (error) => {
//           console.error('Errore durante il recupero delle serie temporali', error);
//         }
//       );
//     } else {
//       console.error('Simbolo non inserito');
//     }
//   }


// }



interval: string = '1day'; // Impostazione di default
logoUrl: string | undefined;
symbol: string = "AMZN";// Impostazione di default
stocks: StockList[] = []; //lista per popolare la lista del form sui nomi dey symbol 
// exchange: string ="NASDAQ";
price: number | undefined;//prezzo singolo tempo reale
quote: QuoteBorse | undefined;
timeSeries: TimeSeries | undefined;
stock: any = {}; // Adjust according to your actual stock data structure
averagePrice: number = 0;
bestPrice: number = 0;

myChartRef!: HTMLCanvasElement | null; // Riferimento al canvas del grafico
  private chart!: Chart; // Istanza del grafico

constructor(
  private logoBorsaService: LogoBorsaService,
  private stockListService: StockListService,
  private realTimePriceService: RealTimePriceService,
  private quoteService: QuoteBorseService,
  private timeSeriesBorseService: TimeSeriesBorseService
) { // Registra la scala 'linear' durante l'inizializzazione del componente
  Chart.register(...registerables);}

ngOnInit(): void {
  this.getStocks();
  this.getTimeSeries(this.interval);
  this.initChart();
  this.getLogo();

  
   // Aggiorna il prezzo ogni 10 secondi
  setInterval(() => {
    this.getRealTimePrice();
  }, 30000);
}


// getLogo(): void {
//   if (this.symbol) {
//     this.logoBorsaService.getLogo(this.symbol).subscribe(
//       (response: LogoBorsa) => {
//         this.logoUrl = response.url;
//         console.log(response.url);
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
//   if (this.exchange) {
//     this.stockListService.getStockList(this.exchange).subscribe(
//       (response: StockList[]) => {
//         this.stocks = response;
//         console.log(this.stocks);
//       },
//       (error) => {
//         console.error('Errore durante il recupero della lista delle azioni', error);
//       }
//     );
//   } else {
//     console.error('Exchange non inserito');
//   }
// }


// getRealTimePrice(): void {
//   if (this.symbol) {
//     this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//       (response: RealTimePriceResponse) => {
//         this.price = response.price;
//         this.stock.price = response.price;
//         this.stock.increased = response.price >= (Number(this.quote?.previous_close) || 0);
//         console.log(this.price);
//       },
//       (error) => {
//         console.error('Errore durante il recupero del prezzo in tempo reale', error);
//       }
//     );
//   } else {
//     console.error('Simbolo non inserito');
//   }
// }

// getQuote(): void {
//   if (this.symbol) {
//     this.quoteService.getQuote(this.symbol).subscribe(
//       (response: QuoteBorse) => {
//         this.quote = response;
//         console.log(this.quote);
//       },
//       (error) => {
//         console.error('Errore durante il recupero del prezzo in tempo reale', error);
//       }
//     );
//   } else {
//     console.error('Simbolo non inserito');
//   }
// }

// getTimeSeries(interval: string): void {
//   if (this.symbol) {
//     this.timeSeriesBorseService.getTimeSeries(this.symbol).subscribe(
//       (response: TimeSeries) => {
//         this.timeSeries = response;
//         console.log(this.timeSeries);
//         this.updateChart();
//         this.calculatePrices();
//       },
//       (error) => {
//         console.error('Errore durante il recupero delle serie temporali', error);
//       }
//     );
//   } else {
//     console.error('Simbolo non inserito');
//   }
// }

// updateTimeSeries(interval: string): void {
//   this.getTimeSeries(interval);
// }



// updateChart(): void {
//   if (this.chart && this.timeSeries) {
//     const labels = this.timeSeries.values.map(v => v.datetime);
//     const data = this.timeSeries.values.map(v => v.close);

//     this.chart.data.labels = labels;
//     this.chart.data.datasets[0].data = data;
//     this.chart.update();
//   }
// }

// calculatePrices(): void {
//   if (this.timeSeries) {
//     const prices = this.timeSeries.values.map(v => v.close);
//     this.averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
//     this.bestPrice = Math.max(...prices);
//   }
// }

// // Funzione per ottenere il logo di un'azienda
// getLogo(): void {
//   if (this.symbol) {
//     // Se il simbolo è presente, chiama il servizio per ottenere il logo
//     this.logoBorsaService.getLogo(this.symbol).subscribe(
//       (response: LogoBorsa) => {
//         this.logoUrl = response.url; // Salva l'URL del logo
//         console.log(response.url); // Stampa l'URL del logo nella console
//       },
//       (error) => {
//         console.error('Errore durante il recupero del logo', error); // Stampa un messaggio di errore in caso di fallimento
//       }
//     );
//   } else {
//     console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
//   }
// }


getLogo(): void {
  console.log('Chiamato getLogo()');
  if (this.symbol) {
    this.logoBorsaService.getLogo(this.symbol).subscribe(
      (response: LogoBorsa) => {
        this.logoUrl = response.url;
        console.log('URL del logo:', response.url);
      },
      (error) => {
        console.error('Errore durante il recupero del logo', error);
      }
    );
  } else {
    console.error('Simbolo non inserito');
  }
}




// Funzione per ottenere la lista delle azioni(lista dei symbol)
  getStocks(): void {
    this.stockListService.getStockList().subscribe(
      (response: StockList[]) => {
        this.stocks = response;
        console.log(this.stocks); // Stampa la lista delle azioni nella console
      },
      (error) => {
        console.error('Errore durante il recupero della lista delle azioni', error);
        this.stocks = [];
      }
    );
  }


// Funzione per ottenere il prezzo in tempo reale di un'azione(da utilizare come singolo dato in tempo reale)
getRealTimePrice(): void {
  if (this.symbol) {
    // Se il simbolo è presente, chiama il servizio per ottenere il prezzo in tempo reale
    this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
      (response: RealTimePriceResponse) => {
        this.price = response.price; // Salva il prezzo attuale
        this.stock.price = response.price; // Aggiorna il prezzo dell'azione
        this.stock.increased = response.price >= (Number(this.quote?.previous_close) || 0); // Verifica se il prezzo è aumentato rispetto alla chiusura precedente
        console.log(this.price); // Stampa il prezzo nella console
      },
      (error) => {
        console.error('Errore durante il recupero del prezzo in tempo reale', error); // Stampa un messaggio di errore in caso di fallimento
      }
    );
  } else {
    console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
  }
}





// Funzione per ottenere la quotazione di un'azione(possibilità di cambiare da "1D" a diververse giornate (1giorno-settiname-anni))
//passando anche il valore "interval" si puo decidere quele intervalo prendere(1giorno-settiname-anni)
getQuote(): void {
  if (this.symbol) {
    // Se il simbolo è presente, chiama il servizio per ottenere la quotazione
    this.quoteService.getQuote(this.symbol).subscribe(
      (response: QuoteBorse) => {
        this.quote = response; // Salva la quotazione
        console.log(this.quote); // Stampa la quotazione nella console
      },
      (error) => {
        console.error('Errore durante il recupero del prezzo in tempo reale', error); // Stampa un messaggio di errore in caso di fallimento
      }
    );
  } else {
    console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
  }
}



// Funzione per aggiornare le serie temporali
updateTimeSeries(interval: string): void {
  this.getTimeSeries(interval); // Chiama la funzione per ottenere le serie temporali con il nuovo intervallo
}


// Funzione per ottenere le serie temporali di un'azione
//PREZZO MENSILI PER QUELLA SINGOLA BORSA( CHIAMANDO UNA BORSA SPECIFICA ) (dati: giorno per giono con i vari valore delle azioni)
getTimeSeries(interval: string): void {
  if (this.symbol) {
    // Se il simbolo è presente, chiama il servizio per ottenere le serie temporali
    this.timeSeriesBorseService.getTimeSeries(this.symbol, interval).subscribe(
      (response: TimeSeries) => {
    // Converti i valori low e high in numeri
    response.values.forEach(value => {
      value.low = Number(value.low);
      value.high = Number(value.high);
    });

        this.timeSeries = response; // Salva le serie temporali
        console.log(this.timeSeries); // Stampa le serie temporali nella console
        this.updateChart(); // Aggiorna il grafico con i nuovi dati
        this.calcolaPrezzoMedio();  // Calcola il prezzo medio e il miglior prezzo
        this.calcolaMigliorPrezzo(); // Calcola il miglior prezzo dopo aver ottenuto la serie temporale
      },
      (error) => {
        console.error('Errore durante il recupero delle serie temporali', error); // Stampa un messaggio di errore in caso di fallimento
      }
    );
  } else {
    console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
  }
}

  



  // Funzione per gestire la submit del form
  onSubmit(): void {
    this.getTimeSeries(this.interval);
    console.log('Simbolo selezionato:', this.symbol);
    console.log('Intervallo selezionato:', this.interval);
  }


// // Funzione per aggiornare il grafico con i nuovi dati
// updateChart(): void {
//   if (!this.chart) {
//     this.initChart(); // Inizializza il grafico se non è ancora stato fatto
//   }

//   if (this.chart && this.timeSeries && this.timeSeries.values) {
//     const labels = this.timeSeries.values.map(v => v.datetime); // Estrae le etichette (datetime) dai dati delle serie temporali
//     const data = this.timeSeries.values.map(v => parseFloat(v.close.toString())); // Estrae i dati (prezzi di chiusura) dalle serie temporali

//     this.chart.data.labels = labels; // Aggiorna le etichette del grafico
//     this.chart.data.datasets[0].data = data; // Aggiorna i dati del grafico
//     this.chart.update(); // Aggiorna il grafico
//   }
// }




updateChart(): void {
  if (!this.chart || !this.timeSeries || !this.timeSeries.values) return;

  const labels = this.timeSeries.values.map(val => val.datetime);
  const data = this.timeSeries.values.map(val => val.close);

  this.chart.data.labels = labels;
  this.chart.data.datasets[0].data = data;
  this.chart.update();

  // Aggiorna il logo dopo aver aggiornato il grafico
  this.getLogo();
  this.getRealTimePrice();
  
this.calcolaPrezzoMedio();
this.calcolaMigliorPrezzo();
}



// updateChart(): void {
//   if (!this.chart || !this.timeSeries || !this.timeSeries.values) return;

//   const labels = this.timeSeries.values.map(val => val.datetime);
//   const data = this.timeSeries.values.map(val => val.close);

//   this.chart.data.labels = labels;
//   this.chart.data.datasets[0].data = data;
//   this.chart.update();
// }



// // Funzione per calcolare il prezzo medio e il miglior prezzo
// calculatePrices(): void {
//   if (this.timeSeries) {
//     const prices = this.timeSeries.values.map(v => v.close); // Estrae i prezzi di chiusura dalle serie temporali
//     this.averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length; // Calcola il prezzo medio
//     this.bestPrice = Math.max(...prices); // Trova il miglior prezzo (il più alto)
//     console.log(this.bestPrice, this.averagePrice)
//   }
// }

// calculatePrices(): void {
//   if (this.timeSeries) {
//     const totalLowHigh = this.timeSeries.values.reduce((acc, val) => acc + val.low + val.high, 0);
//     const totalPrices = this.timeSeries.values.length * 2; // Moltiplichiamo per 2 poiché abbiamo sia i prezzi 'low' che 'high'
//     this.averagePrice = totalLowHigh / totalPrices;
//     this.bestPrice = Math.max(...this.timeSeries.values.map(val => val.high));
//     console.log(this.bestPrice, this.averagePrice);
//   }
// }

calcolaPrezzoMedio(): void {
  if (this.timeSeries && this.timeSeries.values.length > 0) {
    const totalLow = this.timeSeries.values.reduce((sum, value) => sum + Number(value.low), 0);
    const totalHigh = this.timeSeries.values.reduce((sum, value) => sum + Number(value.high), 0);
    this.averagePrice = (totalLow + totalHigh) / (2 * this.timeSeries.values.length);
    console.log('Prezzo Medio:', this.averagePrice);
  } else {
    console.error('Nessun dato disponibile per calcolare il prezzo medio.');
  }
}

calcolaMigliorPrezzo(): void {
  if (this.timeSeries && this.timeSeries.values.length > 0) {
    const bestPrice = Math.max(...this.timeSeries.values.map(value => Number(value.high)));
    this.bestPrice = bestPrice;
    console.log('Miglior Prezzo:', bestPrice);
  } else {
    console.log('Nessuna serie temporale disponibile.');
  }
}

 // Inizializzazione del grafico
 initChart(): void {
  if (this.chart) {
    this.chart.destroy(); // Distruggi il grafico esistente se presente
  }
  this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
  if (!this.myChartRef) return;
  const ctx = this.myChartRef.getContext('2d');
  if (!ctx) return

  // Funzioni per determinare il colore delle linee del grafico
  const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
  const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ?  'rgb(192,75,75)' : undefined;

  // Funzione per determinare il colore dei punti del grafico
  const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
    const index = ctx.dataIndex;
    const data = ctx.dataset.data as number[];
    if (index === 0) {
      return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
    }
    return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
  };

  const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
    const index = ctx.dataIndex;
    const data = ctx.dataset.data as number[];
    if (index === 0) {
      return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
    }
    return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
  };

  // Configurazione del grafico
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
          borderDash: ctx => skipped(ctx)? [6, 6] : undefined},
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
          type: 'linear', // Assicurati che la scala sia configurata come 'linear'
          beginAtZero: true,
          ticks: {
            color: 'white' // Colore delle etichette dell'asse Y
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Colore delle linee della griglia dell'asse Y
          }
        },
        x: {
          ticks: {
            color: 'white' // Colore delle etichette dell'asse X
          },
          grid: {
            color: '' // Colore delle linee della griglia dell'asse X
          }
        }
      },
      plugins: {
        legend: {
          display: false // Disabilitazione della legenda predefinita
        }
      }
    }
  });

  // Impostazione del colore di sfondo del canvas
  this.myChartRef.style.backgroundColor = '#122036';
}
}



*/ 






}