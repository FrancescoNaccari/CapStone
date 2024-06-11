import { Component, OnInit } from '@angular/core';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';

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
stock: any = {};
symbol: string = 'AMZN';
errorMessage: string | null = null;

allStocks: any[] = [];
displayedStocks: any[] = [];

constructor(
  private realTimePriceService: RealTimePriceService,
  private logoBorsaService: LogoBorsaService,
  private stockListService: StockListService
) { }

ngOnInit(): void {
  this.getStockData();
  this.getStocks();
}

getStockData(): void {
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
      this.stock.increased = true; // Aggiusta la logica se necessario
    },
    (error) => {
      console.error('Errore durante il recupero del prezzo in tempo reale', error);
    }
  );
}

getStocks(): void {
  this.stockListService.getStockList().subscribe(
    (stocks: any[]) => {
      this.allStocks = stocks;
      this.displayRandomStocks();
    },
    (error) => {
      console.error('Errore durante il recupero delle azioni', error);
    }
  );
}

displayRandomStocks(): void {
  const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
  this.displayedStocks = shuffled.slice(0, 5);
}
}