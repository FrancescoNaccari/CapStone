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
  fromDate: string | null = '2024-06-20';
  toDate: string | null = '2024-07-10';
  userId: number | null = null;
  alertMessage: string | null = null;
  alertType: string = 'info';

  currentCartIcon: string = '../../../assets/img/ICON_BUY-ACQUISTARE-WH.png';
  defaultCartIcon: string = '../../../assets/img/ICON_BUY-ACQUISTARE-WH.png';
  hoverCartIcon: string = '../../../assets/img/ICON-buy.png';


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
  isUserAuthenticated(): boolean {
    return this.authSrv.isAuthenticated();
  }
  openModal(content: TemplateRef<any>, symbol: string) {
    if (!this.isUserAuthenticated()) {
      this.showAlert(this.translate.instant('alerts.LOGIN_REQUIRED'), 'danger');
      return;
    }
  
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: "static", keyboard: false });
    modalRef.result.then((result) => {
      this.currentCartIcon = this.defaultCartIcon;
    }, () => {
      this.currentCartIcon = this.defaultCartIcon;
    });
    modalRef.componentInstance.symbol = this.symbol;
    modalRef.componentInstance.currentPrice = this.stock.price;
    modalRef.componentInstance.userId = this.stock.userId;
  
    this.currentCartIcon = this.hoverCartIcon;
  }
  closeModal(modal: any) {
    modal.dismiss();
    this.currentCartIcon = this.defaultCartIcon;  // Ripristina l'icona originale alla chiusura del modal
  }
  changeCartIcon(): void {
    this.currentCartIcon = this.hoverCartIcon;
  }

  restoreCartIcon(): void {
    if (!this.modalService.hasOpenModals()) { // Se il modal non è aperto, ripristina l'icona originale
      this.currentCartIcon = this.defaultCartIcon;
    }
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
          console.log(this.price)
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
   
    this.myChartRef.style.backgroundColor = ' #010B2D';
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
    if (!this.isUserAuthenticated()) {
      this.showAlert(this.translate.instant('alerts.LOGIN_REQUIRED'), 'danger');
      return;
    }
  
    stock.favorite = !stock.favorite;
    this.favoriteToggled.emit(stock);
    this.showAlert(
      this.translate.instant(stock.favorite ? 'alerts.ADDED_TO_FAVORITES' : 'alerts.REMOVED_FROM_FAVORITES', { stockName: stock.name || stock.symbol }),
      stock.favorite ? 'success' : 'warning'
    );
  }

  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = null, 3000); // Nasconde l'alert dopo 3 secondi
  }

  onTransactionUpdated(): void {
    if (this.userId) {
      this.authSrv.restore();
    }
  }
}
