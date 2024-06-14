import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  // @Input() stock: any;

  // constructor(private realTimePriceService: RealTimePriceService) { }

  // ngOnInit(): void {
  //   this.getRealTimePrice();
  //   console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
  // }

  // getRealTimePrice(): void {
  //   this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
  //     (response: RealTimePriceResponse) => {
  //       console.log('Risposta del prezzo in tempo reale:', response);
  //       this.stock.price = response.price;
  //       this.stock.increased = true; // Aggiusta la logica se necessario
  //     },
  //     (error) => {
  //       console.error('Errore durante il recupero del prezzo in tempo reale', error);
  //     }
  //   );
  // }

  // toggleFavorite(): void {
  //   this.stock.favorite = !this.stock.favorite;
  //   console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
  //   // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
  // }



  //-------------PROVA PER  PRENDERE DAL DATABASE-----------------
  // @Input() stock: any;
  // logoUrl: string | undefined;

  // constructor(
  //   private realTimePriceService: RealTimePriceService,
  //   private logoBorsaService: LogoBorsaService
  // ) { }

  // ngOnInit(): void {
  //   this.getRealTimePrice();
  //   this.getLogo();
  //   console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
  // }

  // getRealTimePrice(): void {
  //   this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
  //     (response: RealTimePriceResponse) => {
  //       console.log('Risposta del prezzo in tempo reale:', response);
  //       this.stock.price = response.price;
  //       this.stock.increased = true; // Aggiusta la logica se necessario
  //     },
  //     (error) => {
  //       console.error('Errore durante il recupero del prezzo in tempo reale', error);
  //     }
  //   );
  // }

  // getLogo(): void {
  //   this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
  //     (response: LogoBorsa) => {
  //       this.logoUrl = response.url;
  //       console.log('URL del logo:', response.url);
  //     },
  //     (error) => {
  //       console.error('Errore durante il recupero del logo', error);
  //     }
  //   );
  // }

  // toggleFavorite(): void {
  //   this.stock.favorite = !this.stock.favorite;
  //   console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
  //   // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
  // }


  // @Input() stock: any;
  // logoUrl: string | undefined;

  // constructor(
  //   private realTimePriceService: RealTimePriceService,
  //   private logoBorsaService: LogoBorsaService,
  //   private cdr: ChangeDetectorRef
  // ) { }

  // ngOnInit(): void {
  //   this.getRealTimePrice();
  //   this.getLogo();
  //   console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
  // }

  // getRealTimePrice(): void {
  //   this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
  //     (response: RealTimePriceResponse) => {
  //       console.log('Risposta del prezzo in tempo reale:', response);
  //       this.stock.price = response.price;
  //       this.stock.increased = true; // Aggiusta la logica se necessario
  //       this.cdr.detectChanges(); // Ensure view updates
  //     },
  //     (error) => {
  //       console.error('Errore durante il recupero del prezzo in tempo reale', error);
  //     }
  //   );
  // }

  // getLogo(): void {
  //   this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
  //     (response: LogoBorsa) => {
  //       if (response.url) {
  //         let image = new Image();
  //         image.src = response.url;
  //         image.onload = () => {
  //           this.logoUrl = response.url;
  //           this.cdr.detectChanges(); // Ensure view updates
  //           console.log('URL del logo:', response.url);
  //         };
  //         image.onerror = () => {
  //           console.error('Logo URL is not valid:', response.url);
  //         };
  //       }
  //     },
  //     (error) => {
  //       console.error('Errore durante il recupero del logo', error);
  //     }
  //   );
  // }

  // toggleFavorite(): void {
  //   this.stock.favorite = !this.stock.favorite;
  //   console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
  //   // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
  // }
//   @Input() stock: any;

//   constructor(private realTimePriceService: RealTimePriceService, private cdr: ChangeDetectorRef) { }

//   ngOnInit(): void {
//     console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
//   }

//   toggleFavorite(): void {
//     this.stock.favorite = !this.stock.favorite;
//     console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
//     // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
//   }
// }

@Input() stock: any;

constructor(
  private realTimePriceService: RealTimePriceService,
  private logoBorsaService: LogoBorsaService
) { }

ngOnInit(): void {
  this.getRealTimePrice();
  this.getLogo();
  console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
}

getRealTimePrice(): void {
  this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
    (response: RealTimePriceResponse) => {
      console.log('Risposta del prezzo in tempo reale:', response);
      this.stock.price = response.price;
      this.stock.increased = response.price >= (Number(this.stock.previousClose) || 0);
    },
    (error) => {
      console.error('Errore durante il recupero del prezzo in tempo reale', error);
    }
  );
}

getLogo(): void {
  this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
    (response: LogoBorsa) => {
      if (response && response.url) {
        this.stock.logoUrl = response.url;
      } else {
        console.error('Logo URL non trovato nella risposta:', response);
      }
    },
    (error) => {
      console.error('Errore durante il recupero del logo', error);
    }
  );
}

toggleFavorite(): void {
  this.stock.favorite = !this.stock.favorite;
  console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
  // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
}
}