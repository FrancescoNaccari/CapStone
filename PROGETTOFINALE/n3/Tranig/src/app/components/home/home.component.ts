import { Component, HostListener, OnInit } from '@angular/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { LogoDto } from 'src/app/interface/logo-dto.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { StockList } from 'src/app/interface/stock-list.interface';
import { AuthService } from 'src/app/service/auth.service';

import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
//   stock: any = {};
//   symbol: string = 'AMZN';

//   constructor(
//     private stockListService: StockListService,
//     private realTimePriceService: RealTimePriceService,
//     private logoBorsaService: LogoBorsaService
//   ) { }

//   ngOnInit(): void {
//     this.getStockData();
//   }

//   getStockData(): void {
//     this.getRealTimePrice();
//     this.getLogo();
//   }

//   getLogo(): void {
//     this.logoBorsaService.getLogo(this.symbol).subscribe(
//       (response: LogoBorsa) => {
//         console.log('Logo URL:', response.url); // Debug log
//         this.stock.logo = response.url;
//       },
//       (error) => {
//         console.error('Error fetching logo', error);
//       }
//     );
//   }

//   getRealTimePrice(): void {
//     this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//       (response: RealTimePriceResponse) => {
//         console.log('Real-time price response:', response); // Debug log
//         this.stock.name = this.symbol;
//         this.stock.price = response.price;
//         this.stock.increased = true; // Adjust logic as necessary
//       },
//       (error) => {
//         console.error('Error fetching real-time price', error);
//       }
//     );
//   }
// }

// stock: any = {};
//   symbol: string = 'AMZN';

//   constructor(
//     private realTimePriceService: RealTimePriceService,
//     private logoBorsaService: LogoBorsaService
//   ) { }

//   ngOnInit(): void {
//     this.getStockData();
//   }

//   getStockData(): void {
//     this.getRealTimePrice();
//     this.getLogo();
//   }

//   getLogo(): void {
//     this.logoBorsaService.getLogo(this.symbol).subscribe(
//       (response: LogoBorsa) => {
//         console.log('Logo URL:', response.url); // Debug log
//         this.stock.logo = response.url;
//       },
//       (error) => {
//         console.error('Errore durante il recupero del logo', error);
//       }
//     );
//   }

//   getRealTimePrice(): void {
//     this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//       (response: RealTimePriceResponse) => {
//         console.log('Risposta del prezzo in tempo reale:', response); // Debug log
//         this.stock.name = this.symbol;
//         this.stock.price = response.price;
//         this.stock.increased = true; // Aggiusta la logica se necessario
//       },
//       (error) => {
//         console.error('Errore durante il recupero del prezzo in tempo reale', error);
//       }
//     );
//   }
// // }
// stock: any = {};
// symbol: string = 'AMZN';
// errorMessage: string | null = null;

// allStocks: any[] = [];
// displayedStocks: any[] = [];

// constructor(
//   private realTimePriceService: RealTimePriceService,
//   private logoBorsaService: LogoBorsaService,
//   private stockListService: StockListService
// ) { }

// ngOnInit(): void {
//   this.getStockData();
// }

// getStockData(): void {
//   this.getRealTimePrice();
//   this.getLogo();
// }

// getLogo(): void {
//   this.logoBorsaService.getLogo(this.symbol).subscribe(
//     (response: LogoBorsa) => {
//       console.log('Logo URL:', response.url);
//       if (response && response.url) {
//         this.stock.logo = response.url;
//       } else {
//         console.error('Logo URL non trovato nella risposta:', response);
//       }
//     },
//     (error) => {
//       this.errorMessage = error;
//       console.error('Errore durante il recupero del logo', error);
//     }
//   );
// }

// getRealTimePrice(): void {
//   this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//     (response: RealTimePriceResponse) => {
//       console.log('Risposta del prezzo in tempo reale:', response);
//       this.stock.name = this.symbol;
//       this.stock.price = response.price;
//       this.stock.increased = true; // Aggiusta la logica se necessario
//     },
//     (error) => {
//       console.error('Errore durante il recupero del prezzo in tempo reale', error);
//     }
//   );
// }
// }

// stock: any = {};
// symbol: string = '';
// errorMessage: string | null = null;
// user!: AuthData | null
// allStocks: any[] = [];
// displayedStocks: any[] = [];

// constructor(
//   private realTimePriceService: RealTimePriceService,
//   private logoBorsaService: LogoBorsaService,
//   private stockListService: StockListService,
//   private authSrv: AuthService
// ) { }

// ngOnInit(): void {
//   this.getStockData();
//   this.getStocks();
//   this.authSrv.user$.subscribe((data) => {
//     this.user = data
//   })
// }

// getStockData(): void {
//   this.getRealTimePrice();
//   this.getLogo();
// }

// getLogo(): void {
//   console.log(this.stock)
//   this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
//     (response: LogoBorsa) => {
//       console.log('Logo URL:', response.url);
//       if (response && response.url) {
     
