import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {
  stock: any;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    this.stockService.getStocksBySymbol(symbol || "").subscribe(data => {
      this.stock = data;
    });
  }
}
