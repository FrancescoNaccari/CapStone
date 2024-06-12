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
  @Input() stock: any;

  constructor(  private realTimePriceService: RealTimePriceService,
    private logoBorsaService: LogoBorsaService,
    private stockListService: StockListService) { }

  ngOnInit(): void {
    this.getLogo();
    this.getRealTimePrice()
    console.log('Dati stock in stock-card:', this.stock); // Verifica che i dati vengano ricevuti
  }

  getLogo(): void {
    console.log(this.stock)
    this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
      (response: LogoBorsa) => {
        console.log('Logo URL:', response.url);
        if (response && response.url) {
         
          this.stock.logo = response.url;
        } else {
          console.error('Logo URL non trovato nella risposta:', response);
        }
      },
      (error) => {

        console.error('Errore durante il recupero del logo', error);
      }
    );
  }

  getRealTimePrice(): void {
    this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
      (response: RealTimePriceResponse) => {
        console.log('Risposta del prezzo in tempo reale:', response);
        this.stock.name = this.stock.symbol;
        this.stock.price = response.price;
        this.stock.increased = true; // Aggiusta la logica se necessario
      },
      (error) => {
        console.error('Errore durante il recupero del prezzo in tempo reale', error);
      }
    );
  }
  
  toggleFavorite(): void {
    this.stock.favorite = !this.stock.favorite;
    console.log(`${this.stock.name} è stato ${this.stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
    // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
  }
}