//         this.stock.logo = response.url;
//       } else {
//         console.error('Logo URL non trovato nella risposta:', response);
//       }
//     },
//     (error) => {
//       this.errorMessage = error;
//       console.error('Errore durante il recupero del logo', error);
//     }
//   );
// }

// getRealTimePrice(): void {
//   this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//     (response: RealTimePriceResponse) => {
//       console.log('Risposta del prezzo in tempo reale:', response);
//       this.stock.name = this.symbol;
//       this.stock.price = response.price;
//       this.stock.increased = true; // Aggiusta la logica se necessario
//     },
//     (error) => {
//       console.error('Errore durante il recupero del prezzo in tempo reale', error);
//     }
//   );
// }

// getStocks(): void {
//   this.stockListService.getStockList().subscribe(
//     (stocks: any[]) => {
//       this.allStocks = stocks;
//       this.displayRandomStocks();
//     },
//     (error) => {
//       console.error('Errore durante il recupero delle azioni', error);
//     }
//   );
// }

// displayRandomStocks(): void {
//   const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
//   this.displayedStocks = shuffled.slice(0, 5);
// }
// }


// stock: any = {};
// symbol: string = '';
// errorMessage: string | null = null;
// user!: AuthData | null;
// allStocks: StockList[] = [];
// displayedStocks: StockList[] = [];

// constructor(
//   private realTimePriceService: RealTimePriceService,
//   private logoBorsaService: LogoBorsaService,
//   private stockListService: StockListService,
//   private authSrv: AuthService
// ) {}

// ngOnInit(): void {
//    this.updateDisplayedStocks();
//    this.getStocks();
//   this.authSrv.user$.subscribe((data) => {
//     this.user = data;
//   });
 
// }
// @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.updateDisplayedStocks();
//   }
// getStocks(): void {
//   this.logoBorsaService.getAllLogos().subscribe(
//     (response: LogoDto[]) => {
//       let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
//       let filter2: LogoDto[] = [];
//       filteredStocks.forEach(logo => {
//         let image = new Image();
//         image.src = logo.url;
//         image.onload = () => {
//           filter2.push(logo);
//         };
//       });

//       setTimeout(() => {
//         this.stockListService.getStockList().subscribe((response: StockList[]) => {
//           this.allStocks = response.filter(stock => {
//             return filter2.map(logo => logo.symbol).includes(stock.symbol);
//           });
//           this.displayRandomStocks();
//         });
//       }, 2000);
//     },
//     (error) => {
//       console.error('Errore durante il recupero della lista delle azioni', error);
//       this.allStocks = [];
//     }
//   );
// }

// displayRandomStocks(): void {
//   const shuffled = this.allStocks.sort(() => 0.10 - Math.random());
//   this.displayedStocks = shuffled.slice(0, 10);
// }

// updateDisplayedStocks(): void {
//   const width = window.innerWidth;

//   let numberOfCards;
//   if (width < 768) { // sm
//     numberOfCards = 5;
//   } else if (width >= 768 && width < 992) { // md
//     numberOfCards = 7;
//   } else if (width >= 992 && width < 1200) { // lg
//     numberOfCards = 8;
//   } else { // xl
//     numberOfCards = 10;
//   }

//   this.displayedStocks = this.allStocks.slice(0, numberOfCards);
// }
// getStockData(stock: any): void {
//   this.symbol = stock.symbol;
//   this.getRealTimePrice();
//   this.getLogo();
// }

// getLogo(): void {
//   this.logoBorsaService.getLogo(this.symbol).subscribe(
//     (response: LogoBorsa) => {
//       console.log('Logo URL:', response.url);
//       if (response && response.url) {
//         this.stock.logo = response.url;
//       } else {
//         console.error('Logo URL non trovato nella risposta:', response);
//       }
//     },
//     (error) => {
//       this.errorMessage = error;
//       console.error('Errore durante il recupero del logo', error);
//     }
//   );
// }

// getRealTimePrice(): void {
//   this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//     (response: RealTimePriceResponse) => {
//       console.log('Risposta del prezzo in tempo reale:', response);
//       this.stock.name = this.symbol;
//       this.stock.price = response.price;
//       this.stock.increased = true; // Adjust logic as necessary
//     },
//     (error) => {
//       console.error('Errore durante il recupero del prezzo in tempo reale', error);
//     }
//   );
// }
// }

// stock: any = {};
// symbol: string = '';
// errorMessage: string | null = null;
// user!: AuthData | null;
// allStocks: StockList[] = [];
// displayedStocks: StockList[] = [];

// constructor(
//   private realTimePriceService: RealTimePriceService,
//   private logoBorsaService: LogoBorsaService,
//   private stockListService: StockListService,
//   private authSrv: AuthService
// ) {}

// ngOnInit(): void {
//   this.getStocks();
//   this.authSrv.user$.subscribe((data) => {
//     this.user = data;
//   });
// }

// @HostListener('window:resize', ['$event'])
// onResize(event: any) {
//   this.updateDisplayedStocks();
// }

