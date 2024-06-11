import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getStockList();
    this.getRealTimePrice();
    this.getTimeSeriesData();
  }

  getStockList(): void {
    const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
    const options = {
      headers: {
        'X-RapidAPI-Key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };

    this.http.get<StockResponse>(url, options).subscribe(response => {
      this.stocks = response.data || [];
    }, error => {
      console.error('Error fetching stock list:', error);
    });
  }


  getRealTimePrice(): void {
    const url = 'https://twelve-data1.p.rapidapi.com/price?symbol=AMZN&format=json&outputsize=30';
    const options = {
      headers: {
        'X-RapidAPI-Key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };

    this.http.get<any>(url, options).subscribe(response => {
      this.realTimePrice = response.price;
    }, error => {
      console.error('Error fetching real-time price:', error);
    });
  }
  getTimeSeriesData(): void {
    const url = 'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=30&format=json';
    const options = {
      headers: {
        'X-RapidAPI-Key': 'bc8942ba1amshb7e93717f1c3565p163688jsnee2f17033f11',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
  
    this.http.get<TimeSeriesResponse>(url, options).subscribe(response => {
      this.timeSeriesData = response.time_series || [];
    }, error => {
      console.error('Error fetching time series data:', error);
    });
  }}