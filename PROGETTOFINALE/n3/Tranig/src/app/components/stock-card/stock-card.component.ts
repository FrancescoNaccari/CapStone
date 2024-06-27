import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { QuoteBorse } from 'src/app/interface/quote-borse.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { QuoteBorseService } from 'src/app/service/quote-borse.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
 
// @Input() stock: any;
// @Input() favorites: any[] = [];
// @Output() favoriteToggled = new EventEmitter<any>();

// constructor(
//   private realTimePriceService: RealTimePriceService,
//   private logoBorsaService: LogoBorsaService,
//   private cdr: ChangeDetectorRef
// ) { }

// ngOnInit(): void {
//   this.getRealTimePrice();
//   this.getLogo();
//   console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
//   this.favorites.forEach(favorite=>{
//     if(favorite.symbol === this.stock.symbol){
//       this.stock.favorite = true;
//     }
//   })
// }

// getRealTimePrice(): void {
//   this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
//     (response: RealTimePriceResponse) => {
//       console.log('Risposta del prezzo in tempo reale:', response);
//       this.stock.price = response.price;
//       this.stock.increased = response.price >= (Number(this.stock.previousClose) || 0);
//       this.cdr.detectChanges();
//     },
//     (error) => {
//       console.error('Errore durante il recupero del prezzo in tempo reale', error);
//     }
//   );
// }

// getLogo(): void {
//   this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
//     (response: LogoBorsa) => {
//       if (response && response.url) {
//         this.stock.logoUrl = response.url;
//         this.cdr.detectChanges();
//       } else {
//         console.error('Logo URL non trovato nella risposta:', response);
//       }
//     },
//     (error) => {
//       console.error('Errore durante il recupero del logo', error);
//     }
//   );
// }

// toggleFavorite(): void {
//   this.stock.favorite = !this.stock.favorite;
//   this.favoriteToggled.emit(this.stock);
//   console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
// }
// }


@Input() symbol!: string;
@Input() stock: any;
@Input() favorites: any[] = [];
@Output() favoriteToggled = new EventEmitter<any>();

constructor(
  private realTimePriceService: RealTimePriceService,
  private logoBorsaService: LogoBorsaService,
  private quoteBorseService: QuoteBorseService,
  private cdr: ChangeDetectorRef,
  private modalService: NgbModal,

) { }

ngOnInit(): void {
  this.getRealTimePrice();
  this.getLogo();
  this.favorites.forEach(favorite => {
    if (favorite.symbol === this.stock.symbol) {
      this.stock.favorite = true;
    }
  });
}
openModal(content: TemplateRef<any>) {
  this.getRealTimePrice(); // Ensure real-time price is fetched
  const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  modalRef.componentInstance.symbol = this.stock.symbol;
  modalRef.componentInstance.currentPrice = this.stock.price;
  modalRef.componentInstance.userId = this.stock.userId;
}

getRealTimePrice(): void {
  this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
    (response: RealTimePriceResponse) => {
      this.stock.price = response.price;
      this.getPreviousClosePrice(response.price);
    },
    (error) => {
      console.error('Errore durante il recupero del prezzo in tempo reale', error);
    }
  );
}

getPreviousClosePrice(currentPrice: number): void {
  this.quoteBorseService.getQuote(this.stock.symbol).subscribe(
    (response: QuoteBorse) => {
      const previousClose = Number(response.previous_close);
      this.stock.increased = currentPrice >= previousClose;
      this.cdr.detectChanges();
    },
    (error) => {
      console.error('Errore durante il recupero del prezzo di chiusura precedente', error);
    }
  );
}

getLogo(): void {
  this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
    (response: LogoBorsa) => {
      if (response && response.url) {
        this.stock.logoUrl = response.url;
        this.cdr.detectChanges();
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
  this.favoriteToggled.emit(this.stock);
  console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
}
}