// getStocks(): void {
//   this.logoBorsaService.getAllLogos().subscribe(
//     (response: LogoDto[]) => {
//       let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
//       let filter2: LogoDto[] = [];
//       filteredStocks.forEach(logo => {
//         let image = new Image();
//         image.src = logo.url;
//         image.onload = () => {
//           filter2.push(logo);
//         };
//       });

//       setTimeout(() => {
//         this.stockListService.getStockList().subscribe((response: StockList[]) => {
//           this.allStocks = response.filter(stock => {
//             return filter2.map(logo => logo.symbol).includes(stock.symbol);
//           });
//           this.updateDisplayedStocks();
//         });
//       }, 2000);
//     },
//     (error) => {
//       console.error('Errore durante il recupero della lista delle azioni', error);
//       this.allStocks = [];
//       this.updateDisplayedStocks();
//     }
//   );
// }

// updateDisplayedStocks(): void {
//   const width = window.innerWidth;

//   let numberOfCards;
//   if (width < 768) { // sm
//     numberOfCards = 5;
//   } else if (width >= 768 && width < 992) { // md
//     numberOfCards = 7;
//   } else if (width >= 992 && width < 1200) { // lg
//     numberOfCards = 8;
//   } else { // xl
//     numberOfCards = 10;
//   }

//   const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
//   this.displayedStocks = shuffled.slice(0, numberOfCards);
// }

// getStockData(stock: any): void {
//   this.symbol = stock.symbol;
//   this.getRealTimePrice();
//   this.getLogo();
// }

// getLogo(): void {
//   this.logoBorsaService.getLogo(this.symbol).subscribe(
//     (response: LogoBorsa) => {
//       console.log('Logo URL:', response.url);
//       if (response && response.url) {
//         this.stock.logo = response.url;
//       } else {
//         console.error('Logo URL non trovato nella risposta:', response);
//       }
//     },
//     (error) => {
//       this.errorMessage = error;
//       console.error('Errore durante il recupero del logo', error);
//     }
//   );
// }

// getRealTimePrice(): void {
//   this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
//     (response: RealTimePriceResponse) => {
//       console.log('Risposta del prezzo in tempo reale:', response);
//       this.stock.name = this.symbol;
//       this.stock.price = response.price;
//       this.stock.increased = true; // Adjust logic as necessary
//     },
//     (error) => {
//       console.error('Errore durante il recupero del prezzo in tempo reale', error);
//     }
//   );
// }
// }


stock: any = {};
  symbol: string = '';
  errorMessage: string | null = null;
  user!: AuthData | null;
  allStocks: StockList[] = [];
  displayedStocks: StockList[] = [];

  constructor(
    private realTimePriceService: RealTimePriceService,
    private logoBorsaService: LogoBorsaService,
    private stockListService: StockListService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.getStocks();
    this.authSrv.user$.subscribe((data) => {
      this.user = data;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisplayedStocks();
  }

  getStocks(): void {
    this.logoBorsaService.getAllLogos().subscribe(
      (response: LogoDto[]) => {
        let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
        let filter2: LogoDto[] = [];
        filteredStocks.forEach(logo => {
          let image = new Image();
          image.src = logo.url;
          image.onload = () => {
            filter2.push(logo);
          };
        });

        setTimeout(() => {
          this.stockListService.getStockList().subscribe((response: StockList[]) => {
            this.allStocks = response.filter(stock => {
              return filter2.map(logo => logo.symbol).includes(stock.symbol);
            });
            this.updateDisplayedStocks();
          });
        }, 2000);
      },
      (error) => {
        console.error('Errore durante il recupero della lista delle azioni', error);
        this.allStocks = [];
        this.updateDisplayedStocks();
      }
    );
  }

  updateDisplayedStocks(): void {
    const width = window.innerWidth;

    let numberOfCards;
    if (width < 768) { // sm
      numberOfCards = 5;
    } else if (width >= 768 && width < 992) { // md
      numberOfCards = 7;
    } else if (width >= 992 && width < 1200) { // lg
      numberOfCards = 8;
    } else { // xl
      numberOfCards = 10;
    }

    const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
    this.displayedStocks = shuffled.slice(0, numberOfCards);
  }

  getStockData(stock: any): void {
    this.symbol = stock.symbol;
    this.getRealTimePrice();
    this.getLogo();
  }

  getLogo(): void {
    this.logoBorsaService.getLogo(this.symbol).subscribe(
      (response: LogoBorsa) => {
        console.log('Logo URL:', response.url);
        if (response && response.url) {
          this.stock.logo = response.url;
        } else {
          console.error('Logo URL non trovato nella risposta:', response);
        }
      },
      (error) => {
        this.errorMessage = error;
        console.error('Errore durante il recupero del logo', error);
      }
    );
  }

  getRealTimePrice(): void {
    this.realTimePriceService.getRealTimePrice(this.symbol).subscribe(
      (response: RealTimePriceResponse) => {
        console.log('Risposta del prezzo in tempo reale:', response);
        this.stock.name = this.symbol;
        this.stock.price = response.price;
        this.stock.increased = true; // Adjust logic as necessary
      },
      (error) => {
        console.error('Errore durante il recupero del prezzo in tempo reale', error);
      }
    );
  }
}