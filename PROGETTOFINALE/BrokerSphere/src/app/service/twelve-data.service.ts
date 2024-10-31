import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKeyService } from './api-key.service';

interface StockResponse {
  data: any[];
}
interface TimeSeriesResponse {
  time_series: any[];
}
@Injectable({
  providedIn: 'root'
})
export class TwelveDataService {

  

  stocks: any[] = [];
  realTimePrice: number | undefined;
  timeSeriesData: any[] = [];

  constructor(private http: HttpClient, private apiKeyService: ApiKeyService) { }

  ngOnInit(): void {
    this.getStockList();
    this.getRealTimePrice();
    this.getTimeSeriesData();
  }

  getStockList(): void {
    const apiKey = this.apiKeyService.getNextKey();
    const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    };

    this.http.get<StockResponse>(url, options).subscribe(response => {
      this.stocks = response.data || [];
    }, error => {
      console.error('Error fetching stock list:', error);
    });
  }

  getRealTimePrice(): void {
    const apiKey = this.apiKeyService.getNextKey();
    const url = 'https://twelve-data1.p.rapidapi.com/price?symbol=AMZN&format=json&outputsize=30';
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    };

    this.http.get<any>(url, options).subscribe(response => {
      this.realTimePrice = response.price;
    }, error => {
      console.error('Error fetching real-time price:', error);
    });
  }

  getTimeSeriesData(): void {
    const apiKey = this.apiKeyService.getNextKey();
    const url = 'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=30&format=json';
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    };

    this.http.get<TimeSeriesResponse>(url, options).subscribe(response => {
      this.timeSeriesData = response.time_series || [];
    }, error => {
      console.error('Error fetching time series data:', error);
    });
  }}