import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:8080/api/stocks';

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getStocksBySymbol(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${symbol}`);
  }

  // Additional methods to add, update and delete stocks
}