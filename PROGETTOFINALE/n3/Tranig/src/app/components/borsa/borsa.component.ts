import { Component, OnInit } from '@angular/core';
import { Chart, ScriptableContext, ScriptableLineSegmentContext, ChartData, registerables } from 'chart.js';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { QuoteBorse } from 'src/app/interface/quote-borse.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { StockList } from 'src/app/interface/stock-list.interface';
import { TimeSeries } from 'src/app/interface/time-series-data.interface';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
// import { QuoteBorseService } from 'src/app/service/quote-borse.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';
import { TimeSeriesBorseService } from 'src/app/service/time-series-borse.service';



@Component({
  selector: 'app-borsa',
  templateUrl: './borsa.component.html',
  styleUrls: ['./borsa.component.scss']
})
export class BorsaComponent implements OnInit {


  selectedInterval: string = '1day'; // Intervallo selezionato
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
    // private quoteService: QuoteBorseService,
    private timeSeriesBorseService: TimeSeriesBorseService
  ) { // Registra la scala 'linear' durante l'inizializzazione del componente
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getTimeSeries(this.interval);
    this.getStocks();
    this.initChart();
    this.getLogo();


    // Aggiorna il prezzo ogni 10 secondi
    setInterval(() => {
      this.getRealTimePrice();
    }, 30000);
  }
  ngAfterViewInit(): void {
    this.initChart();
  }

  selectStock(selectedSymbol: string): void {
    this.symbol = selectedSymbol;
    console.log(`Symbol selected: ${this.symbol}`);
    this.onSymbolChange(this.symbol); // Chiamata alla funzione per gestire il cambio di simbolo
  }


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
  // getQuote(): void {
  //   if (this.symbol) {
  //     // Se il simbolo è presente, chiama il servizio per ottenere la quotazione
  //     this.quoteService.getQuote(this.symbol).subscribe(
  //       (response: QuoteBorse) => {
  //         this.quote = response; // Salva la quotazione
  //         console.log(this.quote); // Stampa la quotazione nella console
  //       },
  //       (error) => {
  //         console.error('Errore durante il recupero del prezzo in tempo reale', error); // Stampa un messaggio di errore in caso di fallimento
  //       }
  //     );
  //   } else {
  //     console.error('Simbolo non inserito'); // Stampa un messaggio di errore se il simbolo non è presente
  //   }
  // }



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



  onIntervalChange(newInterval: string): void {
    this.interval = newInterval;
    this.selectedInterval = newInterval; // Imposta l'intervallo selezionato
    this.interval = newInterval;
    // Qui puoi fare ciò che desideri con il nuovo valore dell'intervallo, ad esempio aggiornare i dati
    console.log('Nuovo intervallo selezionato:', newInterval);
    // Chiamare le funzioni necessarie per aggiornare i dati
    this.getTimeSeries(this.interval);
    // Aggiornare il grafico
    this.updateChart();
  }

  onSymbolChange(newSymbol: string): void {
    // Qui puoi fare ciò che desideri con il nuovo valore del simbolo, ad esempio aggiornare i dati
    console.log('Nuovo simbolo selezionato:', newSymbol);
    // Chiamare le funzioni necessarie per aggiornare i dati
    this.getRealTimePrice();
    this.getTimeSeries(this.interval);
    // Aggiornare il grafico
    this.updateChart();
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
    this.chart.update();

    // Aggiorna il logo dopo aver aggiornato il grafico
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


  // Funzione per ottenere la dimensione del font in base alla larghezza della finestra
  getFontSize(): number {
    const width = window.innerWidth;
    if (width < 576) {
      return 8;
    } else if (width < 768) {
      return 10;
    } else if (width < 992) {
      return 12;
    } else {
      return 14;
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
    const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgb(192,75,75)' : undefined;

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
              color: 'white',
              font: {
                size: this.getFontSize() // Set initial font size
              },
              maxRotation: 50, // No rotation for better readability
              minRotation: 0,

            },

            grid: {
              color: 'rgba(255, 255, 255, 0.2)' // Colore delle linee della griglia dell'asse X
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

