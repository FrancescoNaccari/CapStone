import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() stock: any;

  constructor() { }

  ngOnInit(): void {
    console.log('Dati stock in stock-card:', this.stock); // Debug log
  }
  toggleFavorite(stock: any): void {
    stock.favorite = !stock.favorite;
    console.log(`${stock.name} è stato ${stock.favorite ? 'aggiunto ai' : 'rimosso dai'} preferiti.`);
    // Qui puoi aggiungere la logica per salvare lo stato dei preferiti, ad esempio, aggiornando un servizio o memorizzandolo in localStorage.
  }
}